'use client'

import { useCartStore } from '@/lib/store/cart'
import { ShoppingBag } from 'lucide-react'

export default function CartButton() {
  const { openCart, getTotalItems } = useCartStore()
  const count = getTotalItems()

  return (
    <button
      onClick={openCart}
      className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5"
      aria-label={`Koszyk – ${count} ${count === 1 ? 'produkt' : 'produktów'}`}
      style={{ color: 'var(--brown)' }}
    >
      <ShoppingBag size={18} />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: 'var(--amber)' }}
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
