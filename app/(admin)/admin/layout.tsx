import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col h-full">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            BeeBlossom <span className="text-sm font-normal text-gray-500">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <Package size={20} />
            Produkty
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
            <ShoppingCart size={20} />
            Zamówienia
          </Link>
        </nav>
        <div className="p-4 border-t">
          <a href="/api/auth/signout" className="flex items-center gap-2 p-2 text-red-600 rounded hover:bg-red-50">
            <LogOut size={20} />
            Wyloguj
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
