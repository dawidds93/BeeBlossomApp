'use client'

const FREE_SHIPPING_THRESHOLD = 150
const SHIPPING_COST = 14.99

interface CartSummaryProps {
  subtotal: number
  showVat?: boolean
}

export default function CartSummary({ subtotal, showVat = true }: CartSummaryProps) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping
  // VAT is included in brutto prices (23% VAT): VAT = total × 23/123
  const vatAmount = total * (23 / 123)

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--cream-dark)' }}>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: 'var(--warm-gray)' }}>Wartość produktów</span>
          <span style={{ color: 'var(--brown)' }}>{subtotal.toFixed(2).replace('.', ',')} zł</span>
        </div>

        <div className="flex justify-between">
          <span style={{ color: 'var(--warm-gray)' }}>Koszt dostawy</span>
          <span style={{ color: shipping === 0 ? 'green' : 'var(--brown)' }}>
            {shipping === 0 ? 'Bezpłatna 🎉' : `${shipping.toFixed(2).replace('.', ',')} zł`}
          </span>
        </div>

        <div className="my-1 border-t pt-2" style={{ borderColor: 'var(--warm-gray-light)' }}>
          <div className="flex justify-between font-bold">
            <span style={{ color: 'var(--brown)' }}>Razem</span>
            <span style={{ color: 'var(--amber-dark)', fontSize: '1.1rem' }}>
              {total.toFixed(2).replace('.', ',')} zł
            </span>
          </div>
        </div>

        {showVat && (
          <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
            w tym VAT 23%: {vatAmount.toFixed(2).replace('.', ',')} zł
          </p>
        )}
      </div>
    </div>
  )
}
