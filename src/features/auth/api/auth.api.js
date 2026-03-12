import http from '../../../shared/lib/http';

export function login(payload) {
  return http.post('/api/v1/auth/login', payload);
}

export function register(payload) {
  return http.post('/api/v1/auth/register', payload);
}

export function forgotPassword(payload) {
  return http.post('/api/v1/auth/forgot-password', payload);
}

export function resetPassword(token, payload) {
  return http.post(`/api/v1/auth/reset-password/${encodeURIComponent(token ?? '')}`, payload);
}

export function validateToken() {
  return http.get('/api/v1/auth/validate');
}

export function getMe() {
  return http.get('/api/v1/auth/me');
}

