import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Create new categories
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
    });

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
    });

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
    });

    // 2. Clear old categories and move products
    const legacyCategories = await prisma.category.findMany({
      where: { slug: { in: ['swiece', 'bukiety'] } }
    });

    if (legacyCategories.length > 0) {
      const legacyIds = legacyCategories.map(c => c.id);
      await prisma.product.updateMany({
        where: { categoryId: { in: legacyIds } },
        data: { categoryId: pureCat.id }
      });
      await prisma.category.deleteMany({
        where: { id: { in: legacyIds } }
      });
    }

    return NextResponse.json({ success: true, message: 'Database synced successfully.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
