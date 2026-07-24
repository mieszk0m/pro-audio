import { CheckCircle2, FileCheck2, Network, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { PdfButton } from '../components/PdfButton'
import { buildStandard } from '../data/siteContent'

export function NetworkBuildPage() {
  return (
    <div id="page-build" className="page-container printable-page">
      <PageHeader
        eyebrow="Standard wdrożeniowy"
        title="Budowa sieci"
        description="Powtarzalny proces projektowania i uruchamiania sieci ProAudio — od zebrania wymagań do raportu odbiorczego."
        actions={<PdfButton elementId="page-build" fileName="proaudio-standard-budowy-sieci.pdf" />}
      />

      <div className="standard-overview">
        <div><Network size={25} /><span>Topologia</span></div>
        <div><ShieldCheck size={25} /><span>Stabilność</span></div>
        <div><FileCheck2 size={25} /><span>Dokumentacja</span></div>
      </div>

      <div className="standard-timeline">
        {buildStandard.map((step) => (
          <article key={step.number} className="standard-step">
            <div className="standard-marker"><span>{step.number}</span></div>
            <div className="standard-card">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
              <div className="standard-card-grid">
                <div>
                  <h3>Lista kontrolna</h3>
                  <ul>{step.checklist.map((item) => <li key={item}><CheckCircle2 size={17} />{item}</li>)}</ul>
                </div>
                <div className="deliverable">
                  <span>Rezultat etapu</span>
                  <strong>{step.output}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="naming-standard">
        <span className="eyebrow">Przykład standardu nazewnictwa</span>
        <h2>Obiekt–strefa–typ–numer</h2>
        <div className="naming-example"><code>HQ-STAGE-SW-01</code><span>główny przełącznik sceny</span></div>
        <div className="naming-example"><code>HQ-FOH-DSP-02</code><span>drugi procesor DSP na FOH</span></div>
        <p>Jednoznaczne nazwy powinny pojawiać się w urządzeniu, arkuszu IP, na diagramie i na fizycznej etykiecie.</p>
      </section>
    </div>
  )
}
