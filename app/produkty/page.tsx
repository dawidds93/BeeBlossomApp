import { Suspense } from 'react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'
import { ProductGridSkeleton } from '@/components/products/ProductSkeleton'

interface PageProps {
  searchParams: Promise<{ kategoria?: string; rozmiar?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { kategoria, rozmiar } = await searchParams
  let displayName = kategoria;
  if (kategoria === 'flower-boxy-pure') displayName = 'Pure';
  else if (kategoria === 'flower-boxy-color') displayName = 'Color';
  else if (kategoria === 'zestawy-upominkowe') displayName = 'Zestawy upominkowe';

  const title = displayName
    ? `${displayName.charAt(0).toUpperCase() + displayName.slice(1)} – Sklep`
    : 'Sklep – wszystkie produkty'
  return {
    title,
    description: 'Przeglądaj naszą kolekcję ręcznie robionych świec i bukietów z wosku pszczelego.',
  }
}

async function ProductList({ kategoria, rozmiar }: { kategoria?: string; rozmiar?: string }) {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(kategoria ? { category: { slug: kategoria } } : {}),
      ...(rozmiar ? { size: rozmiar as any } : {}),
    },
    include: { category: true },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  })

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg" style={{ color: 'var(--warm-gray)' }}>
          Brak produktów w tej kategorii.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { kategoria, rozmiar } = await searchParams
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <ShopLayout>
      <Container>
        <div className="py-10 md:py-16">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="mb-2 text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              {kategoria 
                ? `Kolekcja: ${kategoria === 'flower-boxy-pure' ? 'Pure' : kategoria === 'flower-boxy-color' ? 'Color' : kategoria === 'zestawy-upominkowe' ? 'Zestawy upominkowe' : kategoria}` 
                : 'Wszystkie produkty'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
              Ręcznie robione z naturalnego wosku pszczelego
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Suspense fallback={null}>
              <ProductFilters categories={categories} />
            </Suspense>
          </div>

          {/* Grid */}
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductList kategoria={kategoria} rozmiar={rozmiar} />
          </Suspense>
        </div>
      </Container>
    </ShopLayout>
  )
}
