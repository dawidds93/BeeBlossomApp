"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ShopLayout from "@/components/layout/ShopLayout"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Nieprawidłowy adres e-mail lub hasło.")
      return
    }

    // Pobierz sesję by sprawdzić rolę i przekierować
    const res = await fetch("/api/auth/session")
    const session = await res.json()
    const role = session?.user?.role

    if (role === "ADMIN") {
      router.push("/admin")
    } else {
      router.push("/konto")
    }
  }

  return (
    <ShopLayout>
      <div className="py-16 md:py-24 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow border border-gray-100 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Zaloguj się</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Wpisz swój adres e-mail i hasło.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          <p>
            <Link href="/reset-hasla" className="text-amber-600 hover:underline">
              Zapomniałem hasła
            </Link>
          </p>
          <p>
            Nie masz konta?{" "}
            <Link href="/rejestracja" className="text-amber-600 hover:underline font-medium">
              Zarejestruj się
            </Link>
          </p>
        </div>
        </div>
      </div>
    </ShopLayout>
  )
}
