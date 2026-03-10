import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Desktop: side by side | Mobile: stacked */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: '90vh' }}>
        {/* Text side */}
        <div className="flex flex-1 flex-col justify-center px-6 py-16 md:px-16 md:py-24 lg:px-24">
          <p
            className="mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--amber)' }}
          >
            Naturalne · Ręcznie robione · z Miłością 🐝
          </p>
          <h1
            className="mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
          >
            Świece i bukiety
            <br />
            <em>z wosku pszczelego</em>
          </h1>
          <p
            className="mb-8 max-w-md text-base leading-relaxed"
            style={{ color: 'var(--warm-gray)' }}
          >
            Każdy produkt powstaje ręcznie, z naturalnego wosku pszczelego. Idealny prezent i
            wyjątkowa dekoracja Twojego domu.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/produkty" size="lg">
              Odkryj kolekcję
            </Button>
            <Button href="/produkty?kategoria=bukiety" variant="ghost" size="lg">
              Bukiety z wosku
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { icon: '🌿', text: '100% naturalny wosk pszczeli' },
              { icon: '📦', text: 'Dostawa w 2–3 dni' },
              { icon: '↩️', text: '14 dni na zwrot' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <span className="text-base">{badge.icon}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--warm-gray)' }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="relative min-h-64 flex-1 md:min-h-auto">
          <Image
            src="/hero.png"
            alt="Ręcznie robione świece i bukiety z wosku pszczelego"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, var(--cream) 0%, transparent 30%)',
              display: 'none',
            }}
          />
        </div>
      </div>
    </section>
  )
}
