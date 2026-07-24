# ProAudio Network Academy

Publiczna baza wiedzy w React + TypeScript, przygotowana dla uczestników szkoleń z sieci w środowisku ProAudio.

## Funkcje

- responsywny interfejs inspirowany stylistyką ProAudio: czerń, biel i limonkowy akcent,
- jasny i ciemny motyw zapamiętywany w przeglądarce,
- podstrony: Baza wiedzy, Komendy, Narzędzia sieciowe, Budowa sieci, Diagnostyka,
- rozwijane grupy komend: TP-Link, NETGEAR, Cisco, Windows,
- wyszukiwarka i filtry,
- automatyczne generowanie PDF z każdej podstrony,
- treść trzymana w jednym, łatwym do edycji pliku.

## Uruchomienie

```bash
npm install
npm run dev
```

Następnie otwórz adres pokazany w terminalu, zwykle `http://localhost:5173`.

## Wersja produkcyjna

```bash
npm run build
npm run preview
```

Gotowe pliki znajdą się w katalogu `dist/` i można je opublikować np. na Netlify, Vercel lub dowolnym hostingu statycznym.

## Edycja treści

Najważniejszy plik:

```text
src/data/siteContent.ts
```

W nim znajdują się:

- `knowledgeTopics` — moduły bazy wiedzy,
- `commandGroups` — komendy podzielone na producentów i Windows,
- `networkTools` — narzędzia sieciowe,
- `buildStandard` — standard budowy sieci,
- `zeroPointSteps` i `diagnosticFlow` — procedury diagnostyczne.

Każdy wpis ma prostą strukturę obiektu. Możesz kopiować istniejący wpis i zmieniać tekst, zachowując przecinki oraz nawiasy.

## PDF

Przycisk „Pobierz PDF” generuje dokument z aktualnej treści podstrony. Nie trzeba przygotowywać osobnych plików PDF po każdej zmianie treści.

## Uwaga dotycząca komend

Komendy przełączników mogą różnić się między modelami i wersjami firmware. Przed zmianą konfiguracji zawsze wykonaj backup i zweryfikuj składnię w dokumentacji danego urządzenia.
