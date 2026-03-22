"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

export async function updateUserDetails(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Brak autoryzacji" }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name || null, phone: phone || null }
    })
    revalidatePath("/konto")
    revalidatePath("/konto/ustawienia")
    return { success: true }
  } catch (error) {
    return { error: "Nie udało się zaktualizować danych" }
  }
}

const addressSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  company: z.string().optional().or(z.literal('')),
  street: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/),
  isDefault: z.boolean().optional().default(false),
})

export async function addOrUpdateAddress(formData: FormData, addressId?: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Brak autoryzacji" }

  const parsed = addressSchema.safeParse({
    firstName: formData.get("firstName") || "",
    lastName: formData.get("lastName") || "",
    company: formData.get("company") || "",
    street: formData.get("street") || "",
    city: formData.get("city") || "",
    postalCode: formData.get("postalCode") || "",
    isDefault: formData.get("isDefault") === "on" || formData.get("isDefault") === "true",
  })

  if (!parsed.success) return { error: "Uzupełnij poprawnie wszystkie pola" }

  try {
    if (parsed.data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false }
      })
    }

    if (addressId) {
      await prisma.address.update({
        where: { id: addressId, userId: session.user.id },
        data: parsed.data
      })
    } else {
      await prisma.address.create({
        data: { ...parsed.data, userId: session.user.id }
      })
    }
    revalidatePath("/konto/ustawienia")
    return { success: true }
  } catch (error) {
    return { error: "Zapis formularza nie powiódł się" }
  }
}

export async function deleteAddress(addressId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Brak autoryzacji" }
  
  try {
    await prisma.address.delete({
      where: { id: addressId, userId: session.user.id }
    })
    revalidatePath("/konto/ustawienia")
    return { success: true }
  } catch (error) {
    return { error: "Nie udało się usunąć adresu" }
  }
}

export async function deleteAccount() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Brak autoryzacji" }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        email: `deleted_${session.user.id}@removed.com`,
        name: "Konto usunięte",
        phone: null,
        password: null,
        // Zachowujemy zamówienia anonimowo do celów podatkowych
      }
    })
    
    // Usuń powiązane dane osobowe klienta
    await prisma.address.deleteMany({ where: { userId: session.user.id } })
    
    return { success: true }
  } catch (error) {
    return { error: "Błąd podczas usuwania konta" }
  }
}

export async function setDefaultAddress(addressId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Brak autoryzacji" }

  try {
    await prisma.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false }
    })
    await prisma.address.update({
      where: { id: addressId, userId: session.user.id },
      data: { isDefault: true }
    })
    revalidatePath("/konto/ustawienia")
    return { success: true }
  } catch (error) {
    return { error: "Nie udało się zmienić domyślnego adresu" }
  }
}
