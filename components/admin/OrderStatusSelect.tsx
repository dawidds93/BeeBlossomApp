"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/actions/admin/orders";
import { OrderStatus } from "@prisma/client";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch (error) {
        alert("Błąd podczas aktualizacji statusu");
      }
    });
  };

  return (
    <select 
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`p-1.5 border rounded text-sm disabled:opacity-50 font-medium ${
        currentStatus === "PENDING" ? "bg-yellow-50 text-yellow-800 border-yellow-200" :
        currentStatus === "PAID" ? "bg-green-50 text-green-800 border-green-200" :
        currentStatus === "PROCESSING" ? "bg-blue-50 text-blue-800 border-blue-200" :
        currentStatus === "SHIPPED" ? "bg-purple-50 text-purple-800 border-purple-200" :
        currentStatus === "DELIVERED" ? "bg-teal-50 text-teal-800 border-teal-200" :
        "bg-gray-50 text-gray-800 border-gray-200"
      }`}
    >
      <option value="PENDING">Oczekujące na płatność</option>
      <option value="PAID">Opłacone</option>
      <option value="PROCESSING">W realizacji</option>
      <option value="SHIPPED">Wysłane</option>
      <option value="DELIVERED">Dostarczone</option>
      <option value="CANCELLED">Anulowane</option>
      <option value="REFUNDED">Zwrócone</option>
    </select>
  );
}
