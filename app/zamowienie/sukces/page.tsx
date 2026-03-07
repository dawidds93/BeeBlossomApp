'use client'

import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart'
import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const clearCart = useCartStore((s) => s.clearCart)
  const session = searchParams.get('session')

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✅
      </div>
      <h1
        className="mb-3 text-3xl md:text-4xl"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
      >
        Dziękujemy za zamówienie!
      </h1>
      <p className="mb-2 text-sm" style={{ color: 'var(--warm-gray)' }}>
        Potwierdzenie zostało wysłane na Twój adres email.
      </p>
      {session && (
        <p
          className="mb-8 rounded-xl px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: 'var(--cream-dark)', color: 'var(--brown)' }}
        >
          Nr zamówienia: <strong>{session}</strong>
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/produkty" variant="outline" size="md">
          Wróć do sklepu
        </Button>
        <Button href="/" size="md">
          Strona główna
        </Button>
      </div>

      <div className="mt-12 max-w-sm">
        <p className="mb-2 text-sm font-medium" style={{ color: 'var(--brown)' }}>
          Co dalej?
        </p>
        <ul className="space-y-2 text-left text-sm" style={{ color: 'var(--warm-gray)' }}>
          <li>📧 Otrzymasz email z potwierdzeniem zamówienia</li>
          <li>📦 Zamówienie zostanie przekazane do realizacji w ciągu 1-2 dni roboczych</li>
          <li>🚚 Dostawa kurierem DPD/InPost w 2-3 dni robocze</li>
        </ul>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <ShopLayout>
      <Container>
        <Suspense fallback={<div className="py-20 text-center">Ładowanie...</div>}>
          <SuccessContent />
        </Suspense>
      </Container>
    </ShopLayout>
  )
}
