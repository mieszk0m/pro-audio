import { ArrowRight, CheckCircle2, Terminal, Wrench } from 'lucide-react'
import { CodeBlock } from '../components/CodeBlock'
import { PageHeader } from '../components/PageHeader'
import { PdfButton } from '../components/PdfButton'
import { networkTools } from '../data/siteContent'

export function ToolsPage() {
  return (
    <div id="page-tools" className="page-container printable-page">
      <PageHeader
        eyebrow="Warsztat technika"
        title="Narzędzia sieciowe"
        description="Nie tylko lista narzędzi, lecz także zalecana kolejność użycia i informacja, jakie pytanie rozwiązuje każde z nich."
        actions={<PdfButton elementId="page-tools" fileName="proaudio-narzedzia-sieciowe.pdf" />}
      />

      <div className="tool-principle">
        <Terminal size={26} />
        <div><strong>Jedno narzędzie = jedno pytanie.</strong><p>Zanim uruchomisz test, nazwij hipotezę: „czy mam link?”, „czy jestem w dobrej podsieci?”, „czy port TCP odpowiada?”.</p></div>
      </div>

      <div className="tools-grid">
        {networkTools.map((tool, index) => (
          <article key={tool.id} className="tool-card">
            <div className="tool-card-top">
              <span className="tool-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="tag tag-accent">{tool.category}</span>
            </div>
            <div className="tool-title-row"><Wrench size={20} /><h2>{tool.name}</h2></div>
            <p className="tool-purpose">{tool.purpose}</p>
            {tool.command && <CodeBlock code={tool.command} />}
            <div className="tool-workflow">
              <h3>Procedura</h3>
              <ol>{tool.workflow.map((step) => <li key={step}><span><ArrowRight size={15} /></span>{step}</li>)}</ol>
            </div>
            {tool.proTip && <div className="pro-tip"><CheckCircle2 size={17} /><p>{tool.proTip}</p></div>}
          </article>
        ))}
      </div>
    </div>
  )
}
