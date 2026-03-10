import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'

const shopLinks = [
  { href: '/produkty', label: 'Wszystkie produkty' },
  { href: '/produkty?kategoria=swiece', label: 'Świece z wosku' },
  { href: '/produkty?kategoria=bukiety', label: 'Bukiety woskowe' },
  { href: '/produkty?kategoria=zestawy', label: 'Zestawy prezentowe' },
]

const legalLinks = [
  { href: '/regulamin', label: 'Regulamin sklepu' },
  { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
  { href: '/polityka-cookies', label: 'Polityka cookies' },
  { href: '/zwroty', label: 'Zwroty i reklamacje' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto"
      style={{ backgroundColor: 'var(--brown)', color: 'white' }}
      aria-label="Stopka strony"
    >
      {/* Main footer */}
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 md:gap-8">
          {/* Col 1: Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:pl-8 md:text-left lg:pl-16">
            <Link
              href="/"
              className="mb-4 flex items-center justify-center gap-2 transition-opacity hover:opacity-80 md:justify-start"
            >
              <Image
                src="/logo_footer_white.png"
                alt="Bee Blossom logo"
                width={200}
                height={150}
                className="h-auto w-40 object-contain opacity-90"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--warm-gray-light)' }}>
              Ręcznie robione świece i bukiety z naturalnego wosku pszczelego. Tworzymy z pasją,
              dbając o każdy detal.
            </p>
            {/* Social media */}
            <div className="flex justify-center gap-3 md:justify-start">
              {[
                { href: 'https://instagram.com', label: 'Instagram', icon: 'IG' },
                { href: 'https://facebook.com', label: 'Facebook', icon: 'FB' },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'var(--warm-gray-light)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h3
              className="mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--amber-light)' }}
            >
              Sklep
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: 'var(--warm-gray-light)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h3
              className="mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--amber-light)' }}
            >
              Informacje
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: 'var(--warm-gray-light)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Container>
          <div
            className="flex flex-col items-center justify-between gap-2 py-5 text-xs md:flex-row"
            style={{ color: 'var(--warm-gray)' }}
          >
            <p>© {year} Bee Blossom. Wszelkie prawa zastrzeżone.</p>
            <p>NIP: 000-000-00-00 &nbsp;·&nbsp; REGON: 000000000</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
