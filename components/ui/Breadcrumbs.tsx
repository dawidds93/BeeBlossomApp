import Link from 'next/link'

type Crumb = { label: string; href?: string }

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: crumb.href } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol
          className="flex flex-wrap items-center gap-1 text-xs"
          style={{ color: 'var(--warm-gray)' }}
        >
          {crumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href && i < crumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:underline"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  style={{ color: 'var(--brown)' }}
                  aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
