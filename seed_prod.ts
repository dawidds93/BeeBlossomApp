import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = 'postgresql://neondb_owner:npg_30dnIPskZfbr@ep-calm-field-also9cgd-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- STARTING PROD SEED ---')
  
  // 1. Dodanie/upsert nowych kategorii
  const pureCat = await prisma.category.upsert({
    where: { slug: 'flower-boxy-pure' },
    update: {},
    create: {
      name: 'Flower boxy - Pure',
      slug: 'flower-boxy-pure',
      description: 'Eleganckie flower boxy w czystym stylu',
      imageUrl: '/categories/pure.jpg',
      sortOrder: 1,
      isActive: true,
    }
  })

  await prisma.category.upsert({
    where: { slug: 'flower-boxy-color' },
    update: {},
    create: {
      name: 'Flower boxy - Color',
      slug: 'flower-boxy-color',
      description: 'Kolorowe i radosne kompozycje flower boxów',
      imageUrl: '/categories/color.jpg',
      sortOrder: 2,
      isActive: true,
    }
  })

  await prisma.category.upsert({
    where: { slug: 'zestawy-upominkowe' },
    update: {},
    create: {
      name: 'Zestawy upominkowe',
      slug: 'zestawy-upominkowe',
      description: 'Wyjątkowe zestawy prezentowe na każdą okazję',
      imageUrl: '/categories/zestawy.jpg',
      sortOrder: 3,
      isActive: true,
    }
  })
  
  console.log('Nowe kategorie potwierdzone na PROD.')

  // 2. Przepięcie osieroconych produktów produkcyjnych (jesli jakiekolwiek tam były) ze starych do Pure
  const legacyCategories = await prisma.category.findMany({
    where: { slug: { in: ['swiece', 'bukiety'] } }
  })
  if (legacyCategories.length > 0) {
    const legacyIds = legacyCategories.map(c => c.id)

    const updated = await prisma.product.updateMany({
      where: { categoryId: { in: legacyIds } },
      data: { categoryId: pureCat.id }
    })
    console.log(`Przepięto ${updated.count} osieroconych produktów do 'Pure' na PROD.`)

    const deleted = await prisma.category.deleteMany({
      where: { id: { in: legacyIds } }
    })
    console.log(`Skasowano ${deleted.count} stare kategorie na PROD.`)
  } else {
    console.log('Nie było starych kategorii do skasowania.')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
