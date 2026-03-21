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

export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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
