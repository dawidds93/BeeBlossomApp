"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ShopLayout from "@/components/layout/ShopLayout"
import { Eye, EyeOff } from "lucide-react"

export default function Rejestracja() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gdprConsent: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      setError("Hasła się nie zgadzają.")
      return
    }
    if (form.password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.")
      return
    }
    if (!form.gdprConsent) {
      setError("Musisz zaakceptować politykę prywatności.")
      return
    }

    setLoading(true)

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Wystąpił błąd. Spróbuj ponownie.")
      setLoading(false)
      return
    }

    // Auto-login po rejestracji
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    router.push("/konto")
  }

  return (
    <ShopLayout>
      <div className="py-16 md:py-24 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow border border-gray-100 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Utwórz konto</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Dołącz do BeeBlossom – szybsze zakupy i śledzenie zamówień.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Imię <span className="text-gray-400">(opcjonalne)</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              placeholder="Imię"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adres e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="twoj@adres.pl"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Hasło <span className="text-gray-400">(min. 8 znaków)</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Powtórz hasło
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              checked={form.gdprConsent}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500"
            />
            <label htmlFor="gdprConsent" className="text-sm text-gray-600">
              Akceptuję{" "}
              <Link href="/regulamin" className="text-amber-700 font-bold underline hover:text-amber-800 transition">
                Regulamin
              </Link>{" "}
              i{" "}
              <Link href="/polityka-prywatnosci" className="text-amber-700 font-bold underline hover:text-amber-800 transition">
                Politykę prywatności
              </Link>
              .
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
              <p className="text-red-600 font-bold text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition disabled:opacity-60"
          >
            {loading ? "Tworzenie konta..." : "Zarejestruj się"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Masz już konto?{" "}
          <Link href="/login" className="text-amber-600 hover:underline font-medium">
            Zaloguj się
          </Link>
        </p>
        </div>
      </div>
    </ShopLayout>
  )
}
