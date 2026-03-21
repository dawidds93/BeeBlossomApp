import ShopLayout from '@/components/layout/ShopLayout'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface LegalPageLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <ShopLayout>
      <Container>
        <div className="py-8 md:py-14">
          <Breadcrumbs
            crumbs={[
              { label: 'Strona główna', href: '/' },
              { label: title },
            ]}
          />

          {/* Header */}
          <div className="mb-10 mt-4">
            <h1
              className="mb-3 text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown)' }}
            >
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                Ostatnia aktualizacja: {lastUpdated}
              </p>
            )}
          </div>

          {/* Divider */}
          <div
            className="mb-10 h-px w-16"
            style={{ backgroundColor: 'var(--amber-light)' }}
          />

          {/* Content */}
          <div className="legal-prose mx-auto max-w-3xl">{children}</div>
        </div>
      </Container>
    </ShopLayout>
  )
}
