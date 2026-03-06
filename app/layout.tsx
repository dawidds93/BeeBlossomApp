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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
