import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Zwroty i reklamacje',
  description:
    'Polityka zwrotów i reklamacji sklepu Bee Blossom – dowiedz się jak złożyć zwrot i jakie prawa Ci przysługują.',
}

export default function ZwrotyPage() {
  return (
    <LegalPageLayout title="Zwroty i reklamacje" lastUpdated="21 marca 2026">
      <h2>1. Prawo do odstąpienia od umowy</h2>
      <p>
        Klient ma prawo odstąpić od umowy w ciągu{' '}
        <strong>14 dni kalendarzowych</strong> od momentu otrzymania zamówienia,
        bez podania przyczyny.
      </p>

      <h2>2. Warunki zwrotu</h2>
      <p>Zwracany produkt powinien być:</p>
      <ul>
        <li>nieużywany,</li>
        <li>w stanie nienaruszonym,</li>
        <li>odpowiednio zabezpieczony do transportu.</li>
      </ul>
      <p>
        Ze względu na ręczne wykonanie oraz delikatny charakter produktów,
        prosimy o szczególną ostrożność przy pakowaniu zwrotu.
      </p>

      <h2>3. Produkty wykonywane na zamówienie</h2>
      <p>
        Produkty wykonywane na indywidualne zamówienie (np. personalizowane lub
        tworzone według wytycznych klienta) <strong>nie podlegają zwrotowi</strong> zgodnie
        z art. 38 ustawy o prawach konsumenta.
      </p>

      <h2>4. Procedura zwrotu</h2>
      <p>
        Aby dokonać zwrotu, należy skontaktować się mailowo pod adresem{' '}
        <strong>[adres e-mail]</strong> i przesłać informację o odstąpieniu od
        umowy.
      </p>
      <p>
        Zwrot należy odesłać na wskazany adres w ciągu{' '}
        <strong>14 dni</strong> od zgłoszenia.
      </p>

      <h2>5. Zwrot środków</h2>
      <p>
        Zwrot płatności zostanie dokonany w ciągu{' '}
        <strong>14 dni od otrzymania produktu</strong>, przy użyciu tej samej
        metody płatności.
      </p>

      <h2>6. Koszt zwrotu</h2>
      <p>
        Koszt odesłania produktu ponosi <strong>kupujący</strong>.
      </p>

      <h2>7. Reklamacje</h2>
      <p>
        Sprzedawca odpowiada za zgodność produktu z umową zgodnie z przepisami
        prawa.
      </p>
      <p>
        W przypadku niezgodności produktu z umową Klient ma prawo do reklamacji.
        Reklamację należy zgłosić drogą mailową na adres{' '}
        <strong>[adres e-mail]</strong>.
      </p>
      <p>
        Sprzedawca ustosunkuje się do reklamacji w terminie{' '}
        <strong>14 dni roboczych</strong>.
      </p>

      <h2>8. Kontakt</h2>
      <p>
        W sprawie zwrotów i reklamacji skontaktuj się z nami mailowo na adres:{' '}
        <strong>[adres e-mail]</strong>. Postaramy się odpowiedzieć jak
        najszybciej.
      </p>
    </LegalPageLayout>
  )
}
