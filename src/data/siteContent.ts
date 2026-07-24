import type { CommandGroup, KnowledgeTopic, StandardStep, ToolItem } from '../types'

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    id: 'wstep-do-sieci-model-osi',
    number: '01',
    title: 'Wstęp do sieci — model OSI',
    date: '08.05',
    level: 'Podstawowy',
    summary:
      'Fundament pracy z siecią: czym jest komunikacja sieciowa, jak dane przechodzą przez warstwy i gdzie szukać przyczyny awarii.',
    goals: [
      'Rozumieć rolę każdej warstwy modelu OSI',
      'Rozpoznawać PDU i proces enkapsulacji',
      'Łączyć objaw awarii z właściwą warstwą',
      'Swobodnie używać pojęć MAC, IP, port i protokół',
    ],
    sections: [
      {
        heading: 'Czym jest sieć komputerowa?',
        paragraphs: [
          'Sieć komputerowa to zbiór urządzeń, które wymieniają dane według uzgodnionych reguł. W środowisku ProAudio urządzeniami mogą być konsolety, stageboxy, procesory DSP, wzmacniacze, komputery sterujące i przełączniki.',
          'Sama obecność kabla nie oznacza jeszcze poprawnej komunikacji. Urządzenia muszą mieć zgodną warstwę fizyczną, logiczną adresację i odpowiednie usługi sieciowe.',
        ],
      },
      {
        heading: 'Model OSI — warstwy i zadania',
        bullets: [
          '7. Aplikacji — usługi widoczne dla użytkownika i oprogramowania.',
          '6. Prezentacji — format danych, kodowanie i szyfrowanie.',
          '5. Sesji — utrzymanie i kontrola sesji komunikacyjnej.',
          '4. Transportowa — porty TCP/UDP, niezawodność i kolejność transmisji.',
          '3. Sieciowa — adresy IP i routing pomiędzy podsieciami.',
          '2. Łącza danych — adresy MAC, ramki, VLAN i przełączanie.',
          '1. Fizyczna — przewody, złącza, sygnał, prędkość i link.',
        ],
        note:
          'W praktycznej diagnostyce zaczynaj od dołu: zasilanie i link, później MAC/VLAN, następnie IP, a dopiero na końcu aplikacja.',
      },
      {
        heading: 'PDU, enkapsulacja i adresowanie',
        bullets: [
          'Warstwy 7–5: dane aplikacji.',
          'Warstwa 4: segment TCP lub datagram UDP — identyfikowany m.in. portami.',
          'Warstwa 3: pakiet — identyfikowany adresami IP.',
          'Warstwa 2: ramka — identyfikowana adresami MAC.',
          'Warstwa 1: bity przesyłane przez medium.',
        ],
        example:
          'Komputer sterujący wysyła polecenie do procesora DSP: aplikacja tworzy dane, transport dodaje port, IP dodaje adres źródłowy i docelowy, Ethernet dodaje adresy MAC, a interfejs wysyła bity przewodem.',
      },
      {
        heading: 'Przykład z życia',
        paragraphs: [
          'Jeżeli dioda portu nie świeci, nie ma sensu zaczynać od ustawień aplikacji. Jeżeli link działa, ale ping do bramy nie odpowiada, problem prawdopodobnie znajduje się w warstwie 2 lub 3. Jeżeli ping działa, ale aplikacja nie widzi urządzenia, sprawdzamy porty, multicast, zaporę i ustawienia samej aplikacji.',
        ],
      },
    ],
  },
  {
    id: 'adresy-ip-i-mac',
    number: '02',
    title: 'Struktura adresów IP i MAC — początek adresacji',
    date: '14.05',
    level: 'Podstawowy',
    summary:
      'Jak rozpoznawać urządzenia w sieci, obliczać podstawowe parametry podsieci i poprawnie planować pierwszą adresację.',
    goals: [
      'Czytać zapis adresu MAC i IPv4',
      'Rozumieć rolę maski i prefiksu CIDR',
      'Wyznaczać bramę, zakres hostów i broadcast',
      'Sprawdzać mapowanie IP–MAC w tablicy ARP',
    ],
    sections: [
      {
        heading: 'Adres MAC',
        paragraphs: [
          'Adres MAC identyfikuje interfejs w obrębie warstwy 2. Najczęściej ma 48 bitów i jest zapisywany w sześciu parach znaków szesnastkowych, np. 00:1A:2B:3C:4D:5E.',
        ],
        bullets: [
          'Pierwsza część zwykle wskazuje producenta interfejsu.',
          'Przełącznik uczy się, na którym porcie widział dany MAC.',
          'MAC jest używany lokalnie w danej domenie rozgłoszeniowej.',
        ],
      },
      {
        heading: 'Tablica ARP',
        paragraphs: [
          'ARP mapuje adres IPv4 na adres MAC. Dzięki temu host wie, do jakiej ramki Ethernet włożyć pakiet przeznaczony dla urządzenia w tej samej podsieci.',
        ],
        example: 'Windows: arp -a. Wynik pokazuje znane pary adres IP — adres fizyczny.',
      },
      {
        heading: 'IPv4, maska i CIDR',
        paragraphs: [
          'Adres IPv4 ma 32 bity. Maska określa, która część opisuje sieć, a która hosta. Zapis 192.168.10.25/24 odpowiada masce 255.255.255.0.',
        ],
        bullets: [
          '/24 — 256 adresów, zwykle 254 użyteczne dla hostów.',
          '/25 — 128 adresów, zwykle 126 użytecznych.',
          '/26 — 64 adresy, zwykle 62 użyteczne.',
          '/27 — 32 adresy, zwykle 30 użytecznych.',
        ],
      },
      {
        heading: 'Brama, broadcast i zakres hostów',
        example:
          'Dla 192.168.10.25/24: adres sieci 192.168.10.0, hosty 192.168.10.1–192.168.10.254, broadcast 192.168.10.255. Brama może mieć np. 192.168.10.1.',
        note:
          'Adres sieci i broadcast nie są przypisywane zwykłym urządzeniom. Przy statycznej adresacji prowadź rejestr zajętych adresów.',
      },
    ],
  },
  {
    id: 'vlan-i-segmentacja',
    number: '03',
    title: 'VLAN i segmentacja systemów AV',
    level: 'Średni',
    summary:
      'Logiczne rozdzielenie audio, sterowania, wideo i zarządzania w jednej infrastrukturze przełączników.',
    goals: [
      'Rozumieć access, trunk i native VLAN',
      'Projektować prosty podział funkcjonalny',
      'Unikać płaskiej, nieudokumentowanej sieci',
    ],
    sections: [
      {
        heading: 'Po co stosujemy VLAN?',
        paragraphs: [
          'VLAN rozdziela jedną fizyczną infrastrukturę na osobne domeny warstwy 2. Ułatwia kontrolę ruchu, diagnostykę i ograniczanie rozgłoszeń.',
        ],
      },
      {
        heading: 'Access i trunk',
        bullets: [
          'Port access przenosi jeden VLAN i jest typowy dla urządzenia końcowego.',
          'Port trunk przenosi wiele VLAN-ów pomiędzy przełącznikami lub do routera.',
          'Każdy trunk powinien mieć jawnie określoną listę dozwolonych VLAN-ów.',
        ],
      },
      {
        heading: 'Przykładowy standard ProAudio',
        bullets: [
          'VLAN 10 — zarządzanie infrastrukturą.',
          'VLAN 20 — audio sieciowe.',
          'VLAN 30 — sterowanie urządzeniami.',
          'VLAN 40 — wideo / multimedia.',
          'VLAN 90 — serwis i tymczasowy dostęp technika.',
        ],
        note: 'Numery są przykładowe. Najważniejsza jest konsekwencja i dokumentacja.',
      },
    ],
  },
  {
    id: 'multicast-qos-i-synchronizacja',
    number: '04',
    title: 'Multicast, QoS i synchronizacja w sieciach audio',
    level: 'Zaawansowany',
    summary:
      'Najważniejsze mechanizmy wpływające na stabilność transmisji czasu rzeczywistego w środowisku AV-over-IP.',
    goals: [
      'Rozumieć różnicę unicast, broadcast i multicast',
      'Wiedzieć, do czego służy IGMP Snooping',
      'Rozumieć rolę QoS i zegara',
    ],
    sections: [
      {
        heading: 'Multicast',
        paragraphs: [
          'Multicast dostarcza jeden strumień do wielu odbiorców. Bez kontroli przełącznik może rozsyłać go na zbyt wiele portów, co prowadzi do niepotrzebnego obciążenia.',
        ],
      },
      {
        heading: 'IGMP Snooping i Querier',
        bullets: [
          'IGMP Snooping pozwala przełącznikowi kierować multicast tylko do zainteresowanych portów.',
          'IGMP Querier utrzymuje aktualną informację o członkostwie grup w sieci bez routera multicast.',
          'Konfigurację należy dostosować do zaleceń producenta systemu audio.',
        ],
      },
      {
        heading: 'QoS i czas',
        paragraphs: [
          'QoS ustala priorytety dla krytycznych klas ruchu. Synchronizacja czasu zapewnia wspólne odniesienie dla urządzeń i ma bezpośredni wpływ na ciągłość dźwięku.',
        ],
        note:
          'Nie włączaj przypadkowego profilu QoS. Najpierw ustal wymagania systemu i sprawdź, czy oznaczenia DSCP są zachowywane na całej ścieżce.',
      },
    ],
  },
]

