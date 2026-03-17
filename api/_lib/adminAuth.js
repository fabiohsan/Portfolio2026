import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'fhsan_admin_session';

const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_ADMIN_PIN = '0803';

export const getAdminPin = () => process.env.ADMIN_PIN || DEFAULT_ADMIN_PIN;

const getSessionSecret = () =>
  process.env.ADMIN_SESSION_SECRET ||
  `${getAdminPin()}:${process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'local'}`;

const toBase64Url = (value) =>
  Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

const sign = (value) =>
  toBase64Url(crypto.createHmac('sha256', getSessionSecret()).update(value).digest());

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const createAdminSession = () => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
};

export const verifyAdminSession = (value) => {
  if (!value) return false;

  const lastDot = value.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payload = value.slice(0, lastDot);
  const signature = value.slice(lastDot + 1);

  if (!safeEqual(sign(payload), signature)) return false;

  const parts = payload.split(':');
  if (parts.length !== 2 || parts[0] !== 'admin') return false;

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt)) return false;

  return expiresAt > Math.floor(Date.now() / 1000);
};

export const parseCookies = (cookieHeader = '') =>
  cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, entry) => {
      const separator = entry.indexOf('=');
      if (separator === -1) return acc;

      const key = entry.slice(0, separator);
      const value = entry.slice(separator + 1);
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

export const serializeCookie = (name, value, options = {}) => {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.httpOnly) parts.push('HttpOnly');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.secure) parts.push('Secure');

  return parts.join('; ');
};
