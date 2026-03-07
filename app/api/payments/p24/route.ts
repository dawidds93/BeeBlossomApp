import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyWebhookSign, verifyTransaction } from '@/lib/przelewy24'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      merchantId,
      posId,
      sessionId, // nasz order.id
      amount,
      originAmount,
      currency,
      orderId, // ID transakcji w P24
      methodId,
      statement,
      sign,
    } = body

    // 1. Verify CRC signature
    const isValid = verifyWebhookSign({
      merchantId,
      posId,
      sessionId,
      amount,
      originAmount,
      currency,
      orderId,
      methodId,
      statement,
      sign,
    })

    if (!isValid) {
      console.error('P24 webhook: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // 2. Verify transaction with P24 API
    const verified = await verifyTransaction({
      merchantId,
      posId,
      sessionId,
      amount,
      currency,
      orderId,
    })

    if (!verified) {
      console.error('P24 webhook: transaction verification failed')
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
    }

    // 3. Update order status in DB
    await prisma.order.update({
      where: { id: sessionId },
      data: {
        status: 'PAID',
        paymentId: String(orderId),
      },
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('P24 webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