export const commandGroups: CommandGroup[] = [
  {
    id: 'tp-link',
    label: 'TP-Link Omada / JetStream',
    intro:
      'Przykładowe komendy CLI spotykane w zarządzalnych przełącznikach TP-Link. Składnia może różnić się między seriami i wersjami firmware.',
    commands: [
      {
        id: 'tplink-show-interface-status',
        title: 'Status portów',
        command: 'show interface status',
        description: 'Wyświetla stan portów, prędkość, duplex i podstawowe informacje o połączeniu.',
        useWhen: 'Gdy szukasz portu bez linku, błędnej negocjacji prędkości lub urządzenia podłączonego do niewłaściwego portu.',
        tags: ['warstwa 1', 'porty'],
      },
      {
        id: 'tplink-show-mac',
        title: 'Tablica adresów MAC',
        command: 'show mac address-table',
        description: 'Pokazuje adresy MAC nauczone na poszczególnych portach i w VLAN-ach.',
        useWhen: 'Gdy chcesz ustalić, gdzie fizycznie znajduje się urządzenie lub czy ramki docierają do przełącznika.',
        tags: ['warstwa 2', 'MAC'],
      },
      {
        id: 'tplink-show-vlan',
        title: 'Konfiguracja VLAN',
        command: 'show vlan',
        description: 'Wyświetla istniejące VLAN-y oraz przypisanie portów.',
        useWhen: 'Gdy urządzenia mają link, ale nie komunikują się z powodu błędnego access VLAN albo trunku.',
        tags: ['VLAN', 'segmentacja'],
      },
      {
        id: 'tplink-save',
        title: 'Zapis konfiguracji',
        command: 'copy running-config startup-config',
        description: 'Zapisuje bieżącą konfigurację jako startową.',
        useWhen: 'Po potwierdzeniu poprawności zmian, aby przetrwały restart.',
        warning: 'Przed zapisem zachowaj kopię poprzedniej konfiguracji i opisz zmianę.',
        tags: ['konfiguracja', 'backup'],
      },
    ],
  },
  {
    id: 'netgear',
    label: 'NETGEAR AV / M-Series',
    intro:
      'Przykładowe polecenia diagnostyczne dla zarządzalnych przełączników NETGEAR. W modelach AV część ustawień wykonuje się wygodniej z poziomu profili i interfejsu WWW.',
    commands: [
      {
        id: 'netgear-show-port',
        title: 'Podsumowanie interfejsów',
        command: 'show port all',
        description: 'Wyświetla zbiorcze informacje o portach i stanie łącza.',
        useWhen: 'Na początku diagnostyki fizycznego połączenia.',
        tags: ['warstwa 1', 'porty'],
      },
      {
        id: 'netgear-show-vlan',
        title: 'Lista VLAN',
        command: 'show vlan',
        description: 'Pokazuje VLAN-y i ich podstawowe właściwości.',
        useWhen: 'Przy sprawdzaniu, czy profil AV utworzył oczekiwane VLAN-y.',
        tags: ['VLAN'],
      },
      {
        id: 'netgear-show-igmp',
        title: 'IGMP Snooping',
        command: 'show igmpsnooping',
        description: 'Pokazuje stan mechanizmu IGMP Snooping.',
        useWhen: 'Gdy multicast zalewa porty albo odbiorniki nie dołączają do strumieni.',
        tags: ['multicast', 'IGMP'],
      },
      {
        id: 'netgear-show-mac',
        title: 'Tablica przekazywania',
        command: 'show mac-addr-table',
        description: 'Wyświetla nauczone adresy MAC i porty.',
        useWhen: 'Do lokalizacji urządzenia i potwierdzenia ruchu w warstwie 2.',
        tags: ['MAC', 'warstwa 2'],
      },
    ],
  },
  {
    id: 'cisco',
    label: 'Cisco IOS / CBS',
    intro:
      'Najczęściej używane polecenia podglądu i podstawowej diagnostyki. Przed zmianą konfiguracji upewnij się, na jakim modelu i systemie pracujesz.',
    commands: [
      {
        id: 'cisco-show-ip-int-brief',
        title: 'Szybki stan interfejsów L3',
        command: 'show ip interface brief',
        description: 'Pokazuje interfejsy, adresy IP oraz stan administracyjny i protokołu.',
        useWhen: 'Do szybkiej oceny, które interfejsy są aktywne i mają adresację.',
        tags: ['IP', 'interfejsy'],
      },
      {
        id: 'cisco-show-interfaces-status',
        title: 'Stan portów przełącznika',
        command: 'show interfaces status',
        description: 'Pokazuje status, VLAN, duplex, prędkość i typ portu.',
        useWhen: 'Do sprawdzenia linku, negocjacji i przypisanego VLAN-u.',
        tags: ['warstwa 1', 'VLAN'],
      },
      {
        id: 'cisco-show-mac',
        title: 'Tablica MAC',
        command: 'show mac address-table dynamic',
        description: 'Pokazuje dynamicznie nauczone adresy MAC.',
        useWhen: 'Do ustalenia portu urządzenia albo weryfikacji przełączania.',
        tags: ['MAC'],
      },
      {
        id: 'cisco-show-vlan-brief',
        title: 'VLAN-y i porty access',
        command: 'show vlan brief',
        description: 'Wyświetla VLAN-y i porty przypisane w trybie access.',
        useWhen: 'Gdy podejrzewasz błędne przypisanie portu końcowego.',
        tags: ['VLAN'],
      },
      {
        id: 'cisco-show-trunk',
        title: 'Trunki',
        command: 'show interfaces trunk',
        description: 'Pokazuje porty trunk, native VLAN i listę przenoszonych VLAN-ów.',
        useWhen: 'Gdy część VLAN-ów nie przechodzi pomiędzy przełącznikami.',
        tags: ['trunk', 'VLAN'],
      },
      {
        id: 'cisco-show-stp',
        title: 'Spanning Tree',
        command: 'show spanning-tree summary',
        description: 'Pokazuje tryb STP, root bridge i podstawowy stan topologii.',
        useWhen: 'Przy podejrzeniu pętli, blokowanych portów lub niestabilnej topologii.',
        tags: ['STP', 'pętla'],
      },
    ],
  },
  {
    id: 'windows',
    label: 'Windows',
    intro:
      'Komendy dostępne na komputerze technika. Uruchom PowerShell lub Wiersz polecenia; część poleceń wymaga uprawnień administratora.',
    commands: [
      {
        id: 'windows-ipconfig-all',
        title: 'Pełna konfiguracja IP',
        command: 'ipconfig /all',
        description: 'Pokazuje adres IP, maskę, bramę, DNS, DHCP i adres MAC interfejsów.',
        useWhen: 'To jeden z pierwszych kroków przy nieznanej sieci lub problemie z adresacją.',
        tags: ['IP', 'punkt zero'],
      },
      {
        id: 'windows-ping',
        title: 'Test osiągalności',
        command: 'ping 192.168.10.1 -n 20',
        description: 'Wysyła serię pakietów ICMP i mierzy odpowiedzi oraz opóźnienie.',
        useWhen: 'Do testu lokalnego hosta, bramy, urządzenia docelowego i stabilności połączenia.',
        tags: ['ICMP', 'latencja'],
      },
      {
        id: 'windows-arp',
        title: 'Tablica ARP',
        command: 'arp -a',
        description: 'Pokazuje znane mapowania adresów IPv4 na adresy MAC.',
        useWhen: 'Gdy sprawdzasz, czy host widzi urządzenie w tej samej podsieci.',
        tags: ['ARP', 'MAC'],
      },
      {
        id: 'windows-tracert',
        title: 'Trasa do celu',
        command: 'tracert 8.8.8.8',
        description: 'Pokazuje kolejne routery na drodze do celu.',
        useWhen: 'Gdy komunikacja działa tylko do pewnego miejsca lub występuje problem poza siecią lokalną.',
        tags: ['routing'],
      },
      {
        id: 'windows-route-print',
        title: 'Tablica routingu komputera',
        command: 'route print',
        description: 'Wyświetla trasy, metryki i interfejsy używane przez system.',
        useWhen: 'Gdy komputer ma wiele kart sieciowych, VPN lub wybiera niewłaściwą bramę.',
        tags: ['routing', 'wiele interfejsów'],
      },
      {
        id: 'windows-test-netconnection',
        title: 'Test konkretnego portu',
        command: 'Test-NetConnection 192.168.10.50 -Port 80',
        description: 'Sprawdza osiągalność hosta i możliwość zestawienia połączenia TCP na wskazanym porcie.',
        useWhen: 'Gdy ping działa, ale interfejs WWW lub usługa nie odpowiada.',
        tags: ['TCP', 'porty'],
      },
      {
        id: 'windows-get-netneighbor',
        title: 'Sąsiedzi sieciowi PowerShell',
        command: 'Get-NetNeighbor -AddressFamily IPv4',
        description: 'Nowocześniejszy podgląd sąsiadów IP i ich stanu.',
        useWhen: 'Do analizy ARP i rozpoznania urządzeń na interfejsach.',
        tags: ['PowerShell', 'ARP'],
      },
    ],
  },
]

