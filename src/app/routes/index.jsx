import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';
import { ROUTES } from './paths';

import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../../features/auth/pages/ResetPasswordPage';

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    // Redirección inicial: de "/" a "/login"
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { 
        index: true, // Esto hace que el componente cargue en "/login"
        element: <LoginPage /> 
      },
      { 
        path: 'register', // Esto será "/login/register"
        element: <RegisterPage /> 
      },
      { 
        path: 'forgot-password', 
        element: <ForgotPasswordPage /> 
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
