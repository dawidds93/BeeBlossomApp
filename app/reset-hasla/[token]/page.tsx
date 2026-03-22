"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ResetHaslaTokenPage({
  params,
}: {
  params: Promise<{ token: string }> | { token: string }
}) {
  const resolvedParams = params instanceof Promise ? use(params) : params
  const router = useRouter()
  const [form, setForm] = useState({ password: "", confirmPassword: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (form.password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Hasła się nie zgadzają.")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: resolvedParams.token, ...form }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || "Wystąpił błąd. Spróbuj ponownie.")
      return
    }

    setDone(true)
    setTimeout(() => router.push("/login"), 2500)
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-3">Hasło zmienione!</h1>
          <p className="text-gray-600 text-sm">Za chwilę zostaniesz przekierowany do strony logowania.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Nowe hasło</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Ustaw nowe hasło dla swojego konta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nowe hasło <span className="text-gray-400">(min. 8 znaków)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Powtórz hasło
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 font-bold text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition disabled:opacity-60"
          >
            {loading ? "Zapisywanie..." : "Ustaw nowe hasło"}
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
