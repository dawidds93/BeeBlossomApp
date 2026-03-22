"use client"

import { useState } from "react"
import Link from "next/link"

export default function ResetHaslaPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Wystąpił błąd. Spróbuj ponownie.")
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-bold mb-3">Sprawdź skrzynkę</h1>
          <p className="text-gray-600 text-sm mb-6">
            Jeśli konto o podanym adresie istnieje, wysłaliśmy link do resetowania hasła.
            Link jest ważny przez <strong>1 godzinę</strong>.
          </p>
          <Link href="/login" className="text-amber-600 hover:underline text-sm font-medium">
            Wróć do logowania
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Resetuj hasło</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Podaj adres e-mail powiązany z Twoim kontem,
          a wyślemy Ci link do ustawienia nowego hasła.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adres e-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="twoj@adres.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition disabled:opacity-60"
          >
            {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/login" className="text-amber-600 hover:underline">
            Wróć do logowania
          </Link>
        </p>
      </div>
    </div>
  )
}
