import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Zaloguj się</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Wpisz adres e-mail, na który wyślemy Ci bezpieczny jednorazowy link dostępowy.
        </p>

        <form
          action={async (formData) => {
            "use server"
            await signIn("credentials", { 
              email: formData.get("email") as string,
              redirectTo: "/admin"
            })
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adres E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="twoj@adres.pl"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition"
          >
            Wyślij link logowania
          </button>
        </form>
      </div>
    </div>
  );
}
