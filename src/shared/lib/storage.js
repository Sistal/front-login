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

