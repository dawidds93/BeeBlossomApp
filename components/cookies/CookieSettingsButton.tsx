'use client'

export default function CookieSettingsButton() {
  return (
    <div className="my-4">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
        style={{
          borderColor: 'var(--amber)',
          color: 'var(--amber)',
        }}
      >
        ⚙️ Zmień ustawienia cookies
      </button>
    </div>
  )
}