export const networkTools: ToolItem[] = [
  {
    id: 'ping',
    name: 'Ping',
    category: 'Łączność',
    purpose: 'Sprawdza, czy urządzenie odpowiada i jakie jest opóźnienie.',
    workflow: [
      'Ping 127.0.0.1 — stos TCP/IP komputera.',
      'Ping własny adres IP — interfejs lokalny.',
      'Ping bramę — lokalna sieć i VLAN.',
      'Ping urządzenie docelowe — ścieżka do urządzenia.',
    ],
    command: 'ping <adres_IP> -n 20',
    proTip: 'Seria 20–50 pakietów lepiej pokazuje utratę niż pojedynczy test.',
  },
  {
    id: 'ipconfig',
    name: 'ipconfig / Get-NetIPConfiguration',
    category: 'Adresacja',
    purpose: 'Pokazuje faktyczną konfigurację kart sieciowych komputera.',
    workflow: [
      'Ustal, która karta jest aktywna.',
      'Zapisz IP, maskę, bramę i DHCP.',
      'Sprawdź, czy nie działa jednocześnie Wi‑Fi i Ethernet z konkurującymi trasami.',
    ],
    command: 'ipconfig /all',
    proTip: 'Adres 169.254.x.x zwykle oznacza brak odpowiedzi serwera DHCP.',
  },
  {
    id: 'arp',
    name: 'ARP / Neighbor Table',
    category: 'Warstwa 2',
    purpose: 'Łączy adres IP z adresem MAC w lokalnej podsieci.',
    workflow: [
      'Najpierw wyślij ping do urządzenia.',
      'Wyświetl tablicę ARP.',
      'Porównaj MAC z etykietą urządzenia lub tablicą przełącznika.',
    ],
    command: 'arp -a',
  },
  {
    id: 'traceroute',
    name: 'Tracert / Traceroute',
    category: 'Routing',
    purpose: 'Pokazuje kolejne skoki na trasie IP.',
    workflow: [
      'Uruchom test do znanego celu.',
      'Znajdź pierwszy skok bez odpowiedzi lub z dużym opóźnieniem.',
      'Porównaj wynik z poprawnie działającą stacją.',
    ],
    command: 'tracert <adres_IP>',
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Analiza pakietów',
    purpose: 'Przechwytuje i filtruje ruch sieciowy do głębokiej diagnostyki.',
    workflow: [
      'Wybierz właściwy interfejs.',
      'Zacznij przechwytywanie przed odtworzeniem problemu.',
      'Użyj filtrów, np. arp, icmp, ip.addr == 192.168.10.50.',
      'Zapisz plik PCAP wraz z opisem czasu zdarzenia.',
    ],
    proTip: 'Najpierw zdefiniuj pytanie diagnostyczne. Przechwytywanie „wszystkiego” bez celu szybko utrudnia analizę.',
  },
  {
    id: 'lldp',
    name: 'LLDP / mapa sąsiadów',
    category: 'Topologia',
    purpose: 'Pomaga ustalić, jakie urządzenie jest podłączone do danego portu.',
    workflow: [
      'Odczytaj sąsiadów LLDP na przełączniku.',
      'Zapisz nazwę urządzenia i port zdalny.',
      'Porównaj ze schematem fizycznym.',
    ],
  },
  {
    id: 'cable-test',
    name: 'Tester okablowania / TDR',
    category: 'Warstwa fizyczna',
    purpose: 'Wykrywa przerwy, zwarcia, błędne pary i przybliżoną odległość do uszkodzenia.',
    workflow: [
      'Odłącz wrażliwe urządzenie, jeśli wymaga tego tester.',
      'Sprawdź mapę par i długość.',
      'Oznacz oraz wymień wadliwy przewód.',
    ],
  },
  {
    id: 'documentation',
    name: 'Arkusz adresacji i mapa portów',
    category: 'Dokumentacja',
    purpose: 'Najprostsze narzędzie do skrócenia kolejnej diagnostyki.',
    workflow: [
      'Zapisuj nazwę, model, MAC, IP, VLAN, port przełącznika i lokalizację.',
      'Dodaj datę oraz autora zmiany.',
      'Przechowuj kopię konfiguracji urządzeń.',
    ],
    proTip: 'Dokumentacja jest częścią systemu, a nie dodatkiem po zakończeniu instalacji.',
  },
]

