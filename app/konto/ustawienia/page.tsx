import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { updateUserDetails, deleteAccount } from "./actions"
import Link from "next/link"
import AddressForm from "./AddressForm"
import AddressCard from "@/components/konto/AddressCard"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { addresses: true }
  })

  if (!user) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ustawienia konta</h1>
        <p className="text-gray-500">Zarządzaj swoimi danymi osobowymi i adresami dostawy.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <h2 className="font-semibold text-lg border-b border-gray-100 pb-4 mb-4">Dane osobowe</h2>
        
        <form action={async (fd) => { "use server"; await updateUserDetails(fd) }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imię</label>
              <input 
                name="name" 
                defaultValue={user.name || ""} 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input 
                name="phone" 
                defaultValue={user.phone || ""}
                placeholder="np. 123 456 789"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400 font-normal">(brak możliwości edycji)</span></label>
            <input 
              disabled 
              value={user.email} 
              className="w-full p-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="bg-amber-100 text-amber-900 hover:bg-amber-200 px-5 py-2 rounded-lg font-medium transition cursor-pointer">
              Zapisz dane
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
          <h2 className="font-semibold text-lg">Książka adresowa</h2>
        </div>
        
        {user.addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {user.addresses.map((addr) => (
              <AddressCard key={addr.id} address={addr} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Brak zapisanych adresów dostawy.</p>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100 max-w-2xl">
          <h3 className="font-medium mb-4 text-gray-800">Dodaj nowy adres</h3>
          <AddressForm />
        </div>
      </div>

      <div className="bg-red-50/50 rounded-xl border border-red-100 p-6 max-w-2xl">
        <h2 className="font-semibold text-lg text-red-700 mb-2">Usuwanie konta</h2>
        <p className="text-sm text-red-600/80 mb-4">
          Uwaga: Usunięcie konta jest nieodwracalne. Utracisz dostęp do swojej historii zamówień,
          a Twoje dane osobowe zostaną zanonimizowane zgodnie z przepisami RODO.
        </p>
        <form action={async () => {
          "use server"
          await deleteAccount()
          redirect("/login")
        }}>
          <button type="submit" className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 text-sm rounded-lg font-medium transition cursor-pointer">
            Trwale usuń moje konto
          </button>
        </form>
      </div>
    </div>
  )
}
