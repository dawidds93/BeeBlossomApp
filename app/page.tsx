import type { Metadata } from 'next'
import ShopLayout from '@/components/layout/ShopLayout'
import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import BestsellerSection from '@/components/home/BestsellerSection'
import AboutSection from '@/components/home/AboutSection'
import UspSection from '@/components/home/UspSection'

export const metadata: Metadata = {
  title: 'Bee Blossom – Flower boxy i zestawy upominkowe',
  description:
    'Ręcznie robione flower boxy i zestawy upominkowe. Naturalne, ekologiczne produkty dla domu i jako wyjątkowy prezent. Darmowa dostawa od 150 zł.',
  openGraph: {
    title: 'Bee Blossom – Flower boxy i zestawy upominkowe',
    description: 'Ręcznie robione flower boxy i zestawy upominkowe. Odkryj naszą kolekcję.',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function HomePage() {
  return (
    <ShopLayout>
      <HeroSection />
      <CategoriesSection />
      <BestsellerSection />
      <AboutSection />
      <UspSection />
    </ShopLayout>
  )
}
