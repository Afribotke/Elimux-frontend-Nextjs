=== middleware.ts ===
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isProtected = url.pathname.startsWith("/institution");

  if (!isProtected) return NextResponse.next();

  const hasSession = req.cookies.get("sb-access-token");
  if (!hasSession) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/institution/:path*"],
};
