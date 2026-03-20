import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL!
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const pureCat = await prisma.category.findUnique({ where: { slug: 'flower-boxy-pure' } })
  if (!pureCat) throw new Error('flower-boxy-pure not found')

  const legacyCategories = await prisma.category.findMany({
    where: { slug: { in: ['swiece', 'bukiety'] } }
  })
  
  if (legacyCategories.length === 0) {
    console.log('No legacy categories found.')
    return
  }

  const legacyIds = legacyCategories.map(c => c.id)

  // 1. Reassign all products to the 'flower-boxy-pure' category to avoid breaking Order/Review relations
  const updatedProducts = await prisma.product.updateMany({
    where: { categoryId: { in: legacyIds } },
    data: { categoryId: pureCat.id }
  })
  console.log(`Reassigned ${updatedProducts.count} legacy products to Pure.`)

  // 2. Delete the categories safely
  const deletedCategories = await prisma.category.deleteMany({
    where: { id: { in: legacyIds } }
  })
  console.log(`Deleted ${deletedCategories.count} legacy categories.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
