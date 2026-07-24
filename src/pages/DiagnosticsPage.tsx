import { ArrowDown, CheckCircle2, CircleHelp, ClipboardCheck, SearchCheck, ShieldAlert, XCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { PdfButton } from '../components/PdfButton'
import { diagnosticFlow, zeroPointSteps } from '../data/siteContent'

export function DiagnosticsPage() {
  return (
    <div id="page-diagnostics" className="page-container printable-page">
      <PageHeader
        eyebrow="Procedura serwisowa"
        title="Diagnostyka sieci"
        description="Ustandaryzowana ścieżka działania — również wtedy, gdy nie znasz topologii, adresacji ani historii instalacji."
        actions={<PdfButton elementId="page-diagnostics" fileName="proaudio-diagnostyka-sieci.pdf" />}
      />

      <section className="zero-point-section">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Punkt zero</span><h2>Nie znam tej sieci. Od czego zaczynam?</h2></div>
          <p>Nie zgaduj i nie resetuj urządzeń. Najpierw zbuduj minimalny, potwierdzony obraz stanu zastanego.</p>
        </div>
        <div className="zero-point-grid">
          {zeroPointSteps.map((step) => (
            <article key={step.number} className="zero-card">
              <span className="zero-label">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul>{step.checklist.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>
              <div className="zero-output"><ClipboardCheck size={17} /><span>{step.output}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="diagnostic-ladder">
        <div className="section-heading">
          <span className="eyebrow">Drabina diagnostyczna</span>
          <h2>Testuj od warstwy fizycznej do aplikacji</h2>
        </div>
        <div className="ladder">
          {[
            ['01', 'Fizyczna', 'Zasilanie, przewód, link, PoE, SFP, błędy portu'],
            ['02', 'Łącza danych', 'MAC, VLAN, trunk, STP, LLDP, multicast L2'],
            ['03', 'Sieciowa', 'IP, maska, brama, ARP, routing, konflikt adresu'],
            ['04', 'Transportowa', 'TCP/UDP, port, firewall, utrata i opóźnienie'],
            ['05', 'Aplikacja', 'Discovery, logowanie, konfiguracja i wersja oprogramowania'],
          ].map(([number, title, description], index, array) => (
            <div key={number} className="ladder-row">
              <div className="ladder-step"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>
              {index < array.length - 1 && <ArrowDown className="ladder-arrow" size={20} />}
            </div>
          ))}
        </div>
      </section>

      <section className="decision-section">
        <div className="section-heading">
          <span className="eyebrow">Drzewo decyzji</span>
          <h2>Cztery pytania, które szybko zawężają problem</h2>
        </div>
        <div className="decision-flow">
          {diagnosticFlow.map((item, index) => (
            <article key={item.question} className="decision-card">
              <div className="decision-question"><span>{index + 1}</span><CircleHelp size={22} /><h3>{item.question}</h3></div>
              <div className="decision-answers">
                <div className="answer-yes"><CheckCircle2 size={19} /><div><strong>TAK</strong><p>{item.yes}</p></div></div>
                <div className="answer-no"><XCircle size={19} /><div><strong>NIE</strong><p>{item.no}</p></div></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="incident-template">
        <div className="incident-heading"><SearchCheck size={28} /><div><span className="eyebrow">Minimalny raport</span><h2>Co zapisać po diagnostyce</h2></div></div>
        <div className="incident-grid">
          {['Objaw i czas wystąpienia', 'Zakres urządzeń dotkniętych problemem', 'Stan portów, VLAN i adresacja', 'Wykonane testy i wyniki', 'Jedna wprowadzona zmiana', 'Wynik po zmianie i plan powrotu'].map((item) => (
            <div key={item}><ShieldAlert size={17} /><span>{item}</span></div>
          ))}
        </div>
      </section>
    </div>
  )
}
