import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: true
    }
  });

  const headers = ["ID Zapytania", "Data Utworzenia", "Kwota (PLN)", "Status", "Email Klienta", "Ilość Przedmiotów"];
  
  const rows = orders.map(o => [
    o.id.slice(-8).toUpperCase(),
    new Date(o.createdAt).toISOString(),
    Number(o.totalAmount).toFixed(2),
    o.status,
    o.user?.email || o.guestEmail || "?",
    o.items.length.toString()
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="BeeBlossom_zamowienia.csv"'
    }
  });
}
