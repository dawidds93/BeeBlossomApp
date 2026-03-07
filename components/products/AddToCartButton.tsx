'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import Button from '@/components/ui/Button'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    slug: string
    stock: number
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full py-3 text-sm font-medium"
        style={{ backgroundColor: 'var(--warm-gray-light)', color: 'var(--warm-gray)' }}
      >
        Brak w magazynie
      </button>
    )
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        slug: product.slug,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity picker */}
      <div className="flex items-center gap-3">
        <span className="text-sm" style={{ color: 'var(--warm-gray)' }}>
          Ilość:
        </span>
        <div
          className="flex items-center overflow-hidden rounded-full border"
          style={{ borderColor: 'var(--warm-gray-light)' }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:bg-black/5"
            aria-label="Zmniejsz ilość"
            style={{ color: 'var(--brown)' }}
          >
            <Minus size={14} />
          </button>
          <span
            className="w-10 text-center text-sm font-semibold"
            style={{ color: 'var(--brown)' }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="flex h-9 w-9 cursor-pointer items-center justify-center transition-colors hover:bg-black/5"
            aria-label="Zwiększ ilość"
            style={{ color: 'var(--brown)' }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <Button size="lg" className="w-full gap-2" onClick={handleAdd}>
        <ShoppingBag size={18} />
        {added ? '✓ Dodano do koszyka!' : 'Dodaj do koszyka'}
      </Button>
    </div>
  )
}
