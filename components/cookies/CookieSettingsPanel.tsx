'use client'

import { useState } from 'react'
import type { ConsentState } from '@/lib/cookieConsent'

interface CookieSettingsPanelProps {
  initial: ConsentState
  onSave: (state: ConsentState) => void
  onClose: () => void
}

export default function CookieSettingsPanel({
  initial,
  onSave,
  onClose,
}: CookieSettingsPanelProps) {
  const [analytics, setAnalytics] = useState(initial.analytics)
  const [marketing, setMarketing] = useState(initial.marketing)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Ustawienia cookies"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg rounded-t-2xl p-6 shadow-2xl sm:rounded-2xl"
        style={{ backgroundColor: 'var(--cream)' }}
      >
        <h2
          className="mb-1 text-xl"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
        >
          Ustawienia cookies
        </h2>
        <p className="mb-6 text-xs" style={{ color: 'var(--warm-gray)' }}>
          Wybierz, które pliki cookies akceptujesz. Możesz zmienić ustawienia w
          dowolnym momencie.
        </p>

        <div className="flex flex-col gap-4">
          {/* Necessary – always on */}
          <CookieToggleRow
            title="Niezbędne"
            description="Wymagane do działania sklepu (sesja, koszyk, ustawienia cookies). Nie można ich wyłączyć."
            checked={true}
            disabled
          />

          {/* Analytics */}
          <CookieToggleRow
            title="Analityczne"
            description="Google Analytics 4 – pomagają nam rozumieć, jak korzystasz ze sklepu. Dane są anonimizowane."
            checked={analytics}
            onChange={setAnalytics}
          />

          {/* Marketing */}
          <CookieToggleRow
            title="Marketingowe"
            description="Aktualnie nieużywane. Zarezerwowane na przyszłość."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-full border px-5 py-2.5 text-xs font-medium transition-colors"
            style={{
              borderColor: 'var(--cream-dark)',
              color: 'var(--warm-gray)',
            }}
          >
            Anuluj
          </button>
          <button
            onClick={() =>
              onSave({ necessary: true, analytics, marketing })
            }
            className="rounded-full px-6 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--amber)' }}
          >
            Zapisz ustawienia
          </button>
        </div>
      </div>
    </div>
  )
}

interface ToggleRowProps {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}

function CookieToggleRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: ToggleRowProps) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl p-4"
      style={{ backgroundColor: 'var(--cream-dark)' }}
    >
      <div className="flex-1">
        <p
          className="mb-0.5 text-sm font-semibold"
          style={{ color: 'var(--brown)' }}
        >
          {title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
          {description}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`${checked ? 'Wyłącz' : 'Włącz'} cookies ${title.toLowerCase()}`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors"
        style={{
          backgroundColor: checked ? 'var(--amber)' : 'var(--warm-gray)',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{ left: checked ? '1.375rem' : '0.125rem' }}
        />
      </button>
    </div>
  )
}
