import type { Metadata } from 'next'
import ShopLayout from '@/components/layout/ShopLayout'
import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import BestsellerSection from '@/components/home/BestsellerSection'
import AboutSection from '@/components/home/AboutSection'
import UspSection from '@/components/home/UspSection'

export const metadata: Metadata = {
  title: 'BeeBlossomApp – Świece i bukiety z wosku pszczelego',
  description:
    'Ręcznie robione świece i bukiety z naturalnego wosku pszczelego. Naturalne, ekologiczne produkty dla domu i jako wyjątkowy prezent. Darmowa dostawa od 150 zł.',
  openGraph: {
    title: 'BeeBlossomApp – Świece i bukiety z wosku pszczelego',
    description: 'Ręcznie robione z naturalnego wosku pszczelego. Odkryj naszą kolekcję.',
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
