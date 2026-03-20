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
  const categories = await prisma.category.findMany({
    where: { slug: { in: ['swiece', 'bukiety'] } },
    include: { _count: { select: { products: true } } }
  })
  
  console.log('--- OLD CATEGORY CHECK ---')
  for (const cat of categories) {
    console.log(`[${cat.slug}] Products count: ${cat._count.products}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
