import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session-token";

const PUBLIC_ADMIN_PAGES = [
  "/admin/login",
  "/admin/setup",
  "/admin/forgot-password",
];

// First gate for /admin pages: no valid session cookie, no page. Every admin
// API route and page ALSO checks the admin itself (withAdmin / requireAdminPage).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = PUBLIC_ADMIN_PAGES.includes(pathname)
    ? NextResponse.next()
    : await guard(request, pathname);

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

async function guard(request: NextRequest, pathname: string) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && (await verifySessionToken(token))) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  if (pathname !== "/admin") login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
