import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;

  const adminRoutes = [
    "/admin",
    "/admin/users",
    "/admin/institutions",
    "/admin/programs",
    "/admin/countries",
    "/admin/logs",
    "/admin/settings"
  ];

  const isAdminRoute = adminRoutes.some((r) => req.nextUrl.pathname.startsWith(r));

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/admin/access-denied", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
