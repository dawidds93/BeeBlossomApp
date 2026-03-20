'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@prisma/client'

interface ProductFiltersProps {
  categories: Category[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('kategoria') ?? 'all'
  const activeSize = searchParams.get('rozmiar') ?? 'all'

  const setFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('kategoria')
      params.delete('rozmiar') // Reset size when changing to all
    } else {
      params.set('kategoria', slug)
      params.delete('rozmiar') // Reset size when changing category
    }
    router.push(`/produkty?${params.toString()}`)
  }

  const setSizeFilter = (size: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (size === 'all') {
      params.delete('rozmiar')
    } else {
      params.set('rozmiar', size)
    }
    router.push(`/produkty?${params.toString()}`)
  }

  const filters = [{ slug: 'all', name: 'Wszystkie' }, ...categories]
  const sizeOptions = ['XS', 'S', 'M', 'L']
  const showSizeFilters = active === 'flower-boxy-pure' || active === 'flower-boxy-color'

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtruj produkty">
      {filters.map((cat) => {
        const isActive = cat.slug === active || (cat.slug === 'all' && active === 'all')
        return (
          <button
            key={cat.slug}
            onClick={() => setFilter(cat.slug)}
            className="cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isActive ? 'var(--amber)' : 'white',
              color: isActive ? 'white' : 'var(--brown)',
              border: isActive ? 'none' : '1px solid var(--warm-gray-light)',
            }}
            aria-pressed={isActive}
          >
            {cat.name}
          </button>
        )
      })}

      {showSizeFilters && (
        <div className="ml-0 mt-4 flex w-full flex-wrap gap-2 border-t pt-4 md:ml-4 md:mt-0 md:w-auto md:border-l md:border-t-0 md:pl-4 md:pt-0" style={{ borderColor: 'var(--warm-gray-light)' }}>
          <span className="flex items-center text-sm font-medium mr-2" style={{ color: 'var(--brown)' }}>Rozmiar:</span>
          {[{ slug: 'all', name: 'Wszystkie' }, ...sizeOptions.map(s => ({ slug: s, name: s }))].map((size) => {
            const isActive = size.slug === activeSize || (size.slug === 'all' && activeSize === 'all')
            return (
              <button
                key={size.slug}
                onClick={() => setSizeFilter(size.slug)}
                className="cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? 'var(--brown)' : 'transparent',
                  color: isActive ? 'white' : 'var(--brown)',
                  border: isActive ? 'none' : '1px solid var(--warm-gray-light)',
                }}
                aria-pressed={isActive}
              >
                {size.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
