import { ADMIN_COOKIE_NAME, serializeCookie } from '../_lib/adminAuth.js';

const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const secure = process.env.NODE_ENV === 'production';
  res.setHeader(
    'Set-Cookie',
    serializeCookie(ADMIN_COOKIE_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: 'Strict',
      secure,
    })
  );

  return json(res, 200, { ok: true });
}
