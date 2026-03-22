import { auth } from "@/auth"
import Link from "next/link"

export default async function KontoDashboardPage() {
  const session = await auth()
  const user = session?.user

  if (!user) return null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Moje konto</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-lg border-b border-gray-100 pb-3 mb-3">Twoje dane</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Imię</p>
            <p className="text-gray-800 font-medium">{user.name || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Adres e-mail</p>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/konto/zamowienia"
          className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:border-amber-300 transition group flex flex-col justify-center"
        >
          <span className="text-2xl mb-2">📦</span>
          <p className="font-semibold group-hover:text-amber-700 transition">Moje zamówienia</p>
          <p className="text-sm text-gray-500 mt-1">Sprawdź status swoich paczek i historię zakupów.</p>
        </Link>
        <Link
          href="/konto/ustawienia"
          className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:border-amber-300 transition group flex flex-col justify-center"
        >
          <span className="text-2xl mb-2">⚙️</span>
          <p className="font-semibold group-hover:text-amber-700 transition">Ustawienia</p>
          <p className="text-sm text-gray-500 mt-1">Zmień hasło, zaktualizuj dane i dodaj adresy dostawy.</p>
        </Link>
      </div>
    </div>
  )
}
