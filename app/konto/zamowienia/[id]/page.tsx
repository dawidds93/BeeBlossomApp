import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

function getStatusBadge(status: string) {
  switch (status) {
    case "PENDING":
      return <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1.5 rounded-full font-medium">Oczekuje na płatność</span>
    case "PAID":
      return <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1.5 rounded-full font-medium">Opłacone</span>
    case "PROCESSING":
      return <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full font-medium">W realizacji</span>
    case "SHIPPED":
      return <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1.5 rounded-full font-medium">Wysłane</span>
    case "DELIVERED":
      return <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full font-medium">Dostarczone</span>
    case "CANCELLED":
      return <span className="bg-red-100 text-red-800 text-sm px-3 py-1.5 rounded-full font-medium">Anulowane</span>
    case "REFUNDED":
      return <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1.5 rounded-full font-medium">Zwrócone</span>
    default:
      return <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full font-medium">{status}</span>
  }
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const order = await prisma.order.findFirst({
    where: { 
      id: resolvedParams.id,
      userId: session.user.id // BARDZO WAŻNE ZE WZGLĘDÓW BEZPIECZEŃSTWA (tylko zlecenia danego użytkownika)
    },
    include: {
      items: true,
      shippingAddress: true,
    }
  })

  if (!order) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/konto/zamowienia" className="text-gray-500 hover:text-amber-700 text-sm font-medium mb-2 flex items-center gap-1">
            ← Wróć do listy
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Zamówienie #{order.orderNumber}</h1>
          <p className="text-sm text-gray-500 mt-1">
            złożone {order.createdAt.toLocaleDateString("pl-PL", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <h2 className="font-semibold text-lg border-b border-gray-100 px-6 py-4 bg-gray-50/50">Zamówione produkty</h2>
            <ul className="divide-y divide-gray-100">
              {order.items.map(item => (
                <li key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-semibold text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.quantity} szt x {Number(item.price).toFixed(2)} zł
                    </p>
                  </div>
                  <div className="flex items-center justify-end font-medium">
                    {(item.quantity * Number(item.price)).toFixed(2)} zł
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-lg border-b border-gray-100 pb-3 mb-3">Podsumowanie kosztów</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Wartość koszyka</span>
                <span className="font-medium text-gray-900">{Number(order.subtotal).toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between">
                <span>Dostawa ({order.paymentMethod === 'BANK_TRANSFER' ? "Przelew" : "Szybka płatność"})</span>
                <span className="font-medium text-gray-900">{Number(order.shippingCost).toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-base">
                <span className="font-bold text-gray-900">Razem do zapłaty</span>
                <span className="font-bold text-amber-700">{Number(order.totalAmount).toFixed(2)} zł</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
            <h2 className="font-semibold text-lg border-b border-gray-100 pb-3 mb-3">Dane dostawy</h2>
            <div className="text-sm text-gray-600 space-y-1">
              {order.shippingAddress ? (
                <>
                  <p className="font-medium text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
                  <p className="mt-2">{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
                </>
              ) : order.shippingSnapshot ? (
                // Jeśli address został usunięty z bazy przez soft delete adresów (odtworzone ze snapshota)
                <>
                  <p className="font-medium text-gray-900">{(order.shippingSnapshot as any).firstName} {(order.shippingSnapshot as any).lastName}</p>
                  <p className="mt-2">{(order.shippingSnapshot as any).street}</p>
                  <p>{(order.shippingSnapshot as any).postalCode} {(order.shippingSnapshot as any).city}</p>
                </>
              ) : (
                <p className="italic text-gray-400">Brak danych adresu w bazie</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
