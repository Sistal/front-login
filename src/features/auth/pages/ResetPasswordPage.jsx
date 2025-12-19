import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import AuthCard from '../components/AuthCard';
import PasswordField from '../components/PasswordField';
import { Alert, Button } from '../../../shared/ui';
import { resetPassword as resetPasswordApi } from '../api/auth.api';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password') || '');

    setStatus({ type: 'loading', message: '' });
    try {
      await resetPasswordApi(token, { password });
      setStatus({ type: 'success', message: 'Contraseña actualizada (stub)' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'No se pudo actualizar' });
    }
  }

  return (
    <AuthCard title="Restablecer contraseña">
      {status.type === 'error' ? <Alert>{status.message}</Alert> : null}
      {status.type === 'success' ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">{status.message}</Alert>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-3">
        <PasswordField name="password" placeholder="Nueva contraseña" autoComplete="new-password" required />
        <Button type="submit" disabled={status.type === 'loading'} className="w-full">
          {status.type === 'loading' ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </AuthCard>
  );
}
