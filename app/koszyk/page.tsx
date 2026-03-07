'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import CartItemRow from '@/components/cart/CartItemRow'
import CartSummary from '@/components/cart/CartSummary'
import ShippingProgress from '@/components/cart/ShippingProgress'
import Button from '@/components/ui/Button'
import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function KoszykPage() {
  const { items, clearCart, getTotalPrice } = useCartStore()
  const total = getTotalPrice()

  const breadcrumbs = [{ label: 'Strona główna', href: '/' }, { label: 'Koszyk' }]

  return (
    <ShopLayout>
      <Container>
        <Breadcrumbs crumbs={breadcrumbs} />

        <h1
          className="mb-8 text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
        >
          Twój koszyk
        </h1>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center py-20 text-center">
            <span className="mb-4 text-6xl">🛒</span>
            <h2
              className="mb-2 text-xl font-semibold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              Koszyk jest pusty
            </h2>
            <p className="mb-8 max-w-xs text-sm" style={{ color: 'var(--warm-gray)' }}>
              Nie masz jeszcze żadnych produktów w koszyku. Odkryj naszą kolekcję!
            </p>
            <Button href="/produkty" size="lg">
              Przejdź do sklepu
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 pb-16 lg:grid-cols-3">
            {/* Items list */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between pb-4">
                <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                  {items.length} {items.length === 1 ? 'produkt' : 'produktów'}
                </p>
                <button
                  onClick={clearCart}
                  className="flex cursor-pointer items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  <Trash2 size={13} />
                  Wyczyść koszyk
                </button>
              </div>

              <div>
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/produkty"
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--amber)' }}
                >
                  ← Kontynuuj zakupy
                </Link>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="flex flex-col gap-4">
              <ShippingProgress subtotal={total} />
              <CartSummary subtotal={total} showVat />

              <Button href="/checkout" size="lg" className="w-full">
                Przejdź do płatności
              </Button>

              <div className="flex flex-wrap justify-center gap-3">
                {['Przelewy24', 'BLIK', 'Visa', 'Mastercard'].map((m) => (
                  <span
                    key={m}
                    className="rounded-md px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--cream-dark)',
                      color: 'var(--warm-gray)',
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-center text-xs" style={{ color: 'var(--warm-gray)' }}>
                🔒 Bezpieczne płatności szyfrowane SSL
              </p>
            </div>
          </div>
        )}
      </Container>
    </ShopLayout>
  )
}
