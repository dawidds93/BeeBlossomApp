import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Clean up
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Categories
  const swiece = await prisma.category.create({
    data: {
      name: 'Świece',
      slug: 'swiece',
      description: 'Ręcznie robione świece z naturalnego wosku pszczelego',
      sortOrder: 1,
    },
  })

  const bukiety = await prisma.category.create({
    data: {
      name: 'Bukiety woskowe',
      slug: 'bukiety',
      description: 'Wyjątkowe bukiety z woskowych kwiatów – idealne jako prezent',
      sortOrder: 2,
    },
  })

  // Products – Świece
  await prisma.product.createMany({
    data: [
      {
        name: 'Świeca miodowa klasyczna',
        slug: 'swieca-miodowa-klasyczna',
        description: 'Klasyczna świeca z czystego wosku pszczelego o delikatnym miodowym aromacie.',
        longDesc:
          'Nasza flagowa świeca wykonana jest w 100% z naturalnego wosku pszczelego pozyskiwanego od lokalnych pszczelarzy. Pali się długo i równomiernie, wypełniając pomieszczenie subtelnym zapachem miodu. Świetna jako dekoracja lub prezent.',
        price: 45.0,
        comparePrice: null,
        sku: 'SW-001',
        stock: 24,
        images: ['/products/swieca-miodowa-klasyczna.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 200,
        categoryId: swiece.id,
      },
      {
        name: 'Świeca z lawendą',
        slug: 'swieca-z-lawenda',
        description: 'Wosk pszczeli z dodatkiem suszonej lawendy – relaks i spokój w jednym.',
        longDesc:
          'Połączenie naturalnego wosku pszczelego z organiczną lawendą tworzy wyjątkową kompozycję zapachową. Idealna do sypialni i miejsc relaksu. Czas palenia ok. 20 godzin.',
        price: 55.0,
        comparePrice: 69.0,
        sku: 'SW-002',
        stock: 18,
        images: ['/products/swieca-z-lawenda.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 220,
        categoryId: swiece.id,
      },
      {
        name: 'Świeca w słoiku – miód i wanilia',
        slug: 'swieca-w-sloiku-miod-i-wanilia',
        description: 'Przytulna świeca w szklanym słoiku z warmą kompozycją miodu i wanilii.',
        longDesc:
          'Świeca w uroczym szklanym słoiku, który po wypaleniu można wykorzystać ponownie. Aromat miodu i wanilii tworzy ciepłą, przytulną atmosferę. Idealna na prezent.',
        price: 39.0,
        comparePrice: null,
        sku: 'SW-003',
        stock: 30,
        images: ['/products/swieca-w-sloiku.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 180,
        categoryId: swiece.id,
      },
    ],
  })

  // Products – Bukiety
  await prisma.product.createMany({
    data: [
      {
        name: 'Bukiet z białych lilii woskowych',
        slug: 'bukiet-z-bialych-lilii-woskowych',
        description: 'Elegancki bukiet z ręcznie formowanych białych lilii z wosku pszczelego.',
        longDesc:
          'Każdy kwiat jest ręcznie uformowany z naturalnego wosku pszczelego i wymaga kilku godzin pracy. Bukiet nie więdnie i zachowuje piękny wygląd przez lata. Idealny prezent na ślub, chrzciny lub urodziny.',
        price: 89.0,
        comparePrice: null,
        sku: 'BK-001',
        stock: 8,
        images: ['/products/bukiet-lilie.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 350,
        categoryId: bukiety.id,
      },
      {
        name: 'Mini bukiet różany',
        slug: 'mini-bukiet-rozany',
        description:
          'Mały, urokliwy bukiecik z woskowych różyczek – piękny prezent na każdą okazję.',
        longDesc:
          'Miniaturowy bukiet złożony z 5 ręcznie formowanych różyczek z wosku pszczelego. Perfekcyjny jako dodatek do kartki lub mały upominek. Dostępny w kolorach: biały, kremowy, różowy.',
        price: 69.0,
        comparePrice: 85.0,
        sku: 'BK-002',
        stock: 15,
        images: ['/products/bukiet-roze.jpg'],
        isActive: true,
        isFeatured: false,
        weight: 200,
        categoryId: bukiety.id,
      },
      {
        name: 'Zestaw prezentowy Premium',
        slug: 'zestaw-prezentowy-premium',
        description:
          'Elegancki zestaw: świeca klasyczna + mini bukiet + kartka. Gotowy do podarowania.',
        longDesc:
          'Nasz bestseller wśród prezentów! Zestaw zawiera: świecę miodową klasyczną, mini bukiet różany oraz odręcznie napisaną karteczkę. Całość zapakowana w ekologiczne pudełko z kokardą. Możliwość personalizacji kartki.',
        price: 129.0,
        comparePrice: 155.0,
        sku: 'ZS-001',
        stock: 10,
        images: ['/products/zestaw-premium.jpg'],
        isActive: true,
        isFeatured: true,
        weight: 550,
        categoryId: bukiety.id,
      },
    ],
  })

  const productCount = await prisma.product.count()
  console.log(`✅ Seeded ${productCount} products in 2 categories`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
