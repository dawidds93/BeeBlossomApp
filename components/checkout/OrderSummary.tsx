'use client'

import { useCartStore } from '@/lib/store/cart'
import CartSummary from '@/components/cart/CartSummary'
import ShippingProgress from '@/components/cart/ShippingProgress'
import Image from 'next/image'

export default function OrderSummary() {
  const { items, getTotalPrice } = useCartStore()
  const total = getTotalPrice()

  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-lg font-semibold"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
      >
        Twoje zamówienie
      </h2>

      {/* Items */}
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: 'var(--warm-gray-light)', backgroundColor: 'white' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-3"
            style={{ borderBottom: '1px solid var(--warm-gray-light)' }}
          >
            <div
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
              style={{ backgroundColor: 'var(--cream-dark)' }}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xl">🕯️</div>
              )}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--brown)' }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                  Ilość: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--amber-dark)' }}>
                {(item.price * item.quantity).toFixed(2).replace('.', ',')} zł
              </span>
            </div>
          </div>
        ))}
      </div>

      <ShippingProgress subtotal={total} />
      <CartSummary subtotal={total} showVat />
    </div>
  )
}
