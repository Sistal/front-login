import React, { useState } from 'react';

import AuthCard from '../components/AuthCard';
import { Alert, Button, Input } from '../../../shared/ui';
import { forgotPassword as forgotPasswordApi } from '../api/auth.api';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');

    setStatus({ type: 'loading', message: '' });
    try {
      await forgotPasswordApi({ email });
      setStatus({ type: 'success', message: 'Si existe la cuenta, se enviarán instrucciones.' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'No se pudo enviar el correo' });
    }
  }

  return (
    <AuthCard title="Recuperar contraseña">
      {status.type === 'error' ? <Alert>{status.message}</Alert> : null}
      {status.type === 'success' ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">{status.message}</Alert>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-3">
        <Input name="email" type="email" placeholder="Correo" autoComplete="email" required />
        <Button type="submit" disabled={status.type === 'loading'} className="w-full">
          {status.type === 'loading' ? 'Enviando…' : 'Enviar instrucciones'}
        </Button>
      </form>
    </AuthCard>
  );
}
