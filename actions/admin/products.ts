"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Nazwa musi mieć minimum 2 znaki"),
  slug: z.string().min(2, "Slug musi mieć minimum 2 znaki"),
  price: z.number().min(0, "Cena nie może być ujemna"),
  comparePrice: z.number().nullable().optional(),
  stock: z.number().min(0, "Stan magazynowy nie może być ujemny"),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  categoryId: z.string().min(1, "Kategoria jest wymagana"),
  description: z.string().optional(),
});

export async function createProduct(formData: z.infer<typeof productSchema>) {
  await requireAdmin();
  const parsed = productSchema.parse(formData);

  const newProduct = await prisma.product.create({
    data: {
      ...parsed,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/produkty");
  return newProduct;
}

export async function updateProduct(id: string, formData: z.infer<typeof productSchema>) {
  await requireAdmin();
  const parsed = productSchema.parse(formData);

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      ...parsed,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/produkty");
  revalidatePath(`/produkt/${parsed.slug}`);
  return updatedProduct;
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/produkty");
}
