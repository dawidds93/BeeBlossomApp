import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Nieprawidłowy adres e-mail" }, { status: 400 })
    }

    const { email } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })

    // Zawsze odpowiadamy sukcesem dla bezpieczeństwa (nie ujawniamy czy email istnieje)
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // Usuń stare tokeny
    await prisma.passwordResetToken.deleteMany({ where: { email } })

    // Wygeneruj nowy token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 godzina

    await prisma.passwordResetToken.create({
      data: { email, token, expires },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-hasla/${token}`

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "BeeBlossomApp <onboarding@resend.dev>",
      to: email,
      subject: "Resetowanie hasła – BeeBlossomApp",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Resetowanie hasła</h2>
          <p>Otrzymaliśmy prośbę o reset hasła dla Twojego konta.</p>
          <p>Kliknij poniższy link, aby ustawić nowe hasło. Link jest ważny przez <strong>1 godzinę</strong>.</p>
          <a href="${resetUrl}"
             style="display:inline-block;background:#1a1a1a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0;">
            Ustaw nowe hasło
          </a>
          <p style="color:#666;font-size:13px;">Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="color:#999;font-size:12px;">BeeBlossom – naturalny sklep z kosmetykami</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[FORGOT_PASSWORD]", err)
    return NextResponse.json({ error: "Błąd serwera. Spróbuj ponownie." }, { status: 500 })
  }
}
