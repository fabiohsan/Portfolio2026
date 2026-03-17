import {
  ADMIN_COOKIE_NAME,
  createAdminSession,
  getAdminPin,
  serializeCookie,
} from '../_lib/adminAuth.js';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

const readBody = async (req) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const body = await readBody(req);
    if ((body.pin || '') !== getAdminPin()) {
      return json(res, 401, { error: 'PIN invalido.' });
    }

    const secure = process.env.NODE_ENV === 'production';
    res.setHeader(
      'Set-Cookie',
      serializeCookie(ADMIN_COOKIE_NAME, createAdminSession(), {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
        path: '/',
        sameSite: 'Strict',
        secure,
      })
    );

    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 400, { error: 'Nao foi possivel autenticar.' });
  }
}
