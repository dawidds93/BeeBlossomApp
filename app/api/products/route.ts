import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const kategoria = searchParams.get('kategoria')

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(kategoria ? { category: { slug: kategoria } } : {}),
    },
    include: { category: true },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json(products)
}
