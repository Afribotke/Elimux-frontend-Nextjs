import { NextResponse } from 'next/server';

export function authCheck(req: any) {
  const token = req.cookies.get('elimux_token');

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}
