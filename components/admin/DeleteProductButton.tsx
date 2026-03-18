"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/actions/admin/products";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Czy na pewno chcesz usunąć ten produkt? Operacji nie można cofnąć.")) {
      startTransition(async () => {
        try {
          const res = await deleteProduct(id);
          if (res?.error) {
            alert(res.error);
          }
        } catch (error: any) {
          alert(error.message || "Błąd podczas usuwania produktu.");
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
      title="Usuń"
    >
      <Trash2 size={18} />
    </button>
  );
}
