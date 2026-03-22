import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
  confirmPassword: z.string(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować politykę prywatności",
  }),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Hasła się nie zgadzają",
  path: ["confirmPassword"],
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password, name, gdprConsent } = parsed.data

    // Sprawdź czy email jest już zajęty
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "Konto z tym adresem e-mail już istnieje" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: "CUSTOMER",
        gdprConsent: gdprConsent ? new Date() : null,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("[REGISTER]", err)
    return NextResponse.json(
      { error: `Szczegóły błędu na serwerze: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    )
  }
}
