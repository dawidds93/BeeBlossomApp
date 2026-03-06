'use client'

import { useEffect, useState } from 'react'
import Button from './Button'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) setVisible(true)
    }, [])

    const accept = (type: 'all' | 'necessary') => {
        localStorage.setItem('cookie-consent', type)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 shadow-2xl md:p-6"
            style={{ backgroundColor: 'var(--brown)', color: 'white' }}
            role="banner"
            aria-label="Informacja o plikach cookie"
        >
            <div className="container flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-white">🍪 Ta strona używa plików cookie</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--warm-gray-light)' }}>
                        Używamy plików cookie, aby zapewnić Ci najlepsze doświadczenie na naszej stronie. Pliki
                        cookie analityczne pomagają nam rozumieć, jak korzystasz ze sklepu.{' '}
                        <a
                            href="/polityka-cookies"
                            className="underline transition-opacity hover:opacity-80"
                            style={{ color: 'var(--amber-light)' }}
                        >
                            Dowiedz się więcej
                        </a>
                    </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <button
                        onClick={() => accept('necessary')}
                        className="cursor-pointer rounded-full border px-5 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                        style={{ borderColor: 'var(--warm-gray-light)', color: 'var(--warm-gray-light)' }}
                    >
                        Tylko niezbędne
                    </button>
                    <Button size="sm" onClick={() => accept('all')}>
                        Akceptuj wszystkie
                    </Button>
                </div>
            </div>
        </div>
    )
}
