import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Wymuszenie przeładowania cache Next.js Turbopack

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const resolvedParams = await params;
  const categories = await prisma.category.findMany({ select: { id: true, name: true } });
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!product) {
    return notFound();
  }

  const serializedProduct = {
    ...product,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Edytuj produkt: {product.name}</h1>
      </div>
      
      <ProductForm categories={categories} initialData={serializedProduct} />
    </div>
  );
}
