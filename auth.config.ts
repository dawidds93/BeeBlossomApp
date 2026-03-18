import type { NextAuthConfig } from "next-auth"

// Ten plik zawiera jedynie konfigurację Edge-compatible (bez PrismaAdapter),
// wymaganą przez middleware.ts, by uniknąć błędu z modułem "crypto".

export default {
  pages: {
    signIn: '/login',
  },
  providers: [],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    }
  }
} satisfies NextAuthConfig
