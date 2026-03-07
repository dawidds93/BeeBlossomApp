'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart'
import { checkoutSchema, type CheckoutFormData } from '@/lib/validators/checkout'
import Button from '@/components/ui/Button'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

function InputField({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--brown)' }}>
        {label} {props.required && <span className="text-red-400">*</span>}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none focus:border-amber-400"
        style={{
          borderColor: error ? '#ef4444' : 'var(--warm-gray-light)',
          backgroundColor: 'white',
          color: 'var(--brown)',
        }}
      />
      <FieldError message={error} />
    </div>
  )
}

export default function CheckoutForm() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { acceptMarketing: false },
  })

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) return

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: data, items, total: getTotalPrice() }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError('root', { message: err.error ?? 'Błąd tworzenia zamówienia' })
        return
      }

      const { paymentUrl } = await res.json()
      clearCart()

      if (paymentUrl) {
        window.location.href = paymentUrl
      } else {
        router.push('/zamowienie/sukces')
      }
    } catch {
      setError('root', { message: 'Wystąpił błąd. Spróbuj ponownie.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2
        className="mb-6 text-lg font-semibold"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
      >
        Dane do wysyłki
      </h2>

      {/* Name row */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <InputField
          label="Imię"
          required
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <InputField
          label="Nazwisko"
          required
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      {/* Contact row */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <InputField
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          label="Telefon"
          type="tel"
          required
          placeholder="123 456 789"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <InputField
          label="Ulica i numer domu/mieszkania"
          required
          autoComplete="street-address"
          placeholder="np. ul. Kwiatowa 12/4"
          error={errors.street?.message}
          {...register('street')}
        />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <InputField
          label="Kod pocztowy"
          required
          placeholder="00-000"
          autoComplete="postal-code"
          error={errors.postalCode?.message}
          {...register('postalCode')}
        />
        <InputField
          label="Miasto"
          required
          autoComplete="address-level2"
          error={errors.city?.message}
          {...register('city')}
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium" style={{ color: 'var(--brown)' }}>
          Uwagi do zamówienia
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Opcjonalnie – np. godziny dostawy, piętro..."
          className="w-full rounded-xl border px-4 py-3 text-sm transition-colors outline-none focus:border-amber-400"
          style={{
            borderColor: 'var(--warm-gray-light)',
            backgroundColor: 'white',
            color: 'var(--brown)',
            resize: 'none',
          }}
        />
      </div>

      {/* Checkboxes */}
      <div className="mb-6 flex flex-col gap-3">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className="mt-0.5 h-4 w-4 cursor-pointer accent-amber-500"
          />
          <span className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            Akceptuję{' '}
            <a
              href="/regulamin"
              target="_blank"
              className="underline"
              style={{ color: 'var(--amber)' }}
            >
              regulamin sklepu
            </a>{' '}
            i{' '}
            <a
              href="/polityka-prywatnosci"
              target="_blank"
              className="underline"
              style={{ color: 'var(--amber)' }}
            >
              politykę prywatności
            </a>
            . <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.acceptTerms && (
          <div
            className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600"
            style={{ border: '1px solid #fca5a5' }}
          >
            <span>⚠️</span>
            <span>Aby dokonać zakupu musisz zaakceptować regulamin i politykę prywatności.</span>
          </div>
        )}

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register('acceptMarketing')}
            className="mt-0.5 h-4 w-4 cursor-pointer accent-amber-500"
          />
          <span className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            Chcę otrzymywać informacje o promocjach i nowościach (opcjonalne)
          </span>
        </label>
      </div>

      {/* Global error */}
      {errors.root && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Przekierowuję do płatności...' : '🔒 Przejdź do płatności'}
      </Button>

      <p className="mt-3 text-center text-xs" style={{ color: 'var(--warm-gray)' }}>
        Płatności realizowane przez Przelewy24. Dane szyfrowane SSL.
      </p>
    </form>
  )
}
