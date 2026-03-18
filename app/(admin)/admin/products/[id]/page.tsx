import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const categories = await prisma.category.findMany({ select: { id: true, name: true } });
  
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    return notFound();
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Edytuj produkt: {product.name}</h1>
      </div>
      
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
