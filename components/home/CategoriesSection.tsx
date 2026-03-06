import Link from 'next/link'
import Container from '@/components/ui/Container'

const categories = [
    {
        slug: 'swiece',
        name: 'Świece',
        desc: 'Klasyczne i ozdobne świece z wosku pszczelego',
        emoji: '🕯️',
        bg: 'var(--amber)',
        href: '/produkty?kategoria=swiece',
    },
    {
        slug: 'bukiety',
        name: 'Bukiety',
        desc: 'Wyjątkowe bukiety z woskowych kwiatów',
        emoji: '🌸',
        bg: 'var(--cream-dark)',
        href: '/produkty?kategoria=bukiety',
    },
    {
        slug: 'zestawy',
        name: 'Zestawy prezentowe',
        desc: 'Gotowe zestawy na każdą okazję',
        emoji: '🎁',
        bg: 'var(--brown-light)',
        href: '/produkty?kategoria=zestawy',
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
                            style={{
                                boxShadow: '0 4px 24px rgba(61,43,31,0.08)',
                            }}
                            aria-label={`Przejdź do kategorii: ${cat.name}`}
                        >
                            {/* Color block */}
                            <div
                                className="flex h-52 items-center justify-center"
                                style={{ backgroundColor: cat.bg }}
                            >
                                <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                                    {cat.emoji}
                                </span>
                            </div>

                            {/* Text */}
                            <div className="p-5" style={{ backgroundColor: 'white' }}>
                                <h3
                                    className="mb-1 text-base font-semibold"
                                    style={{ color: 'var(--brown)' }}
                                >
                                    {cat.name}
                                </h3>
                                <p className="mb-4 text-sm" style={{ color: 'var(--warm-gray)' }}>
                                    {cat.desc}
                                </p>
                                <span
                                    className="text-xs font-semibold uppercase tracking-wider transition-opacity group-hover:opacity-70"
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
