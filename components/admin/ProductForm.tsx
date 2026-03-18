"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/actions/admin/products";
import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";

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

type ProductFormValues = z.infer<typeof productSchema>;

interface Props {
  initialData?: any;
  categories: { id: string; name: string }[];
}

export default function ProductForm({ initialData, categories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      price: Number(initialData.price),
      comparePrice: initialData.comparePrice ? Number(initialData.comparePrice) : undefined,
    } : {
      name: "",
      slug: "",
      price: 0,
      stock: 0,
      images: [],
      isActive: true,
      categoryId: "",
      description: "",
      comparePrice: undefined,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      data.images = images;
      
      if (initialData) {
        await updateProduct(initialData.id, data);
      } else {
        await createProduct(data);
      }
      
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas zapisywania produktu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Nazwa</label>
          <input 
            {...form.register("name")} 
            className="w-full p-2 border rounded"
            placeholder="Nazwa produktu"
          />
          {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL)</label>
          <input 
            {...form.register("slug")} 
            className="w-full p-2 border rounded"
            placeholder="nazwa-produktu"
          />
          {form.formState.errors.slug && <p className="text-red-500 text-sm">{form.formState.errors.slug.message}</p>}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cena (PLN)</label>
          <input 
            type="number"
            step="0.01"
            {...form.register("price", { valueAsNumber: true })} 
            className="w-full p-2 border rounded"
          />
          {form.formState.errors.price && <p className="text-red-500 text-sm">{form.formState.errors.price.message}</p>}
        </div>

        {/* Compare Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cena bazowa przed promocją (opcjonalnie)</label>
          <input 
            type="number"
            step="0.01"
            {...form.register("comparePrice", { valueAsNumber: true })} 
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Stan magazynowy (sztuki)</label>
          <input 
            type="number"
            {...form.register("stock", { valueAsNumber: true })} 
            className="w-full p-2 border rounded"
          />
          {form.formState.errors.stock && <p className="text-red-500 text-sm">{form.formState.errors.stock.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Kategoria</label>
          <select 
            {...form.register("categoryId")} 
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Wybierz kategorię</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {form.formState.errors.categoryId && <p className="text-red-500 text-sm">{form.formState.errors.categoryId.message}</p>}
        </div>
      </div>

      {/* Upload */}
      <div className="space-y-2 pt-4 border-t">
        <label className="text-sm font-medium">Zdjęcia produktu</label>
        <div className="flex gap-4 flex-wrap mb-4">
          {images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="object-cover w-full h-full" />
              <button 
                type="button" 
                onClick={() => setImages(imgs => imgs.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="border border-dashed p-4 rounded-lg flex justify-center items-center h-32">
          <UploadButton
            endpoint="productImage"
            onClientUploadComplete={(res: any[]) => {
              if (res) {
                setImages(prev => [...prev, ...res.map((r: any) => r.url)]);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Błąd uploadu: ${error.message}`);
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 pt-4 border-t">
        <label className="text-sm font-medium">Opis produktu</label>
        <textarea 
          {...form.register("description")} 
          className="w-full p-2 border rounded min-h-[120px]"
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" id="isActive" {...form.register("isActive")} className="w-4 h-4" />
        <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Produkt aktywny (widoczny dla klientów w sklepie)</label>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <button 
          type="button"
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-200 mr-4"
        >
          Anuluj
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-zinc-900 text-white px-6 py-2 rounded font-medium hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Zapisywanie..." : (initialData ? "Zapisz zmiany" : "Dodaj produkt")}
        </button>
      </div>
    </form>
  );
}
