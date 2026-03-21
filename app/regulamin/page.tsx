import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Regulamin sklepu',
  description: 'Regulamin sklepu internetowego Bee Blossom – zasady składania zamówień, płatności, dostawy, reklamacji i zwrotów.',
}

export default function RegulaminhPage() {
  return (
    <LegalPageLayout title="Regulamin sklepu internetowego" lastUpdated="21 marca 2026">
      <h2>§1 Postanowienia ogólne</h2>
      <p>
        Sklep internetowy Bee Blossom (dalej: „Sklep") prowadzony jest przez:
      </p>
      <p>
        <strong>[Imię i nazwisko / nazwa firmy]</strong><br />
        Adres: [adres działalności]<br />
        E-mail: [adres e-mail]<br />
        NIP: [jeśli dotyczy]
      </p>
      <p>(dalej: „Sprzedawca")</p>
      <p>
        Regulamin określa zasady korzystania ze Sklepu, składania zamówień oraz
        prawa i obowiązki stron.
      </p>
      <p>
        Klientem Sklepu może być osoba fizyczna, osoba prawna lub jednostka
        organizacyjna posiadająca zdolność do czynności prawnych.
      </p>

      <h2>§2 Oferta i produkty</h2>
      <p>Przedmiotem sprzedaży są ręcznie wykonywane dekoracje z wosku pszczelego.</p>
      <p>Produkty mają charakter rękodzielniczy, dlatego:</p>
      <ul>
        <li>mogą nieznacznie różnić się od prezentowanych na zdjęciach,</li>
        <li>różnice te nie stanowią wady produktu.</li>
      </ul>
      <p>W przypadku produktów z kolekcji Pure:</p>
      <ul>
        <li>
          odcień wosku pszczelego może się różnić w zależności od jego
          naturalnego pochodzenia.
        </li>
      </ul>
      <p>Produkty mogą być wykonane:</p>
      <ul>
        <li>na zamówienie indywidualne,</li>
        <li>według bieżącej dostępności.</li>
      </ul>

      <h2>§3 Składanie zamówień</h2>
      <p>Zamówienia można składać poprzez stronę internetową Sklepu 24 godziny na dobę.</p>
      <p>
        Złożenie zamówienia oznacza zawarcie umowy sprzedaży między Klientem a
        Sprzedawcą.
      </p>
      <p>Klient zobowiązany jest do podania prawdziwych danych.</p>

      <h2>§4 Ceny i płatności</h2>
      <p>Wszystkie ceny podane w Sklepie są wyrażone w złotych polskich (PLN).</p>
      <p>Ceny są cenami brutto (zawierają podatek VAT, jeśli dotyczy).</p>
      <p>Dostępne metody płatności są wskazane na stronie Sklepu.</p>

      <h2>§5 Realizacja zamówień i dostawa</h2>
      <p>Czas realizacji zamówienia wynosi:</p>
      <ul>
        <li>1–3 dni robocze — dla produktów dostępnych od ręki,</li>
        <li>do 5 dni roboczych — dla produktów wykonywanych na zamówienie.</li>
      </ul>
      <p>Czas realizacji liczony jest od momentu zaksięgowania płatności.</p>
      <p>
        Dostawa realizowana jest na terenie Polski za pośrednictwem firm
        kurierskich lub paczkomatów.
      </p>
      <p>Koszt dostawy podawany jest podczas składania zamówienia.</p>

      <h2>§6 Prawo odstąpienia od umowy</h2>
      <p>
        Klient będący konsumentem ma prawo odstąpić od umowy w terminie 14 dni
        bez podania przyczyny.
      </p>
      <p>
        Termin odstąpienia od umowy wygasa po 14 dniach od dnia otrzymania
        produktu.
      </p>
      <p>
        Aby skorzystać z prawa odstąpienia, Klient powinien poinformować
        Sprzedawcę o swojej decyzji drogą mailową.
      </p>
      <p>
        Klient zobowiązany jest zwrócić produkt w ciągu 14 dni od zgłoszenia
        odstąpienia.
      </p>

      <h2>§7 Wyjątki od prawa odstąpienia</h2>
      <p>
        Zgodnie z art. 38 ustawy o prawach konsumenta, prawo odstąpienia nie
        przysługuje w przypadku:
      </p>
      <ul>
        <li>produktów wykonanych na indywidualne zamówienie,</li>
        <li>produktów personalizowanych.</li>
      </ul>

      <h2>§8 Zwroty i płatności</h2>
      <p>
        Zwrot płatności następuje w ciągu 14 dni od otrzymania zwróconego
        produktu.
      </p>
      <p>Zwrot dokonywany jest przy użyciu tej samej metody płatności.</p>
      <p>Koszt odesłania produktu ponosi Klient.</p>

      <h2>§9 Reklamacje</h2>
      <p>
        Sprzedawca odpowiada za zgodność produktu z umową zgodnie z przepisami
        prawa.
      </p>
      <p>
        W przypadku niezgodności produktu z umową Klient ma prawo do reklamacji.
      </p>
      <p>Reklamację należy zgłosić drogą mailową.</p>
      <p>Sprzedawca ustosunkuje się do reklamacji w terminie 14 dni.</p>

      <h2>§10 Bezpieczeństwo użytkowania</h2>
      <p>Produkty wykonane są z wosku pszczelego i mogą reagować na wysoką temperaturę.</p>
      <p>Elementy flower boxów mogą być używane w kominkach ceramicznych.</p>
      <p>Podczas używania wosku w kominku należy:</p>
      <ul>
        <li>nie pozostawiać go bez nadzoru,</li>
        <li>zachować szczególną ostrożność.</li>
      </ul>

      <h2>§11 Dane osobowe (RODO)</h2>
      <p>Administratorem danych osobowych jest Sprzedawca.</p>
      <p>Dane przetwarzane są w celu realizacji zamówienia.</p>
      <p>Klient ma prawo do:</p>
      <ul>
        <li>dostępu do danych,</li>
        <li>ich poprawiania,</li>
        <li>żądania usunięcia.</li>
      </ul>
      <p>
        Szczegółowe informacje zawiera{' '}
        <a href="/polityka-prywatnosci">Polityka prywatności</a>.
      </p>

      <h2>§12 Postanowienia końcowe</h2>
      <p>Regulamin obowiązuje od dnia jego publikacji.</p>
      <p>
        W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.
      </p>
      <p>Spory rozstrzygane będą przez właściwe sądy powszechne.</p>
    </LegalPageLayout>
  )
}
