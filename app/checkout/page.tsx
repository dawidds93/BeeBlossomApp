import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Checkout – finalizacja zamówienia',
  robots: { index: false },
}

export default function CheckoutPage() {
  return (
    <ShopLayout>
      <Container>
        <Breadcrumbs
          crumbs={[
            { label: 'Strona główna', href: '/' },
            { label: 'Koszyk', href: '/koszyk' },
            { label: 'Finalizacja zamówienia' },
          ]}
        />

        <h1
          className="mb-8 text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
        >
          Finalizacja zamówienia
        </h1>

        <div className="grid grid-cols-1 gap-10 pb-16 lg:grid-cols-5">
          {/* Form – 3/5 */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{ borderColor: 'var(--warm-gray-light)', backgroundColor: 'white' }}
            >
              <CheckoutForm />
            </div>
          </div>

          {/* Summary – 2/5 */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <OrderSummary />
            </div>
          </div>
        </div>
      </Container>
    </ShopLayout>
  )
}
