import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

const mockProducts = [
    { id: '1', name: 'Świeca miodowa klasyczna', price: 45, emoji: '🕯️', bg: '#f0d9b5', badge: null },
    { id: '2', name: 'Bukiet z lilii woskowej', price: 89, emoji: '🌸', bg: '#f5e6e0', badge: 'Bestseller' },
    { id: '3', name: 'Zestaw prezentowy L', price: 129, emoji: '🎁', bg: '#e8ddd5', badge: 'Nowość' },
    { id: '4', name: 'Mini świeczki (3 szt.)', price: 65, emoji: '✨', bg: '#f0e8d0', badge: null },
]

export default function BestsellerSection() {
    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--cream-dark)' }}>
            <Container>
                <div className="mb-10 text-center">
                    <h2
                        className="mb-3 text-3xl md:text-4xl"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
                    >
                        Polecane produkty
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                        Najchętniej wybierane przez naszych klientów
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {mockProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-lg"
                        >
                            {/* Badge */}
                            {product.badge && (
                                <span
                                    className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                                    style={{ backgroundColor: 'var(--amber)' }}
                                >
                                    {product.badge}
                                </span>
                            )}

                            {/* Product image placeholder */}
                            <div
                                className="flex h-40 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-48"
                                style={{ backgroundColor: product.bg }}
                            >
                                <span className="text-5xl">{product.emoji}</span>
                            </div>

                            {/* Product info */}
                            <div className="p-4">
                                <h3
                                    className="mb-1 text-sm font-semibold leading-snug"
                                    style={{ color: 'var(--brown)' }}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    className="mb-4 text-base font-bold"
                                    style={{ color: 'var(--amber-dark)' }}
                                >
                                    {product.price} zł
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full !rounded-xl"
                                    aria-label={`Dodaj do koszyka: ${product.name}`}
                                >
                                    Do koszyka
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Button href="/produkty" variant="ghost" size="md">
                        Zobacz wszystkie produkty
                    </Button>
                </div>
            </Container>
        </section>
    )
}
