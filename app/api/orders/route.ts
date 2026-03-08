import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { registerTransaction } from '@/lib/przelewy24'
import { sendOrderConfirmation } from '@/lib/email'
import type { CheckoutFormData } from '@/lib/validators/checkout'
import type { CartItem } from '@/lib/store/cart'

const FREE_SHIPPING = 150
const SHIPPING_COST = 14.99

async function generateOrderNumber(): Promise<string> {
  const today = new Date()
  const date = today.toISOString().slice(0, 10).replace(/-/g, '')
  const count = await prisma.order.count({
    where: { createdAt: { gte: new Date(today.setHours(0, 0, 0, 0)) } },
  })
  const seq = String(count + 1).padStart(4, '0')
  return `BB-${date}-${seq}`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customer: CheckoutFormData
      items: CartItem[]
      total: number
    }

    const { customer, items, total } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Koszyk jest pusty' }, { status: 400 })
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shippingCost = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST
    const totalAmount = subtotal + shippingCost
    const orderNumber = await generateOrderNumber()

    // Create order with items in transaction
    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: customer.email,
        guestPhone: customer.phone,
        shippingSnapshot: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          street: customer.street,
          city: customer.city,
          postalCode: customer.postalCode,
          country: 'PL',
        },
        notes: customer.notes,
        subtotal,
        shippingCost,
        totalAmount,
        status: 'PENDING',
        paymentMethod: 'PRZELEWY24',
        items: {
          create: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
        },
      },
    })

    // Send order confirmation email (fire-and-forget, non-blocking)
    void sendOrderConfirmation({
      orderNumber,
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      subtotal,
      shippingCost,
      total: totalAmount,
      shippingAddress: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        street: customer.street,
        city: customer.city,
        postalCode: customer.postalCode,
      },
    })

    // Register with Przelewy24
    try {
      const { redirectUrl } = await registerTransaction({
        sessionId: order.id,
        amount: Math.round(totalAmount * 100), // grosze
        currency: 'PLN',
        description: `Zamówienie ${orderNumber} – BeeBlossomApp`,
        email: customer.email,
        country: 'PL',
        language: 'pl',
      })

      // Save payment session id
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentId: order.id },
      })

      return NextResponse.json({ orderId: order.id, orderNumber, paymentUrl: redirectUrl })
    } catch (p24Error) {
      // P24 failed but order is saved – redirect to manual confirmation
      console.error('P24 error:', p24Error)
      return NextResponse.json({
        orderId: order.id,
        orderNumber,
        paymentUrl: null, // will redirect to /zamowienie/sukces without payment
      })
    }
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Nie udało się utworzyć zamówienia' }, { status: 500 })
  }
}
