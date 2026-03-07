'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, type CartItem } from '@/lib/store/cart'

interface CartItemProps {
  item: CartItem
}

export default function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-3 py-4" style={{ borderBottom: '1px solid var(--warm-gray-light)' }}>
      {/* Image */}
      <div
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
        style={{ backgroundColor: 'var(--cream-dark)' }}
      >
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">🕯️</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-snug font-medium" style={{ color: 'var(--brown)' }}>
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-black/5"
            aria-label={`Usuń ${item.name}`}
            style={{ color: 'var(--warm-gray)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div
            className="flex items-center overflow-hidden rounded-full border"
            style={{ borderColor: 'var(--warm-gray-light)' }}
          >
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center text-xs transition-colors hover:bg-black/5"
              aria-label="Zmniejsz"
              style={{ color: 'var(--brown)' }}
            >
              <Minus size={12} />
            </button>
            <span
              className="w-8 text-center text-sm font-semibold"
              style={{ color: 'var(--brown)' }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center text-xs transition-colors hover:bg-black/5"
              aria-label="Zwiększ"
              style={{ color: 'var(--brown)' }}
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-bold" style={{ color: 'var(--amber-dark)' }}>
            {(item.price * item.quantity).toFixed(2).replace('.', ',')} zł
          </span>
        </div>
      </div>
    </div>
  )
}
