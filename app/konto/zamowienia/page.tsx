import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

function getStatusBadge(status: string) {
  switch (status) {
    case "PENDING":
      return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">Oczekuje na płatność</span>
    case "PAID":
      return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">Opłacone</span>
    case "PROCESSING":
      return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">W realizacji</span>
    case "SHIPPED":
      return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full font-medium">Wysłane</span>
    case "DELIVERED":
      return <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">Dostarczone</span>
    case "CANCELLED":
      return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium">Anulowane</span>
    case "REFUNDED":
      return <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">Zwrócone</span>
    default:
      return <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">{status}</span>
  }
}

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: true // żeby pobrać imageUrl z snapshota jeśli istnieje
    }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Historia zamówień</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold mb-2">Brak zamówień</h2>
          <p className="text-gray-500 mb-6 font-medium">Nie złożyłeś jeszcze żadnego zamówienia.</p>
          <Link href="/produkty" className="inline-block bg-[#2f241d] font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition" style={{ color: '#f5ebdf' }}>
            Rozpocznij zakupy
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Nr zamówienia</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Kwota</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition cursor-default">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {order.createdAt.toLocaleDateString("pl-PL", {
                      day: "2-digit", month: "2-digit", year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {Number(order.totalAmount).toFixed(2)} zł
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/konto/zamowienia/${order.id}`}
                      className="text-amber-700 font-medium hover:underline px-3 py-1.5 hover:bg-amber-50 rounded-md transition"
                    >
                      Szczegóły
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
