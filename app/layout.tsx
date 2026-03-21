import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/cookies/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'Bee Blossom – Flower boxy i zestawy upominkowe',
    template: '%s | Bee Blossom',
  },
  description:
    'Ręcznie robione flower boxy i zestawy upominkowe. Naturalne, ekologiczne produkty dla domu i jako wyjątkowy prezent.',
  keywords: [
    'flower boxy',
    'zestawy upominkowe',
    'flower boxy pure',
    'prezent handmade',
  ],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Bee Blossom',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <GoogleAnalytics />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

