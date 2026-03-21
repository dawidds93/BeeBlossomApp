import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności sklepu Bee Blossom – informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
}

export default function PolitykaPrywatnosci() {
  return (
    <LegalPageLayout title="Polityka prywatności" lastUpdated="21 marca 2026">
      <h2>1. Administrator danych osobowych</h2>
      <p>Administratorem Twoich danych osobowych jest:</p>
      <p>
        <strong>[Imię i nazwisko / Nazwa firmy]</strong>
        <br />
        Adres: [ulica, kod, miasto]
        <br />
        E-mail: [adres e-mail]
        <br />
        NIP: [jeśli dotyczy]
      </p>
      <p>
        W sprawach ochrony danych możesz kontaktować się pod adresem e-mail
        wskazanym powyżej.
      </p>

      <h2>2. Podstawy prawne przetwarzania</h2>
      <p>
        Przetwarzamy Twoje dane osobowe na następujących podstawach prawnych
        (art. 6 RODO):
      </p>
      <table>
        <thead>
          <tr>
            <th>Podstawa</th>
            <th>Kiedy ma zastosowanie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Art. 6 ust. 1 lit. b</strong> – wykonanie umowy
            </td>
            <td>
              Realizacja zamówienia, dostawa, obsługa zwrotów i reklamacji
            </td>
          </tr>
          <tr>
            <td>
              <strong>Art. 6 ust. 1 lit. c</strong> – obowiązek prawny
            </td>
            <td>Wystawianie faktur, przechowywanie dokumentacji księgowej</td>
          </tr>
          <tr>
            <td>
              <strong>Art. 6 ust. 1 lit. a</strong> – zgoda
            </td>
            <td>
              Pliki cookies analityczne i marketingowe (możesz wycofać zgodę w
              dowolnym momencie)
            </td>
          </tr>
          <tr>
            <td>
              <strong>Art. 6 ust. 1 lit. f</strong> – prawnie uzasadniony
              interes
            </td>
            <td>Dochodzenie/obrona roszczeń, zapobieganie nadużyciom</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Jakie dane zbieramy i w jakim celu</h2>
      <h3>3.1 Realizacja zamówień</h3>
      <ul>
        <li>Imię i nazwisko</li>
        <li>Adres dostawy</li>
        <li>Adres e-mail</li>
        <li>Numer telefonu</li>
        <li>
          Dane płatności (przetwarzane przez operatora płatności – Administrator
          nie przechowuje danych kart)
        </li>
      </ul>
      <p>
        <strong>Cel:</strong> zawarcie i wykonanie umowy sprzedaży, dostawa
        produktu, obsługa ewentualnych reklamacji i zwrotów.
      </p>

      <h3>3.2 Kontakt</h3>
      <ul>
        <li>Imię</li>
        <li>Adres e-mail</li>
        <li>Treść wiadomości</li>
      </ul>
      <p>
        <strong>Cel:</strong> odpowiedź na zapytanie.
      </p>

      <h3>3.3 Analityka (za Twoją zgodą)</h3>
      <ul>
        <li>Dane techniczne urządzenia i przeglądarki</li>
        <li>Dane o zachowaniu na stronie (Google Analytics 4)</li>
        <li>Adres IP (anonimizowany)</li>
      </ul>
      <p>
        <strong>Cel:</strong> analiza ruchu na stronie, ulepszanie usług.
      </p>

      <h2>4. Jak długo przechowujemy dane</h2>
      <table>
        <thead>
          <tr>
            <th>Kategoria</th>
            <th>Okres przechowywania</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dane zamówień</td>
            <td>5 lat od końca roku podatkowego (obowiązek podatkowy)</td>
          </tr>
          <tr>
            <td>Dane kontaktowe</td>
            <td>
              Do 1 roku od udzielenia odpowiedzi lub do czasu zgłoszenia
              sprzeciwu
            </td>
          </tr>
          <tr>
            <td>Dane analityczne (GA4)</td>
            <td>Do 14 miesięcy lub do wycofania zgody</td>
          </tr>
          <tr>
            <td>Dane do celów roszczeń</td>
            <td>
              Do 3 lat od zakończenia relacji (przedawnienie roszczeń)
            </td>
          </tr>
        </tbody>
      </table>

      <h2>5. Odbiorcy danych</h2>
      <p>
        Twoje dane możemy przekazywać następującym kategoriom odbiorców:
      </p>
      <ul>
        <li>
          <strong>Firmy kurierskie i paczkomaty</strong> – niezbędne do
          realizacji dostawy
        </li>
        <li>
          <strong>Operator płatności</strong> – do obsługi transakcji
        </li>
        <li>
          <strong>Google (Google Analytics 4)</strong> – analityka strony
          (tylko przy Twojej zgodzie)
        </li>
        <li>
          <strong>Dostawca hostingu / serwera</strong> – przechowywanie danych
          aplikacji
        </li>
        <li>
          <strong>Biuro rachunkowe</strong> – obowiązek prawny (dokumentacja
          podatkowa)
        </li>
      </ul>
      <blockquote>
        Google Analytics może transferować dane do USA. Google LLC stosuje
        mechanizmy zabezpieczające zgodne z RODO (standardowe klauzule umowne).
        Szczegóły:{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          polityka prywatności Google
        </a>
        .
      </blockquote>

      <h2>6. Twoje prawa</h2>
      <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
      <table>
        <thead>
          <tr>
            <th>Prawo</th>
            <th>Co oznacza</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Dostęp</strong> (art. 15)
            </td>
            <td>
              Możesz zażądać informacji, jakie dane przetwarzamy
            </td>
          </tr>
          <tr>
            <td>
              <strong>Sprostowanie</strong> (art. 16)
            </td>
            <td>Możesz poprosić o korektę błędnych danych</td>
          </tr>
          <tr>
            <td>
              <strong>Usunięcie</strong> (art. 17)
            </td>
            <td>
              Możesz zażądać usunięcia danych, gdy nie ma już podstawy do ich
              przetwarzania
            </td>
          </tr>
          <tr>
            <td>
              <strong>Ograniczenie</strong> (art. 18)
            </td>
            <td>Możesz zażądać wstrzymania przetwarzania Twoich danych</td>
          </tr>
          <tr>
            <td>
              <strong>Przenoszenie</strong> (art. 20)
            </td>
            <td>
              Możesz otrzymać swoje dane w formacie nadającym się do odczytu
              maszynowego
            </td>
          </tr>
          <tr>
            <td>
              <strong>Sprzeciw</strong> (art. 21)
            </td>
            <td>
              Możesz wnieść sprzeciw wobec przetwarzania opartego na prawnie
              uzasadnionym interesie
            </td>
          </tr>
          <tr>
            <td>
              <strong>Wycofanie zgody</strong>
            </td>
            <td>
              Jeśli przetwarzanie odbywa się na podstawie zgody, możesz ją
              wycofać w dowolnym momencie
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Aby skorzystać z powyższych praw, skontaktuj się mailowo pod adresem:{' '}
        <strong>[adres e-mail]</strong>
      </p>
      <p>
        Masz również prawo wniesienia skargi do organu nadzorczego:{' '}
        <strong>Prezes Urzędu Ochrony Danych Osobowych (UODO)</strong>, ul.
        Stawki 2, 00-193 Warszawa,{' '}
        <a
          href="https://uodo.gov.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          uodo.gov.pl
        </a>
        .
      </p>

      <h2>7. Pliki cookies</h2>
      <p>
        Szczegółowe informacje o plikach cookies, w tym o możliwości zarządzania
        zgodą, znajdziesz w{' '}
        <a href="/polityka-cookies">Polityce cookies</a>.
      </p>

      <h2>8. Bezpieczeństwo</h2>
      <p>
        Stosujemy środki techniczne i organizacyjne zapewniające ochronę danych,
        w tym:
      </p>
      <ul>
        <li>Szyfrowanie połączeń (HTTPS/TLS)</li>
        <li>Kontrolę dostępu do danych</li>
        <li>Regularne przeglądy bezpieczeństwa</li>
      </ul>

      <h2>9. Zmiany polityki prywatności</h2>
      <p>
        O istotnych zmianach w niniejszej polityce poinformujemy poprzez wyraźny
        komunikat na stronie. Data ostatniej aktualizacji wskazana jest na górze
        dokumentu.
      </p>
    </LegalPageLayout>
  )
}
