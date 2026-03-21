import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton'

export const metadata: Metadata = {
  title: 'Polityka cookies',
  description:
    'Polityka plików cookies sklepu Bee Blossom – jakich cookies używamy, po co i jak nimi zarządzać.',
}

export default function PolitykaCookiesPage() {
  return (
    <LegalPageLayout title="Polityka cookies" lastUpdated="21 marca 2026">
      <h2>1. Czym są pliki cookies?</h2>
      <p>
        Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na Twoim
        urządzeniu podczas odwiedzania stron internetowych. Umożliwiają
        rozpoznanie urządzenia i zapamiętanie Twoich preferencji.
      </p>

      <h2>2. Kto jest administratorem cookies?</h2>
      <p>
        Administratorem plików cookies własnych serwisu jest:
      </p>
      <p>
        <strong>[Imię i nazwisko / Nazwa firmy]</strong>
        <br />
        E-mail: [adres e-mail]
      </p>
      <p>Operatorem cookies zewnętrznych (analitycznych) jest Google LLC.</p>

      <h2>3. Jakich cookies używamy?</h2>

      <h3>🔒 Kategoria 1: Niezbędne (zawsze aktywne)</h3>
      <p>
        Cookies niezbędne do prawidłowego funkcjonowania sklepu. Nie wymagają
        Twojej zgody.
      </p>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cel</th>
            <th>Czas życia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>bee_cookie_consent</code>
            </td>
            <td>Zapamiętuje Twoje preferencje dotyczące cookies</td>
            <td>12 miesięcy</td>
          </tr>
          <tr>
            <td>
              <code>next-auth.session-token</code>
            </td>
            <td>Sesja zalogowanego użytkownika</td>
            <td>Do zamknięcia przeglądarki / 30 dni</td>
          </tr>
          <tr>
            <td>
              <code>next-auth.csrf-token</code>
            </td>
            <td>Ochrona przed atakami CSRF</td>
            <td>Sesja</td>
          </tr>
        </tbody>
      </table>

      <h3>📊 Kategoria 2: Analityczne (wymagają zgody)</h3>
      <p>
        Cookies używane do analizy ruchu na stronie. Zbierane dane są
        anonimizowane i zbierane wyłącznie po wyrażeniu zgody.
      </p>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Dostawca</th>
            <th>Cel</th>
            <th>Czas życia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>_ga</code>
            </td>
            <td>Google Analytics 4</td>
            <td>Identyfikacja unikalnych użytkowników</td>
            <td>2 lata</td>
          </tr>
          <tr>
            <td>
              <code>_ga_3YEQF4MXPD</code>
            </td>
            <td>Google Analytics 4</td>
            <td>Przechowywanie stanu sesji GA4</td>
            <td>2 lata</td>
          </tr>
        </tbody>
      </table>

      <h3>📣 Kategoria 3: Marketingowe</h3>
      <p>
        Aktualnie sklep Bee Blossom <strong>nie używa cookies marketingowych</strong>.
        Jeśli w przyszłości zostaną wdrożone, niniejsza polityka zostanie
        zaktualizowana.
      </p>

      <h2>4. Jak zarządzać zgodą na cookies?</h2>
      <p>
        Przy pierwszej wizycie wyświetlamy baner cookies umożliwiający wybór
        kategorii. Swoje preferencje możesz zmienić w dowolnym momencie:
      </p>
      <CookieSettingsButton />

      <h2>5. Podstawa prawna</h2>
      <p>
        Używanie cookies niezbędnych odbywa się na podstawie{' '}
        <strong>prawnie uzasadnionego interesu</strong> (art. 6 ust. 1 lit. f
        RODO) oraz przepisów ustawy Prawo telekomunikacyjne.
      </p>
      <p>
        Używanie cookies analitycznych odbywa się wyłącznie na podstawie Twojej{' '}
        <strong>dobrowolnej zgody</strong> (art. 6 ust. 1 lit. a RODO), którą
        możesz wycofać w dowolnym momencie.
      </p>

      <h2>6. Zarządzanie cookies w przeglądarce</h2>
      <p>
        Niezależnie od ustawień na naszej stronie, możesz zarządzać cookies
        bezpośrednio w swojej przeglądarce:
      </p>
      <ul>
        <li>
          <strong>Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo →
          Pliki cookie
        </li>
        <li>
          <strong>Firefox:</strong> Ustawienia → Prywatność i bezpieczeństwo
        </li>
        <li>
          <strong>Safari:</strong> Preferencje → Prywatność
        </li>
        <li>
          <strong>Edge:</strong> Ustawienia → Prywatność, wyszukiwanie i usługi
        </li>
      </ul>
      <blockquote>
        Wyłączenie cookies niezbędnych może uniemożliwić prawidłowe działanie
        sklepu (np. logowanie, koszyk).
      </blockquote>

      <h2>7. Więcej informacji</h2>
      <p>
        Więcej o tym, jak przetwarzamy Twoje dane osobowe, znajdziesz w{' '}
        <a href="/polityka-prywatnosci">Polityce prywatności</a>.
      </p>
      <p>
        W przypadku pytań dotyczących plików cookies skontaktuj się pod adresem:{' '}
        <strong>[adres e-mail]</strong>
      </p>
    </LegalPageLayout>
  )
}
