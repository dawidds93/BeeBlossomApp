'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { User, Menu, X, Search } from 'lucide-react'
import Container from '@/components/ui/Container'
import CartButton from '@/components/cart/CartButton'

const navLinks = [
  { 
    href: '/produkty', 
    label: 'Sklep',
    subLinks: [
      { href: '/produkty?kategoria=flower-boxy-pure', label: 'Flower Boxy Pure', hasSizes: true },
      { href: '/produkty?kategoria=flower-boxy-color', label: 'Flower Boxy Color', hasSizes: true },
      { href: '/produkty?kategoria=zestawy-upominkowe', label: 'Zestawy upominkowe' },
    ]
  },
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
              <nav className="flex items-center gap-10 lg:gap-14" aria-label="Nawigacja główna">
                {navLinks.map((link) => (
                  <div key={link.href} className="group/nav relative py-4">
                    <Link
                      href={link.href}
                      className="block text-lg font-medium tracking-wide transition-colors group-hover/nav:opacity-60"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
                    >
                      {link.label}
                    </Link>
                    {link.subLinks && (
                      <div className="invisible absolute left-1/2 top-full mt-0 w-60 -translate-x-1/2 opacity-0 transition-all group-hover/nav:visible group-hover/nav:opacity-100 z-50">
                        <div className="rounded-xl bg-white p-2 shadow-xl border" style={{ borderColor: 'var(--warm-gray-light)' }}>
                          <Link href={link.href} className="block w-full rounded-md px-4 py-2.5 text-[0.95rem] font-semibold transition-colors hover:bg-black/5 mb-1" style={{ color: 'var(--brown)' }}>
                            Wszystkie produkty
                          </Link>
                          {link.subLinks.map(sub => (
                            <div key={sub.href} className="group/sub relative">
                              <Link href={sub.href} className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm transition-colors hover:bg-black/5" style={{ color: 'var(--brown)' }}>
                                {sub.label}
                                {sub.hasSizes && <span className="opacity-50 text-[10px]">▶</span>}
                              </Link>
                              {sub.hasSizes && (
                                <div className="invisible absolute left-full top-0 ml-1 w-48 opacity-0 transition-all group-hover/sub:visible group-hover/sub:opacity-100 z-50">
                                  <div className="rounded-xl bg-white p-2 shadow-xl border" style={{ borderColor: 'var(--warm-gray-light)' }}>
                                    <Link href={sub.href} className="block w-full rounded-md px-4 py-2 text-sm transition-colors hover:bg-black/5" style={{ color: 'var(--brown)' }}>Wszystkie rozmiary</Link>
                                    {['XS', 'S', 'M', 'L'].map(size => (
                                      <Link key={size} href={`${sub.href}&rozmiar=${size}`} className="block w-full rounded-md px-4 py-2 text-sm transition-colors hover:bg-black/5" style={{ color: 'var(--brown)' }}>
                                        Rozmiar {size}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
            <div key={link.href} className="flex flex-col">
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:bg-black/5"
                style={{ color: 'var(--brown)' }}
              >
                {link.label}
              </Link>
              {link.subLinks && (
                <div className="ml-4 flex flex-col gap-1 border-l pl-4 mb-2" style={{ borderColor: 'var(--warm-gray-light)' }}>
                  {link.subLinks.map(sub => (
                    <div key={sub.href} className="flex flex-col">
                      <Link
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-black/5"
                        style={{ color: 'var(--brown)' }}
                      >
                        {sub.label}
                      </Link>
                      {sub.hasSizes && (
                        <div className="ml-4 flex flex-col gap-1 border-l pl-4 mb-1" style={{ borderColor: 'var(--warm-gray-light)' }}>
                          {['XS', 'S', 'M', 'L'].map(size => (
                            <Link
                              key={size}
                              href={`${sub.href}&rozmiar=${size}`}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-xl px-4 py-1.5 text-xs font-medium transition-colors hover:bg-black/5"
                              style={{ color: 'var(--warm-gray)' }}
                            >
                              Rozmiar {size}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
