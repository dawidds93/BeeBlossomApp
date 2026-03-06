import Container from '@/components/ui/Container'

const features = [
    {
        icon: '🐝',
        title: 'Naturalny wosk pszczeli',
        desc: 'Używamy tylko czystego, nierafinowanego wosku pszczelego od lokalnych pszczelarzy.',
    },
    {
        icon: '🤲',
        title: 'Ręcznie robione',
        desc: 'Każdy produkt jest tworzony ręcznie z dbałością o każdy szczegół.',
    },
    {
        icon: '🌿',
        title: 'Ekologiczne',
        desc: 'Bez parafiny, bez sztucznych substancji. Przyjazne dla ludzi i środowiska.',
    },
    {
        icon: '📦',
        title: 'Szybka dostawa',
        desc: 'Wysyłamy w 1-2 dni robocze. Darmowa dostawa od 150 zł.',
    },
]

export default function UspSection() {
    return (
        <section
            className="py-16 md:py-24"
            style={{ backgroundColor: 'var(--brown)', color: 'white' }}
        >
            <Container>
                <div className="mb-12 text-center">
                    <h2
                        className="mb-3 text-3xl md:text-4xl"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--amber-light)' }}
                    >
                        Dlaczego warto?
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--warm-gray-light)' }}>
                        Stawiamy na jakość, naturalność i rękodzieło
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group text-center"
                        >
                            <div
                                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: 'rgba(198,139,58,0.2)' }}
                            >
                                {feature.icon}
                            </div>
                            <h3
                                className="mb-2 text-base font-semibold"
                                style={{ color: 'var(--amber-light)' }}
                            >
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray-light)' }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
