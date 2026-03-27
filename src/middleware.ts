import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Siteyi kapatmak için true, açmak için false yap
const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Admin paneline izin ver
  if (pathname.startsWith("/admin")) return NextResponse.next();

  // API rotalarına izin ver
  if (pathname.startsWith("/api")) return NextResponse.next();

  // Maintenance sayfasını döngüye sokma
  if (pathname === "/maintenance") return NextResponse.next();

  // Diğer her şeyi maintenance sayfasına yönlendir
  return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp).*)",
  ],
};
