'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import CartItemRow from './CartItemRow'
import CartSummary from './CartSummary'
import ShippingProgress from './ShippingProgress'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, getTotalItems, getTotalPrice } = useCartStore()
  const total = getTotalPrice()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(61,43,31,0.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-sm flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--cream)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-4px 0 30px rgba(61,43,31,0.12)',
        }}
        aria-label="Koszyk"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: 'var(--warm-gray-light)' }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} style={{ color: 'var(--brown)' }} />
            <span
              className="font-semibold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              Koszyk
            </span>
            {getTotalItems() > 0 && (
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--amber)' }}
              >
                {getTotalItems()}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-black/5"
            aria-label="Zamknij koszyk"
            style={{ color: 'var(--brown)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="mb-4 text-5xl">🛒</span>
              <p className="mb-1 font-semibold" style={{ color: 'var(--brown)' }}>
                Twój koszyk jest pusty
              </p>
              <p className="mb-6 text-sm" style={{ color: 'var(--warm-gray)' }}>
                Odkryj nasze ręcznie robione produkty
              </p>
              <Button href="/produkty" size="sm" onClick={closeCart}>
                Przejdź do sklepu
              </Button>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer (only when items exist) */}
        {items.length > 0 && (
          <div className="border-t px-5 py-4" style={{ borderColor: 'var(--warm-gray-light)' }}>
            <div className="mb-3">
              <ShippingProgress subtotal={total} />
            </div>
            <div className="mb-4">
              <CartSummary subtotal={total} showVat={false} />
            </div>
            <Link
              href="/koszyk"
              onClick={closeCart}
              className="block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--amber)' }}
            >
              Przejdź do koszyka
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