export const buildStandard: StandardStep[] = [
  {
    number: '01',
    title: 'Zbierz wymagania i ograniczenia',
    description: 'Zdefiniuj urządzenia, protokoły, liczbę strumieni, redundancję, zdalny dostęp i wymagania producentów.',
    checklist: [
      'Lista urządzeń i portów',
      'Wymagania multicast / QoS / PTP',
      'Oczekiwany wzrost systemu',
      'Wymagania bezpieczeństwa i serwisu',
    ],
    output: 'Karta wymagań technicznych.',
  },
  {
    number: '02',
    title: 'Zaprojektuj topologię',
    description: 'Wybierz architekturę gwiazdy, rdzeń i dostęp, połączenia zapasowe oraz miejsca montażu.',
    checklist: [
      'Schemat logiczny i fizyczny',
      'Przepustowość uplinków',
      'Budżet PoE',
      'Kontrola pętli i STP',
    ],
    output: 'Aktualny diagram topologii.',
  },
  {
    number: '03',
    title: 'Ustal standard VLAN i adresacji',
    description: 'Nadaj każdej funkcji własny segment i jednoznaczne nazewnictwo.',
    checklist: [
      'VLAN zarządzający, audio, sterowania i wideo',
      'Podsieć, brama i zakres DHCP dla każdego VLAN-u',
      'Zakresy adresów statycznych i rezerwacji',
      'Nazwy urządzeń zgodne z lokalizacją i funkcją',
    ],
    output: 'Arkusz IP/VLAN będący źródłem prawdy.',
  },
  {
    number: '04',
    title: 'Przygotuj konfigurację bazową',
    description: 'Zastosuj spójne ustawienia zarządzania, czasu, kont, portów i monitoringu.',
    checklist: [
      'Bezpieczne hasła i indywidualne konta',
      'NTP, strefa czasowa i nazwa urządzenia',
      'Wyłączenie nieużywanych portów',
      'Opis portów i kopia konfiguracji',
    ],
    output: 'Szablon konfiguracji bazowej.',
  },
  {
    number: '05',
    title: 'Skonfiguruj funkcje AV',
    description: 'Włącz wyłącznie mechanizmy wymagane przez używane technologie.',
    checklist: [
      'IGMP Snooping i właściwy Querier',
      'QoS zgodny z dokumentacją systemu',
      'Jumbo Frames tylko gdy wymagane i spójne end-to-end',
      'Fast Leave wyłącznie tam, gdzie jest bezpieczny',
    ],
    output: 'Zatwierdzony profil sieci AV.',
  },
  {
    number: '06',
    title: 'Test odbiorczy i dokumentacja',
    description: 'Przetestuj działanie przy normalnym i maksymalnym obciążeniu, a następnie zapisz stan referencyjny.',
    checklist: [
      'Test linków, VLAN-ów, routingu i usług',
      'Test multicast i synchronizacji',
      'Pomiar utraty, opóźnień i wykorzystania portów',
      'Backup konfiguracji i protokół odbioru',
    ],
    output: 'Raport odbiorczy oraz pakiet dokumentacji powykonawczej.',
  },
]

