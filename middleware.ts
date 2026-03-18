import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// Middleware wspiera jedynie środowisko Edge. Inicjujemy NextAuth wyłącznie 
// na bazie okrojonej konfiguracji authConfig (bez obiektu PrismaClient).
const { auth } = NextAuth(authConfig);

const adminRoutes = ["/admin"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  
  const isAdminRoute = adminRoutes.some(route => nextUrl.pathname.startsWith(route));

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl)); 
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
