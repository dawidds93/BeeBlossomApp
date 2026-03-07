import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ProductGallery from '@/components/products/ProductGallery'
import AddToCartButton from '@/components/products/AddToCartButton'
import ProductCard from '@/components/products/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  })
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  })
  if (!product) return {}
  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.images[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  })

  if (!product) notFound()

  const price = Number(product.price)
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
  const hasDiscount = comparePrice && comparePrice > price

  // Related products
  const related = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    include: { category: true },
    take: 4,
  })

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'PLN',
      availability:
        product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  const breadcrumbs = [
    { label: 'Strona główna', href: '/' },
    { label: 'Sklep', href: '/produkty' },
    {
      label: product.category?.name ?? 'Kategoria',
      href: `/produkty?kategoria=${product.category?.slug}`,
    },
    { label: product.name },
  ]

  return (
    <ShopLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <Breadcrumbs crumbs={breadcrumbs} />

        <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Info */}
          <div>
            <p
              className="mb-2 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--amber)' }}
            >
              {product.category?.name}
            </p>
            <h1
              className="mb-4 text-3xl leading-tight md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold" style={{ color: 'var(--amber-dark)' }}>
                {price.toFixed(2).replace('.', ',')} zł
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--warm-gray)' }}>
                    {comparePrice!.toFixed(2).replace('.', ',')} zł
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                    -{Math.round(((comparePrice! - price) / comparePrice!) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mb-5">
              {product.stock > 5 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> Dostępny
                </span>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-orange-500">
                  <span className="h-2 w-2 rounded-full bg-orange-400" /> Ostatnie {product.stock}{' '}
                  szt.!
                </span>
              )}
              {product.stock === 0 && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-red-500">
                  <span className="h-2 w-2 rounded-full bg-red-400" /> Brak w magazynie
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                {product.description}
              </p>
            )}

            {/* Add to cart */}
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price,
                imageUrl: product.images[0] ?? '',
                slug: product.slug,
                stock: product.stock,
              }}
            />

            {/* Trust */}
            <div
              className="mt-6 flex flex-col gap-2 border-t pt-6"
              style={{ borderColor: 'var(--warm-gray-light)' }}
            >
              {[
                '🚚 Darmowa dostawa od 150 zł',
                '↩️ 14 dni na zwrot bez podania przyczyny',
                '🐝 100% naturalny wosk pszczeli',
              ].map((item) => (
                <p key={item} className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section
            className="border-t pt-12 pb-16"
            style={{ borderColor: 'var(--warm-gray-light)' }}
          >
            <h2
              className="mb-8 text-2xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              Może Cię zainteresować
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((p) => {
                const { default: ProductCard } = require('@/components/products/ProductCard')
                return <ProductCard key={p.id} product={p} />
              })}
            </div>
          </section>
        )}
      </Container>
    </ShopLayout>
  )
}
