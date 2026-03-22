"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User, LogOut, Settings, Package } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Odtwórz ten sam styl co w Header (np. zamknięcie po kliknięciu poza)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (status === "loading") {
    // Spacer podczas ładowania
    return <div className="hidden cursor-pointer rounded-full p-2 w-[38px] h-[38px] md:flex" />
  }

  // Użytkownik Niezalogowany
  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="hidden cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 md:flex"
        aria-label="Moje konto"
        style={{ color: "var(--brown)" }}
      >
        <User size={22} strokeWidth={1.5} />
      </Link>
    )
  }

  return (
    <div className="relative hidden md:flex" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer rounded-full p-2 transition-colors hover:bg-black/5 flex items-center gap-2"
        style={{ color: "var(--brown)" }}
      >
        <User size={22} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white p-2 shadow-xl border z-50"
          style={{ borderColor: "var(--warm-gray-light)" }}
        >
          <div className="px-3 py-2 border-b mb-1 border-gray-100">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--brown)" }}>
              {session.user.name || "Witaj!"}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{session.user.email}</p>
          </div>

          {session.user.role === "ADMIN" && (
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-black/5 font-medium text-blue-700"
            >
              <Settings size={16} />
              Panel Administratora
            </Link>
          )}

          <Link
            href="/konto"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-black/5"
            style={{ color: "var(--brown)" }}
          >
            <User size={16} />
            Moje konto
          </Link>

          <Link
            href="/konto/zamowienia"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-black/5"
            style={{ color: "var(--brown)" }}
          >
            <Package size={16} />
            Historia zamówień
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors hover:bg-black/5 text-red-600 text-left"
          >
            <LogOut size={16} />
            Wyloguj się
          </button>
        </div>
      )}
    </div>
  )
}
