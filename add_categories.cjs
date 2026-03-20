const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const newCategories = [
    {
      name: 'Flower boxy - Pure',
      slug: 'flower-boxy-pure',
      description: 'Eleganckie flower boxy w czystym stylu',
      sortOrder: 1,
    },
    {
      name: 'Flower boxy - Colore',
      slug: 'flower-boxy-colore',
      description: 'Kolorowe i radosne kompozycje flower boxów',
      sortOrder: 2,
    },
    {
      name: 'Zestawy upominkowe',
      slug: 'zestawy-upominkowe',
      description: 'Wyjątkowe zestawy prezentowe na każdą okazję',
      sortOrder: 3,
    },
  ]

  for (const cat of newCategories) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } })
    if (!existing) {
      await prisma.category.create({
        data: cat,
      })
      console.log(`Created category: ${cat.name}`)
    } else {
      console.log(`Category already exists: ${cat.name}`)
    }
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
