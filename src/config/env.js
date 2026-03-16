// Función para obtener la configuración de las variables de entorno
// En desarrollo usa import.meta.env (Vite)
// En producción usa window.__ENV__ (inyectado por Docker)
const getEnvVar = (key, viteEnvValue, defaultValue) => {
  // En producción (Docker), usar window.__ENV__ si tiene el valor
  if (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__[key]) {
    return window.__ENV__[key];
  }
  // En desarrollo, usar la variable original de vite
  return viteEnvValue || defaultValue;
};

export const ENV = {
  MODE: import.meta.env.MODE,
  API_BASE: getEnvVar('VITE_API_BASE', import.meta.env.VITE_API_BASE, 'http://localhost:8080'),
  APP_URL: getEnvVar('VITE_FUNCIONARIO_URL', import.meta.env.VITE_FUNCIONARIO_URL, 'http://localhost:5174'),
};


