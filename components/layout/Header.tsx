'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react'
import Container from '@/components/ui/Container'

const navLinks = [
    { href: '/produkty', label: 'Sklep' },
    { href: '/produkty?kategoria=swiece', label: 'Świece' },
    { href: '/produkty?kategoria=bukiety', label: 'Bukiety' },
    { href: '/o-nas', label: 'O nas' },
    { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    return (
        <>
            <header
                className="sticky top-0 z-40 transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? 'rgba(253,250,245,0.92)' : 'var(--cream)',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    boxShadow: scrolled ? '0 1px 0 rgba(61,43,31,0.08)' : 'none',
                }}
            >
                <Container>
                    <div className="flex h-16 items-center justify-between md:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 transition-opacity hover:opacity-80"
                            aria-label="BeeBlossomApp - strona główna"
                        >
                            <span className="text-xl">🐝</span>
                            <span
                                className="text-lg font-semibold tracking-tight"
                                style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
                            >
                                BeeBlossomApp
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden items-center gap-8 md:flex" aria-label="Nawigacja główna">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium tracking-wide transition-colors hover:opacity-60"
                                    style={{ color: 'var(--brown)' }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center gap-3">
                            <button
                                className="hidden cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:flex"
                                aria-label="Szukaj"
                                style={{ color: 'var(--brown)' }}
                            >
                                <Search size={18} />
                            </button>
                            <Link
                                href="/konto"
                                className="hidden cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:flex"
                                aria-label="Moje konto"
                                style={{ color: 'var(--brown)' }}
                            >
                                <User size={18} />
                            </Link>
                            <Link
                                href="/koszyk"
                                className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5"
                                aria-label="Koszyk"
                                style={{ color: 'var(--brown)' }}
                            >
                                <ShoppingBag size={18} />
                                <span
                                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                    style={{ backgroundColor: 'var(--amber)' }}
                                >
                                    0
                                </span>
                            </Link>
                            {/* Mobile hamburger */}
                            <button
                                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:hidden"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Otwórz menu"
                                style={{ color: 'var(--brown)' }}
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className="fixed inset-0 z-50 transition-opacity duration-300 md:hidden"
                style={{
                    backgroundColor: 'rgba(61,43,31,0.4)',
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? 'auto' : 'none',
                }}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu Drawer */}
            <div
                className="fixed bottom-0 right-0 top-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out md:hidden"
                style={{
                    backgroundColor: 'var(--cream)',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                    boxShadow: '-4px 0 30px rgba(61,43,31,0.12)',
                }}
                aria-hidden={!mobileOpen}
            >
                {/* Drawer header */}
                <div
                    className="flex items-center justify-between border-b px-6 py-5"
                    style={{ borderColor: 'var(--warm-gray-light)' }}
                >
                    <span
                        className="text-base font-semibold"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
                    >
                        Menu
                    </span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-black/5"
                        aria-label="Zamknij menu"
                        style={{ color: 'var(--brown)' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Nawigacja mobilna">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:bg-black/5"
                            style={{ color: 'var(--brown)' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Legal links */}
                <div
                    className="border-t px-4 py-6"
                    style={{ borderColor: 'var(--warm-gray-light)' }}
                >
                    <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--warm-gray)' }}>
                        Informacje prawne
                    </p>
                    {[
                        { href: '/regulamin', label: 'Regulamin' },
                        { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
                        { href: '/polityka-cookies', label: 'Polityka cookies' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-xl px-4 py-2 text-xs transition-colors hover:bg-black/5"
                            style={{ color: 'var(--warm-gray)' }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
