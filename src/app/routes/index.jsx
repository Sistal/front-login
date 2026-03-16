import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import { ROUTES } from './paths';

import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    children: [
      { path: '/', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password/:token', element: <ResetPasswordPage /> },
      { path: '*', element: <Navigate to={ROUTES.LOGIN} replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
], {
  basename: '/login'
});

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

