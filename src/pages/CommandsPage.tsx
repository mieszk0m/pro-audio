import { AlertTriangle, Command, Filter, SearchCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Accordion } from '../components/Accordion'
import { CodeBlock } from '../components/CodeBlock'
import { PageHeader } from '../components/PageHeader'
import { PdfButton } from '../components/PdfButton'
import { SearchInput } from '../components/SearchInput'
import { commandGroups } from '../data/siteContent'

export function CommandsPage() {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('all')

  const groups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return commandGroups
      .filter((group) => activeGroup === 'all' || group.id === activeGroup)
      .map((group) => ({
        ...group,
        commands: group.commands.filter((command) => {
          const haystack = [command.title, command.command, command.description, command.useWhen, ...command.tags].join(' ').toLowerCase()
          return !normalizedQuery || haystack.includes(normalizedQuery)
        }),
      }))
      .filter((group) => group.commands.length > 0)
  }, [query, activeGroup])

  return (
    <div id="page-commands" className="page-container printable-page">
      <PageHeader
        eyebrow="Ściąga technika"
        title="Komendy"
        description="Polecenia podzielone na platformy. Każda komenda ma opis działania i sytuację, w której warto jej użyć."
        actions={<PdfButton elementId="page-commands" fileName="proaudio-komendy-sieciowe.pdf" />}
      />

      <div className="warning-banner">
        <AlertTriangle size={21} />
        <div><strong>Najpierw komendy podglądu.</strong><p>Składnia i dostępność funkcji mogą różnić się zależnie od modelu i wersji oprogramowania. Zmiany wykonuj po backupie.</p></div>
      </div>

      <div className="toolbar toolbar-stacked" data-pdf-hide="true">
        <SearchInput value={query} onChange={setQuery} placeholder="Szukaj komendy lub problemu…" />
        <div className="filter-row">
          <span><Filter size={16} /> Platforma:</span>
          <button type="button" className={activeGroup === 'all' ? 'chip is-active' : 'chip'} onClick={() => setActiveGroup('all')}>Wszystkie</button>
          {commandGroups.map((group) => (
            <button key={group.id} type="button" className={activeGroup === group.id ? 'chip is-active' : 'chip'} onClick={() => setActiveGroup(group.id)}>{group.label.split(' ')[0]}</button>
          ))}
        </div>
      </div>

      <div className="command-groups">
        {groups.map((group, groupIndex) => (
          <section key={group.id} id={group.id} className="command-group-section">
            <div className="group-heading">
              <div className="group-icon"><Command size={21} /></div>
              <div><span className="eyebrow">Platforma</span><h2>{group.label}</h2><p>{group.intro}</p></div>
            </div>
            <div className="command-list">
              {group.commands.map((command, commandIndex) => (
                <Accordion key={command.id} title={command.title} badge={command.tags[0]} defaultOpen={groupIndex === 0 && commandIndex === 0}>
                  <CodeBlock code={command.command} />
                  <div className="command-details-grid">
                    <div><span>Co robi</span><p>{command.description}</p></div>
                    <div><span>Kiedy użyć</span><p>{command.useWhen}</p></div>
                  </div>
                  {command.warning && <div className="warning-inline"><AlertTriangle size={17} />{command.warning}</div>}
                  <div className="tag-row">{command.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                </Accordion>
              ))}
            </div>
          </section>
        ))}
      </div>

      {groups.length === 0 && <div className="empty-state"><SearchCheck size={32} /><h3>Nie znaleziono komendy</h3><p>Spróbuj wpisać nazwę protokołu, warstwę albo oczekiwane działanie.</p></div>}
    </div>
  )
}
