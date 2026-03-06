import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BeeBlossomApp – Świece i bukiety z wosku pszczelego',
    template: '%s | BeeBlossomApp',
  },
  description:
    'Ręcznie robione świece i bukiety z wosku pszczelego. Naturalne, ekologiczne produkty dla domu i jako wyjątkowy prezent.',
  keywords: ['świece z wosku pszczelego', 'bukiety z wosku', 'naturalne świece', 'prezent handmade'],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'BeeBlossomApp',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
