/**
 * Valida el formato de un RUT chileno
 * @param {string} rut - RUT en formato XX.XXX.XXX-X o XXXXXXXX-X
 * @returns {boolean} - true si el RUT es válido
 */
export function validateRut(rut) {
  if (!rut || typeof rut !== 'string') return false;

  // Limpiar el RUT de puntos y guiones
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');

  // Verificar que tenga al menos 2 caracteres (número + dígito verificador)
  if (cleanRut.length < 2) return false;

  // Separar cuerpo y dígito verificador
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();

  // Verificar que el cuerpo sea numérico
  if (!/^\d+$/.test(body)) return false;

  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

  return dv === calculatedDv;
}

/**
 * Formatea un RUT agregando puntos y guión
 * @param {string} rut - RUT sin formato
 * @returns {string} - RUT formateado (XX.XXX.XXX-X)
 */
export function formatRut(rut) {
  if (!rut) return '';

  // Limpiar el RUT
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');

  // Separar cuerpo y dígito verificador
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // Agregar puntos al cuerpo
  let formattedBody = '';
  for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      formattedBody = '.' + formattedBody;
    }
    formattedBody = body[i] + formattedBody;
  }

  return `${formattedBody}-${dv}`;
}

/**
 * Limpia un RUT de puntos y guiones
 * @param {string} rut - RUT con formato
 * @returns {string} - RUT limpio
 */
export function cleanRut(rut) {
  if (!rut) return '';
  return rut.replace(/\./g, '').replace(/-/g, '');
}

/**
 * Valida que un string sea un email válido
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Detecta si un string es RUT o email
 * @param {string} identifier - String a analizar
 * @returns {'rut'|'email'|'unknown'} - Tipo de identificador
 */
export function detectIdentifierType(identifier) {
  if (!identifier) return 'unknown';

  // Si contiene @, es email
  if (identifier.includes('@')) {
    return validateEmail(identifier) ? 'email' : 'unknown';
  }

  // Si contiene números y guión o puntos, probablemente es RUT
  if (/\d/.test(identifier) && (identifier.includes('-') || identifier.includes('.'))) {
    return validateRut(identifier) ? 'rut' : 'unknown';
  }

  // Si es solo números con posible K al final, podría ser RUT sin formato
  if (/^\d{7,8}[0-9Kk]?$/.test(identifier)) {
    return 'rut';
  }

  return 'unknown';
}
