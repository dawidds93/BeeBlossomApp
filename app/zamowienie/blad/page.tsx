'use client'

import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function PaymentErrorPage() {
  return (
    <ShopLayout>
      <Container>
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
            ❌
          </div>
          <h1
            className="mb-3 text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
          >
            Płatność nieudana
          </h1>
          <p className="mb-2 max-w-md text-sm" style={{ color: 'var(--warm-gray)' }}>
            Płatność została odrzucona lub anulowana. Twoje zamówienie zostało zapisane w systemie –
            możesz spróbować zapłacić ponownie.
          </p>
          <p className="mb-8 text-sm" style={{ color: 'var(--warm-gray)' }}>
            Jeśli problem się powtarza, skontaktuj się z nami:{' '}
            <a
              href="mailto:hello@beeblossom.pl"
              className="underline"
              style={{ color: 'var(--amber)' }}
            >
              hello@beeblossom.pl
            </a>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/koszyk" size="md">
              Wróć do koszyka
            </Button>
            <Button href="/checkout" variant="outline" size="md">
              Spróbuj ponownie
            </Button>
          </div>
        </div>
      </Container>
    </ShopLayout>
  )
}
