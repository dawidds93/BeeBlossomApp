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

  const setFilter = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('kategoria')
    } else {
      params.set('kategoria', slug)
    }
    router.push(`/produkty?${params.toString()}`)
  }

  const filters = [{ slug: 'all', name: 'Wszystkie' }, ...categories]

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
    </div>
  )
}
