"use client"

import { useState } from "react"
import { addOrUpdateAddress } from "./actions"

export type AddressData = {
  id?: string
  firstName: string
  lastName: string
  company?: string | null
  street: string
  city: string
  postalCode: string
  isDefault?: boolean
}

export default function AddressForm({ 
  initialData, 
  onSuccess,
  onCancel 
}: { 
  initialData?: AddressData | null, 
  onSuccess?: () => void,
  onCancel?: () => void 
}) {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // Pass addressId if we are editing
    const res = await addOrUpdateAddress(formData, initialData?.id)
    
    setLoading(false)

    if (res?.error) {
      setError(res.error)
    } else {
      if (!initialData) e.currentTarget.reset()
      if (onSuccess) onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Imię</label>
          <input required name="firstName" defaultValue={initialData?.firstName || ""} className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Nazwisko</label>
          <input required name="lastName" defaultValue={initialData?.lastName || ""} className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Nazwa firmy (opcjonalnie)</label>
        <input name="company" defaultValue={initialData?.company || ""} className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Ulica i numer</label>
        <input required name="street" defaultValue={initialData?.street || ""} className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Kod pocztowy</label>
          <input required name="postalCode" defaultValue={initialData?.postalCode || ""} placeholder="00-000" className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Miasto</label>
          <input required name="city" defaultValue={initialData?.city || ""} className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:border-amber-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 pt-1">
        <input type="checkbox" id={`isDefault-${initialData?.id || 'new'}`} name="isDefault" defaultChecked={!!initialData?.isDefault} className="accent-amber-500 w-4 h-4 cursor-pointer" />
        <label htmlFor={`isDefault-${initialData?.id || 'new'}`} className="text-sm text-gray-700 cursor-pointer">
          Ustaw jako domyślny adres dostawy
        </label>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 font-bold text-sm text-center">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
            Anuluj
          </button>
        )}
        <button disabled={loading} type="submit" className="border border-gray-300 hover:border-amber-400 hover:bg-amber-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50">
          {loading ? "Zapisywanie..." : initialData ? "Zapisz zmiany" : "Zapisz nowy adres"}
        </button>
      </div>
    </form>
  )
}
