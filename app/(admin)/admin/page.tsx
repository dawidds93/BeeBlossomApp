import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Witaj w panelu administracyjnym</h1>
      <p className="text-gray-600">
        Zalogowano jako: <strong>{session.user.email}</strong> (Rola: {session.user.role})
      </p>
      
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg">Produkty</h2>
          <p className="text-sm text-gray-500 mt-2">Zarządzaj ofertą swojego sklepu, dodawaj i edytuj produkty.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-semibold text-lg">Zamówienia</h2>
          <p className="text-sm text-gray-500 mt-2">Przeglądaj nowe zamówienia, zmieniaj statusy zwrotów i wysyłek.</p>
        </div>
      </div>
    </div>
  );
}
