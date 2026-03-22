import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const tokens = await prisma.passwordResetToken.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  })
  return NextResponse.json(tokens)
}
