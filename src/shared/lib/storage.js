const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function setJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getJson(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export function remove(key) {
  localStorage.removeItem(key);
}

// Token management
export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// User data management
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Clear all auth data
export function clearAuth() {
  removeToken();
  removeUser();
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getToken();
}

const storage = {
  setJson,
  getJson,
  remove,
  saveToken,
  getToken,
  removeToken,
  saveUser,
  getUser,
  removeUser,
  clearAuth,
  isAuthenticated,
};

export default storage;

