import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Photo */}
          <div className="w-full flex-1 md:w-auto">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/nasza-historia.png"
                alt="Rzemieślniczka ręcznie wylewająca wosk pszczeli do słoiczków"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <p
              className="mb-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--amber)' }}
            >
              Nasza historia
            </p>
            <h2
              className="mb-6 text-3xl leading-tight md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              Tworzymy z pasji
              <br />
              <em>i miłości do natury</em>
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
              BeeBlossomApp to mała rodzinna pracownia, w której każda świeca i każdy bukiet
              powstawają ręcznie. Używamy wyłącznie naturalnego wosku pszczelego, doceniając jego
              wyjątkowe właściwości – czysty, długo palący się, z delikatnym miodowym zapachem.
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
              Wierzymy, że piękne rzeczy mogą być jednocześnie ekologiczne i etyczne. Dlatego
              współpracujemy z lokalnymi pszczelarzami i dbamy o każdy szczegół naszych produktów.
            </p>
            <Button href="/o-nas" variant="outline" size="md">
              Poznaj naszą historię
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
