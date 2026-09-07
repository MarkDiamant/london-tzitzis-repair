import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'ltr_admin';

function tokenFor(secret: string) {
  return createHash('sha256').update(`ltr-admin:${secret}`).digest('hex');
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAdmin() {
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!secret) return false;
  const store = await cookies();
  const supplied = store.get(ADMIN_COOKIE)?.value || '';
  const expected = tokenFor(secret);
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

export function adminToken() {
  const secret = process.env.ADMIN_PASSWORD || '';
  return secret ? tokenFor(secret) : '';
}
