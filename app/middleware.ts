import { NextResponse } from 'next/server';
import { authCheck } from '@/lib/middleware/auth-check';

export function middleware(req: Request) {
  return authCheck(req);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
