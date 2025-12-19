import React, { useState } from 'react';

import AuthCard from '../components/AuthCard';
import PasswordField from '../components/PasswordField';
import {Button, Input } from '../../../shared/ui';
import { login as loginApi } from '../api/auth.api';

export default function LoginPage() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    setStatus({ type: 'loading', message: '' });
    try {
      await loginApi({ email, password });
      setStatus({ type: 'success', message: 'Login OK (stub)' });
    } catch (err) {
      setStatus({ type: 'error', message: err?.message || 'Error al iniciar sesión' });
    }
  }

  return (
      <div className="w-full space-y-6 ">
        <AuthCard
            title={
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <ShieldIcon />
                </div>
                <span className="text-sm font-semibold text-zinc-900">Iniciar sesión</span>
              </div>
            }
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm "
        >
          <p className="mt-4 text-sm text-zinc-600">
            Accede al sistema para gestionar tus solicitudes de uniforme
          </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4 flex flex-col gap-4">
                {/* RUT o correo */}
                <div className={'flex flex-col gap-2'}>
                    <label className="text-xs font-medium text-zinc-700">RUT o correo electrónico</label>

                    <Input
                        name="email"
                        type="text"
                        placeholder="Ingresa tu RUT o correo"
                        autoComplete="username"
                        required
                        disabled={status.type === 'loading'}
                        className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70"
                    />

                    <p className="mt-2 text-xs text-zinc-500">
                        Ejemplo: 18456789-2 o usuario@empresa.cl
                    </p>
                </div>

                {/* Password */}
                <div className={'flex flex-col gap-2'}>
                    <label className="text-xs font-medium text-zinc-700">Contraseña</label>

                    <PasswordField
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        required
                        disabled={status.type === 'loading'}
                        className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-600/10 disabled:opacity-70"
                    />
                </div>

                {/* CTA */}
                <div className={'flex flex-col gap-5'}>
                <Button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status.type === 'loading' ? 'Iniciando sesión…' : 'Iniciar sesión'}
                </Button>

                {/* Forgot */}
                <div className="text-center">
                    <button
                        type="button"
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        onClick={() => {
                            // TODO: navega a /recuperar
                        }}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                </div>
            </form>
        </AuthCard>

          {/* Support card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <QuestionIcon />
            </div>

            <div className="min-w-0 flex flex-col gap-2">
              <h6 className="text-sm font-semibold text-zinc-900">¿Problemas para acceder?</h6>
              <p className="mt-1 text-xs text-zinc-600">
                Contacta al área de soporte o recursos humanos para asistencia
              </p>

              <div className="mt-3 space-y-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <MailIcon />
                  <span className="truncate">soporte.sistal@empresa.cl</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <span>+56 2 2345 6789 (Anexo 4521)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-xs text-zinc-500">
          <div>© 2025 SISTAL — Sistema de Gestión de Uniformes</div>
          <div className="mt-1 text-zinc-400">Todos los derechos reservados</div>
        </div>
      </div>
  );
}

/* ---------- Icons inline (sin dependencias) ---------- */

function ShieldIcon() {
  return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
      </svg>
  );
}

function QuestionIcon() {
  return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path
            d="M9.5 9a2.5 2.5 0 1 1 4 2c-.8.6-1.5 1.1-1.5 2v.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
            stroke="currentColor"
            strokeWidth="2"
        />
      </svg>
  );
}

function MailIcon() {
  return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-zinc-500" aria-hidden="true">
        <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
  );
}

function PhoneIcon() {
  return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-zinc-500" aria-hidden="true">
        <path
            d="M6 3h4l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v4c0 1-1 2-2 2-10 0-18-8-18-18 0-1 1-2 2-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
      </svg>
  );
}
