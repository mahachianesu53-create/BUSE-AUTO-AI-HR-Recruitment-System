import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;

  // Allow public routes
  const publicRoutes = ["/login", "/apply", "/"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect HR routes
  if (pathname.startsWith("/hr")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|data).*)"],
};
