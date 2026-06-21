import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Allow everything in development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // Prevent redirect loops
  if (url.pathname === "/admin/access-denied") {
    return NextResponse.next();
  }

  // Protect admin routes in production
  if (url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/access-denied", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


