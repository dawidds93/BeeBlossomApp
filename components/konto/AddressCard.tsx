"use client"

import { useState } from "react"
import { deleteAddress, setDefaultAddress } from "@/app/konto/ustawienia/actions"
import AddressForm, { AddressData } from "@/app/konto/ustawienia/AddressForm"

export default function AddressCard({ address }: { address: AddressData }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div className="border border-amber-200 bg-amber-50/10 rounded-xl p-4 relative">
        <h4 className="font-medium text-amber-900 mb-3 border-b border-amber-100 pb-2">Edytuj adres</h4>
        <AddressForm 
          initialData={address} 
          onCancel={() => setIsEditing(false)} 
          onSuccess={() => setIsEditing(false)} 
        />
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full bg-white transition hover:shadow-sm">
      <div>
        <div className="flex items-center justify-between mb-3">
          {address.isDefault && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium inline-block">
              Domyślny
            </span>
          )}
        </div>
        <div className="text-sm text-gray-700 leading-relaxed mb-4">
          <p className="font-semibold text-gray-900 text-base mb-1">{address.firstName} {address.lastName}</p>
          {address.company && <p>{address.company}</p>}
          <p>{address.street}</p>
          <p>{address.postalCode} {address.city}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50 flex-wrap">
        <button 
          onClick={() => setIsEditing(true)} 
          className="text-amber-600 hover:text-amber-800 text-sm font-medium transition cursor-pointer"
        >
          Edytuj
        </button>
        
        {!address.isDefault && (
          <form action={async () => { await setDefaultAddress(address.id!) }}>
            <button type="submit" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition cursor-pointer">
              Ustaw jako domyślny
            </button>
          </form>
        )}

        <div className="flex-1 text-right">
          <form action={async () => { await deleteAddress(address.id!) }}>
            <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-medium transition cursor-pointer">
              Usuń
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
