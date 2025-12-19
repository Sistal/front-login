import React, { useState } from 'react';

import AuthCard from '../components/AuthCard';
import PasswordField from '../components/PasswordField';
import { Alert, Button, Input } from '../../../shared/ui';
import { register as registerApi } from '../api/auth.api';

export default function RegisterPage() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    setStatus({ type: 'loading', message: '' });
    try {
      await registerApi({ name, email, password });
      setStatus({ type: 'success', message: 'Registro OK (stub)' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Error al registrarse' });
    }
  }

  return (
    <AuthCard title="Registro">
      {status.type === 'error' ? <Alert>{status.message}</Alert> : null}
      {status.type === 'success' ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">{status.message}</Alert>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-3">
        <Input name="name" placeholder="Nombre" autoComplete="name" required />
        <Input name="email" type="email" placeholder="Correo" autoComplete="email" required />
        <PasswordField name="password" placeholder="Contraseña" autoComplete="new-password" required />
        <Button type="submit" disabled={status.type === 'loading'} className="w-full">
          {status.type === 'loading' ? 'Creando…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthCard>
  );
}
