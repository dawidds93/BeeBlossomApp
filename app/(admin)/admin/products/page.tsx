import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produkty ({products.length})</h1>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Dodaj produkt
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Produkt</th>
              <th className="p-4 font-medium text-gray-600">Kategoria</th>
              <th className="p-4 font-medium text-gray-600">Cena</th>
              <th className="p-4 font-medium text-gray-600">Stan</th>
              <th className="p-4 font-medium text-gray-600 text-center">Widoczność</th>
              <th className="p-4 font-medium text-gray-600 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded border" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">Brak</div>
                    )}
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{product.category.name}</td>
                <td className="p-4 font-medium">{Number(product.price).toFixed(2)} zł</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {product.stock} szt.
                  </span>
                </td>
                <td className="p-4 text-center">
                  {product.isActive ? (
                    <span className="text-green-500 text-lg leading-none" title="Widoczny">●</span>
                  ) : (
                    <span className="text-gray-300 text-lg leading-none" title="Ukryty">●</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 text-gray-500">
                    <Link href={`/admin/products/${product.id}`} className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded transition" title="Edytuj">
                      <Edit size={18} />
                    </Link>
                    <DeleteProductButton id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Brak produktów. Kliknij &quot;Dodaj produkt&quot;, aby zacząć.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
