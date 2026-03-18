import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { Download } from "lucide-react";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const statusFilter = params?.status as OrderStatus | undefined;
  
  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      user: {
        select: { name: true, email: true }
      }
    }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Zamówienia</h1>
        <a 
          href="/api/admin/orders/export" 
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
        >
          <Download size={20} />
          Eksportuj CSV
        </a>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-4 items-center">
        <span className="font-medium text-gray-700">Filtruj:</span>
        <Link href="/admin/orders" className={`px-4 py-1.5 rounded-full text-sm transition-colors ${!statusFilter ? 'bg-zinc-800 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Wszystkie</Link>
        <Link href="/admin/orders?status=PENDING" className={`px-4 py-1.5 rounded-full text-sm transition-colors ${statusFilter === 'PENDING' ? 'bg-zinc-800 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Oczekujące</Link>
        <Link href="/admin/orders?status=PAID" className={`px-4 py-1.5 rounded-full text-sm transition-colors ${statusFilter === 'PAID' ? 'bg-zinc-800 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Opłacone</Link>
        <Link href="/admin/orders?status=PROCESSING" className={`px-4 py-1.5 rounded-full text-sm transition-colors ${statusFilter === 'PROCESSING' ? 'bg-zinc-800 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>W realizacji</Link>
        <Link href="/admin/orders?status=SHIPPED" className={`px-4 py-1.5 rounded-full text-sm transition-colors ${statusFilter === 'SHIPPED' ? 'bg-zinc-800 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Wysłane</Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">ZAMÓWIENIE</th>
              <th className="p-4 font-medium text-gray-600">DATA</th>
              <th className="p-4 font-medium text-gray-600">KLIENT</th>
              <th className="p-4 font-medium text-gray-600">WARTOŚĆ</th>
              <th className="p-4 font-medium text-gray-600 text-right">ZARZĄDZANIE STATUSEM</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">
                  #{order.id.slice(-8).toUpperCase()}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("pl-PL", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">{order.user?.name || "Gość"}</div>
                  <div className="text-gray-500 text-xs">{order.user?.email || order.guestEmail}</div>
                </td>
                <td className="p-4 font-bold text-gray-900">
                  {Number(order.totalAmount).toFixed(2)} zł
                </td>
                <td className="p-4 text-right">
                  <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-500">
                  Brak zamówień spełniających kryteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
