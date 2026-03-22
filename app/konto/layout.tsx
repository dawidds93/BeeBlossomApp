import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { User, Package, Settings } from "lucide-react"
import ShopLayout from "@/components/layout/ShopLayout"
import LogoutButton from "@/components/layout/LogoutButton"

export default async function KontoLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <ShopLayout>
      <div className="bg-gray-50 min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <nav className="space-y-1 text-sm font-medium">
                <Link
                  href="/konto"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-amber-700 transition"
                >
                  <User size={18} />
                  Dashboard
                </Link>
                <Link
                  href="/konto/zamowienia"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-amber-700 transition"
                >
                  <Package size={18} />
                  Historia zamówień
                </Link>
                <Link
                  href="/konto/ustawienia"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-amber-700 transition"
                >
                  <Settings size={18} />
                  Ustawienia konta
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <LogoutButton />
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          </div>
        </div>
      </div>
    </ShopLayout>
  )
}
