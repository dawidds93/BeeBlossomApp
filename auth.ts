import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"

import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Resend({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    }),
    Credentials({
      credentials: { email: { type: "email" } },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = credentials.email as string;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({ data: { email, role: "ADMIN" } });
        } else {
          await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
          user.role = "ADMIN";
        }
        return user;
      }
    })
  ]
})
