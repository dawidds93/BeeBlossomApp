'use client'

const FREE_SHIPPING_THRESHOLD = 150

interface ShippingProgressProps {
  subtotal: number
}

export default function ShippingProgress({ subtotal }: ShippingProgressProps) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return (
      <div
        className="rounded-xl p-3 text-center text-sm font-medium"
        style={{ backgroundColor: '#dcfce7', color: '#166534' }}
      >
        🎉 Masz darmową dostawę!
      </div>
    )
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress = (subtotal / FREE_SHIPPING_THRESHOLD) * 100

  return (
    <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--cream-dark)' }}>
      <p className="mb-2 text-xs" style={{ color: 'var(--warm-gray)' }}>
        Brakuje Ci{' '}
        <strong style={{ color: 'var(--amber-dark)' }}>
          {remaining.toFixed(2).replace('.', ',')} zł
        </strong>{' '}
        do darmowej dostawy
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--warm-gray-light)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: 'var(--amber)' }}
        />
      </div>
    </div>
  )
}
