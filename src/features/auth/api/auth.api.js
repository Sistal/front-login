import http from '../../../shared/lib/http';

export function login(payload) {
  return http.post('/auth/login', payload);
}

export function register(payload) {
  return http.post('/auth/register', payload);
}

export function forgotPassword(payload) {
  return http.post('/auth/forgot-password', payload);
}

export function resetPassword(token, payload) {
  return http.post(`/auth/reset-password/${encodeURIComponent(token ?? '')}`, payload);
}

export function validateToken() {
  return http.get('/auth/validate');
}

export function getMe() {
  return http.get('/auth/me');
}

