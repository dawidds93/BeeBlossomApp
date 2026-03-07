import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { prisma } from '@/lib/prisma'

export default async function BestsellerSection() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  })

  if (products.length === 0) return null

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--cream-dark)' }}>
      <Container>
        <div className="mb-10 text-center">
          <h2
            className="mb-3 text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
          >
            Polecane produkty
          </h2>
          <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            Najchętniej wybierane przez naszych klientów
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => {
            const price = Number(product.price)
            const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
            const imageUrl = product.images[0] ?? null

            return (
              <Link
                key={product.id}
                href={`/produkt/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div
                  className="relative h-40 overflow-hidden sm:h-48"
                  style={{ backgroundColor: 'var(--cream-dark)' }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      {product.category?.slug === 'swiece' ? '🕯️' : '🌸'}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="mb-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
                    {product.category?.name}
                  </p>
                  <h3
                    className="mb-2 text-sm leading-snug font-semibold"
                    style={{ color: 'var(--brown)' }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold" style={{ color: 'var(--amber-dark)' }}>
                      {price.toFixed(2).replace('.', ',')} zł
                    </span>
                    {comparePrice && comparePrice > price && (
                      <span className="text-xs line-through" style={{ color: 'var(--warm-gray)' }}>
                        {comparePrice.toFixed(2).replace('.', ',')} zł
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="/produkty" variant="ghost" size="md">
            Zobacz wszystkie produkty
          </Button>
        </div>
      </Container>
    </section>
  )
}
