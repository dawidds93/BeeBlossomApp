export type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'bee_cookie_consent'
export const CONSENT_EVENT = 'cookie-consent-updated'

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

/** Delete all _ga* cookies set by Google Analytics */
function deleteGaCookies() {
  if (typeof document === 'undefined') return
  const hostname = window.location.hostname
  // Try all domain variants – GA sets cookies on the root domain with a leading dot
  const domains = [hostname, `.${hostname}`]

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.trim().split('=')[0].trim()
    if (!name.startsWith('_ga')) return
    // Expire the cookie for every domain variant and the current path
    domains.forEach((domain) => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`
    })
    // Also try without explicit domain (catches localhost)
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  })
}

export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

  // If analytics is being turned OFF, delete existing GA4 cookies immediately
  if (!state.analytics) {
    deleteGaCookies()
  }

  // Update consent signals in GA4 directly (no event listener race condition)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag
  if (typeof gtag === 'function') {
    gtag('consent', 'update', buildGtagConsent(state))
    if (state.analytics) {
      gtag('event', 'page_view')
    }
  }

  // Dispatch event for any future listeners
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }))
}

export function buildGtagConsent(state: ConsentState) {
  const granted = (v: boolean) => (v ? 'granted' : 'denied') as 'granted' | 'denied'
  return {
    analytics_storage: granted(state.analytics),
    ad_storage: granted(state.marketing),
    ad_user_data: granted(state.marketing),
    ad_personalization: granted(state.marketing),
  }
}