export const zeroPointSteps: StandardStep[] = [
  {
    number: '0A',
    title: 'Zabezpiecz stan zastany',
    description: 'Nie zmieniaj niczego, zanim nie zapiszesz tego, co zastałeś.',
    checklist: [
      'Zdjęcia szaf, portów i diod',
      'Backup konfiguracji, jeśli dostępny',
      'Notatka: co działa, co nie działa i od kiedy',
      'Ustalenie okna serwisowego',
    ],
    output: 'Punkt powrotu i zakres problemu.',
  },
  {
    number: '0B',
    title: 'Zidentyfikuj elementy',
    description: 'Zbuduj minimalną mapę sieci bez zakładania, że istniejąca dokumentacja jest aktualna.',
    checklist: [
      'Modele przełączników, routerów i urządzeń AV',
      'Adresy MAC i etykiety urządzeń',
      'Połączenia uplink i porty krytyczne',
      'Aktywne źródła DHCP i bramy',
    ],
    output: 'Robocza mapa urządzeń i połączeń.',
  },
  {
    number: '0C',
    title: 'Ustal własną pozycję w sieci',
    description: 'Sprawdź, co komputer technika otrzymał i jaką drogą wysyła ruch.',
    checklist: [
      'ipconfig /all',
      'route print',
      'arp -a',
      'Porównanie Ethernet i Wi‑Fi',
    ],
    output: 'Znana adresacja i aktywny interfejs diagnostyczny.',
  },
  {
    number: '0D',
    title: 'Testuj warstwami od dołu',
    description: 'Każdy kolejny test wykonuj dopiero po potwierdzeniu poprzedniego poziomu.',
    checklist: [
      'Zasilanie, przewód, link i błędy portu',
      'MAC, VLAN, trunk i STP',
      'IP, maska, brama i routing',
      'Porty, multicast, zapora i aplikacja',
    ],
    output: 'Zawężenie problemu do konkretnej warstwy.',
  },
]

export const diagnosticFlow = [
  {
    question: 'Czy urządzenie ma zasilanie i aktywny link?',
    yes: 'Sprawdź stan portu, prędkość, duplex i błędy.',
    no: 'Sprawdź zasilanie, PoE, przewód, patch-panel, port i moduł SFP.',
  },
  {
    question: 'Czy adresacja urządzenia pasuje do oczekiwanej podsieci?',
    yes: 'Sprawdź ARP oraz ping do urządzenia i bramy.',
    no: 'Ustal DHCP/statyczny IP, maskę, bramę i ewentualny konflikt adresów.',
  },
  {
    question: 'Czy hosty są w tym samym VLAN-ie lub mają poprawny routing?',
    yes: 'Przejdź do testu portów i usług.',
    no: 'Sprawdź access VLAN, trunk, listę allowed VLAN i interfejs bramy.',
  },
  {
    question: 'Czy ping działa, ale aplikacja nie?',
    yes: 'Sprawdź TCP/UDP, zaporę, multicast, discovery, wersje aplikacji i uprawnienia.',
    no: 'Wróć do warstwy 2/3 i porównaj z działającym urządzeniem.',
  },
]
