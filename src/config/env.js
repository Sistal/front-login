// Función para obtener la configuración de las variables de entorno
// En desarrollo usa import.meta.env (Vite)
// En producción usa window.__ENV__ (inyectado por Docker)
const getEnvVar = (key, defaultValue) => {
  // En producción (Docker), usar window.__ENV__
  if (typeof window !== 'undefined' && window.__ENV__) {
    return window.__ENV__[key] || defaultValue;
  }
  // En desarrollo, usar import.meta.env
  return import.meta.env[key] || defaultValue;
};

export const ENV = {
  MODE: import.meta.env.MODE,
  API_BASE: getEnvVar('VITE_API_BASE'),
  APP_URL: getEnvVar('VITE_FUNCIONARIO_URL', 'http://localhost:5174'),
};


