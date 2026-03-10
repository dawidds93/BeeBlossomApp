'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { User, Menu, X, Search } from 'lucide-react'
import Container from '@/components/ui/Container'
import CartButton from '@/components/cart/CartButton'

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
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(232,227,222,0.92)' : 'var(--cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(61,43,31,0.08)' : 'none',
        }}
      >
        <Container>
          <div className="flex h-20 items-center justify-between md:h-28">
            {/* Logo Wrapper */}
            <div className="flex flex-1 justify-start">
              <Link
                href="/"
                className="flex flex-col items-center justify-center transition-opacity hover:opacity-80"
                aria-label="Bee Blossom - strona główna"
              >
                <div
                  className="text-2xl leading-none tracking-[0.15em] text-[#5C432E] md:text-[1.75rem]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  BEE BLOSSOM
                </div>
                <div className="my-[0.35rem] h-[1px] w-10 bg-[#5C432E] opacity-50"></div>
                <div className="ml-1 text-[0.55rem] leading-none tracking-[0.25em] text-[#5C432E] uppercase md:text-[0.6rem]">
                  NATURALNY WOSK PSZCZELI
                </div>
              </Link>
            </div>

            {/* Desktop nav Wrapper */}
            <div className="hidden flex-none justify-center md:flex">
              <nav className="flex items-center gap-10" aria-label="Nawigacja główna">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium tracking-wide transition-colors hover:opacity-60"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Icons Wrapper */}
            <div className="flex flex-1 items-center justify-end gap-5">
              <button
                className="hidden cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:flex"
                aria-label="Szukaj"
                style={{ color: 'var(--brown)' }}
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <Link
                href="/konto"
                className="hidden cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:flex"
                aria-label="Moje konto"
                style={{ color: 'var(--brown)' }}
              >
                <User size={22} strokeWidth={1.5} />
              </Link>
              <div className="scale-110">
                <CartButton />
              </div>
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
        className="fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out md:hidden"
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
            Nawigacja
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
        <div className="border-t px-4 py-6" style={{ borderColor: 'var(--warm-gray-light)' }}>
          <p
            className="mb-3 px-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--warm-gray)' }}
          >
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
