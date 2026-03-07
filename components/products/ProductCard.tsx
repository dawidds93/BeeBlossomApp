import Link from 'next/link'
import Image from 'next/image'
import type { Product, Category } from '@prisma/client'

type ProductWithCategory = Product & { category: Category }

interface ProductCardProps {
  product: ProductWithCategory
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = Number(product.price)
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null
  const hasDiscount = comparePrice && comparePrice > price
  const imageUrl = product.images[0] ?? null

  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-lg"
      aria-label={`${product.name} – ${price} zł`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isFeatured && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--amber)' }}
          >
            Polecany
          </span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            Promocja
          </span>
        )}
      </div>

      {/* Image */}
      <div
        className="relative flex h-48 items-center justify-center overflow-hidden sm:h-56"
        style={{ backgroundColor: 'var(--cream-dark)' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
            {product.category?.slug === 'swiece' ? '🕯️' : '🌸'}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs" style={{ color: 'var(--warm-gray)' }}>
          {product.category?.name}
        </p>
        <h3
          className="mb-2 flex-1 text-sm leading-snug font-semibold"
          style={{ color: 'var(--brown)' }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold" style={{ color: 'var(--amber-dark)' }}>
            {price.toFixed(2).replace('.', ',')} zł
          </span>
          {hasDiscount && (
            <span className="text-xs line-through" style={{ color: 'var(--warm-gray)' }}>
              {comparePrice!.toFixed(2).replace('.', ',')} zł
            </span>
          )}
        </div>

        {/* Stock warning */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="mt-1.5 text-xs font-medium text-orange-500">Tylko {product.stock} szt.!</p>
        )}
        {product.stock === 0 && (
          <p className="mt-1.5 text-xs font-medium text-red-500">Brak w magazynie</p>
        )}
      </div>
    </Link>
  )
}
