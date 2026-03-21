'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  getConsent,
  saveConsent,
  type ConsentState,
  CONSENT_EVENT,
} from '@/lib/cookieConsent'
import CookieSettingsPanel from './CookieSettingsPanel'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentConsent, setCurrentConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const existing = getConsent()
    if (!existing) {
      setVisible(true)
    } else {
      setCurrentConsent(existing)
    }

    // Allow the footer "Ustawienia cookies" button to open this panel
    const handler = () => {
      setCurrentConsent(getConsent() ?? { necessary: true, analytics: false, marketing: false })
      setShowSettings(true)
    }
    window.addEventListener('open-cookie-settings', handler)
    return () => window.removeEventListener('open-cookie-settings', handler)
  }, [])

  const handleConsent = useCallback((state: ConsentState) => {
    saveConsent(state)
    setCurrentConsent(state)
    setVisible(false)
    setShowSettings(false)
  }, [])

  const acceptAll = () =>
    handleConsent({ necessary: true, analytics: true, marketing: true })

  const rejectOptional = () =>
    handleConsent({ necessary: true, analytics: false, marketing: false })

  return (
    <>
      {/* Main banner */}
      {visible && !showSettings && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
          role="banner"
          aria-label="Informacja o plikach cookie"
          style={{ backgroundColor: 'var(--brown)' }}
        >
          <div className="container flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:py-4">
            <div className="flex-1">
              <p className="mb-1 text-sm font-semibold text-white">
                🍪 Ta strona używa plików cookie
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--warm-gray-light)' }}
              >
                Używamy plików cookie do analizy ruchu i ulepszania Twojego
                doświadczenia. Możesz zaakceptować wszystkie, użyć tylko
                niezbędnych lub dostosować swój wybór.{' '}
                <a
                  href="/polityka-cookies"
                  className="underline transition-opacity hover:opacity-80"
                  style={{ color: 'var(--amber-light)' }}
                >
                  Dowiedz się więcej
                </a>
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2 sm:flex-nowrap">
              <button
                onClick={rejectOptional}
                className="cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                style={{
                  borderColor: 'var(--warm-gray-light)',
                  color: 'var(--warm-gray-light)',
                }}
              >
                Tylko niezbędne
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                style={{
                  borderColor: 'var(--warm-gray-light)',
                  color: 'var(--warm-gray-light)',
                }}
              >
                Dostosuj
              </button>
              <button
                onClick={acceptAll}
                className="cursor-pointer rounded-full px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--amber)' }}
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <CookieSettingsPanel
          initial={currentConsent}
          onSave={handleConsent}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  )
}
