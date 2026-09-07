import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminToken } from '../../../../lib/adminAuth';

export async function POST(request: Request) {
  const { password } = await request.json();
  const secret = process.env.ADMIN_PASSWORD || '';
  if (!secret) return NextResponse.json({ error: 'Admin login is not configured yet.' }, { status: 503 });
  if (!password || password !== secret) return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 });
  return response;
}
