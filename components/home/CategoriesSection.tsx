import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'

const categories = [
  {
    slug: 'flower-boxy-pure',
    name: 'Flower boxy - Pure',
    desc: 'Eleganckie flower boxy w czystym stylu',
    image: '/categories/pure.jpg',
    href: '/produkty?kategoria=flower-boxy-pure',
  },
  {
    slug: 'flower-boxy-color',
    name: 'Flower boxy - Color',
    desc: 'Kolorowe i radosne kompozycje flower boxów',
    image: '/categories/color.jpg',
    href: '/produkty?kategoria=flower-boxy-color',
  },
  {
    slug: 'zestawy-upominkowe',
    name: 'Zestawy upominkowe',
    desc: 'Wyjątkowe zestawy prezentowe na każdą okazję',
    image: '/categories/zestawy.jpg',
    href: '/produkty?kategoria=zestawy-upominkowe',
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 text-center">
          <h2
            className="mb-3 text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
          >
            Nasze kolekcje
          </h2>
          <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            Wybierz kategorię i znajdź coś wyjątkowego
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(61,43,31,0.08)' }}
              aria-label={`Przejdź do kategorii: ${cat.name}`}
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Text */}
              <div className="p-5" style={{ backgroundColor: 'white' }}>
                <h3 className="mb-1 text-base font-semibold" style={{ color: 'var(--brown)' }}>
                  {cat.name}
                </h3>
                <p className="mb-4 text-sm" style={{ color: 'var(--warm-gray)' }}>
                  {cat.desc}
                </p>
                <span
                  className="text-xs font-semibold tracking-wider uppercase transition-opacity group-hover:opacity-70"
                  style={{ color: 'var(--amber)' }}
                >
                  Odkryj →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
