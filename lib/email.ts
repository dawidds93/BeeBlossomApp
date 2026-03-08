import { Resend } from 'resend'

const FROM = process.env.EMAIL_FROM ?? 'BeeBlossomApp <noreply@beeblossom.pl>'

export interface OrderEmailData {
  orderNumber: string
  customerEmail: string
  customerName: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    street: string
    city: string
    postalCode: string
  }
}

export async function sendOrderConfirmation(data: OrderEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set – skipping email')
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: FROM,
    to: data.customerEmail,
    subject: `Potwierdzenie zamówienia ${data.orderNumber} – BeeBlossomApp 🐝`,
    html: buildOrderConfirmationHtml(data),
  })

  if (error) {
    // Log but don't throw – email failure should not fail the order
    console.error('Email send error:', error)
  }
}

function buildOrderConfirmationHtml(data: OrderEmailData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe3; color: #3d2b1f; font-size: 14px;">
          ${item.name} × ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe3; color: #b8873f; font-size: 14px; text-align: right; font-weight: 600;">
          ${(item.price * item.quantity).toFixed(2).replace('.', ',')} zł
        </td>
      </tr>`
    )
    .join('')

  const shippingRow =
    data.shippingCost > 0
      ? `<tr>
          <td style="padding: 8px 0; color: #8a7a70; font-size: 13px;">Dostawa</td>
          <td style="padding: 8px 0; color: #3d2b1f; font-size: 13px; text-align: right;">${data.shippingCost.toFixed(2).replace('.', ',')} zł</td>
        </tr>`
      : `<tr>
          <td style="padding: 8px 0; color: #8a7a70; font-size: 13px;">Dostawa</td>
          <td style="padding: 8px 0; color: #16a34a; font-size: 13px; text-align: right; font-weight: 600;">Bezpłatna 🎉</td>
        </tr>`

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Potwierdzenie zamówienia</title>
</head>
<body style="margin: 0; padding: 0; background-color: #faf7f2; font-family: Georgia, serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf7f2; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background-color: #c8903c; padding: 32px; text-align: center; border-radius: 16px 16px 0 0;">
              <p style="margin: 0; font-size: 28px;">🐝</p>
              <h1 style="margin: 8px 0 4px; color: #ffffff; font-size: 22px; font-family: Georgia, serif; font-weight: normal;">
                BeeBlossomApp
              </h1>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 13px; font-family: Arial, sans-serif; letter-spacing: 0.05em;">
                RĘCZNIE ROBIONE Z NATURALNEGO WOSKU PSZCZELEGO
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px 48px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 24px rgba(61,43,31,0.08);">

              <!-- Greeting -->
              <h2 style="margin: 0 0 8px; color: #3d2b1f; font-size: 20px; font-family: Georgia, serif; font-weight: normal;">
                Dziękujemy za zamówienie,<br /><strong>${data.shippingAddress.firstName}!</strong>
              </h2>
              <p style="margin: 0 0 32px; color: #8a7a70; font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6;">
                Przyjęliśmy Twoje zamówienie i niedługo przystępujemy do jego realizacji.
              </p>

              <!-- Order number badge -->
              <div style="background-color: #faf7f2; border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; border: 1px solid #f0ebe3;">
                <p style="margin: 0; color: #8a7a70; font-size: 12px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.08em;">Numer zamówienia</p>
                <p style="margin: 4px 0 0; color: #3d2b1f; font-size: 20px; font-family: Georgia, serif; font-weight: bold;">${data.orderNumber}</p>
              </div>

              <!-- Items -->
              <h3 style="margin: 0 0 12px; color: #3d2b1f; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.06em;">Zamówione produkty</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                ${itemsHtml}
                <tr><td colspan="2" style="padding: 8px 0;"></td></tr>
                ${shippingRow}
                <tr>
                  <td style="padding: 12px 0 0; color: #3d2b1f; font-size: 16px; font-family: Arial, sans-serif; font-weight: bold; border-top: 2px solid #f0ebe3;">Razem</td>
                  <td style="padding: 12px 0 0; color: #c8903c; font-size: 18px; font-family: Arial, sans-serif; font-weight: bold; text-align: right; border-top: 2px solid #f0ebe3;">${data.total.toFixed(2).replace('.', ',')} zł</td>
                </tr>
              </table>

              <!-- Shipping address -->
              <h3 style="margin: 0 0 12px; color: #3d2b1f; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.06em;">Adres dostawy</h3>
              <div style="background-color: #faf7f2; border-radius: 12px; padding: 16px 20px; margin-bottom: 32px; border: 1px solid #f0ebe3;">
                <p style="margin: 0; color: #3d2b1f; font-size: 14px; font-family: Arial, sans-serif; line-height: 1.8;">
                  ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br />
                  ${data.shippingAddress.street}<br />
                  ${data.shippingAddress.postalCode} ${data.shippingAddress.city}
                </p>
              </div>

              <!-- Timeline -->
              <h3 style="margin: 0 0 12px; color: #3d2b1f; font-size: 14px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.06em;">Co dalej?</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 8px 0; color: #8a7a70; font-size: 13px; font-family: Arial, sans-serif;">📦 Realizacja zamówienia</td>
                  <td style="padding: 8px 0; color: #3d2b1f; font-size: 13px; font-family: Arial, sans-serif; text-align: right;">1–2 dni robocze</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8a7a70; font-size: 13px; font-family: Arial, sans-serif;">🚚 Dostawa kurierska</td>
                  <td style="padding: 8px 0; color: #3d2b1f; font-size: 13px; font-family: Arial, sans-serif; text-align: right;">2–3 dni robocze</td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://bee-blossom-app.vercel.app'}/produkty"
                   style="display: inline-block; background-color: #c8903c; color: #ffffff; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-size: 14px; font-family: Arial, sans-serif; font-weight: 600;">
                  Odkryj więcej produktów →
                </a>
              </div>

              <!-- Footer note -->
              <p style="margin: 0; color: #b0a09a; font-size: 12px; font-family: Arial, sans-serif; text-align: center; line-height: 1.6;">
                Masz pytanie? Napisz na <a href="mailto:hello@beeblossom.pl" style="color: #c8903c;">hello@beeblossom.pl</a><br />
                BeeBlossomApp – ręcznie robione z miłości do natury 🌿
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
