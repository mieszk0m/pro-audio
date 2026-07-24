import { BookOpen, CalendarDays, CheckCircle2, Gauge, GraduationCap, Lightbulb } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Accordion } from '../components/Accordion'
import { PageHeader } from '../components/PageHeader'
import { PdfButton } from '../components/PdfButton'
import { SearchInput } from '../components/SearchInput'
import { knowledgeTopics } from '../data/siteContent'

const levels = ['Wszystkie', 'Podstawowy', 'Średni', 'Zaawansowany'] as const

export function KnowledgeBasePage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<(typeof levels)[number]>('Wszystkie')

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return knowledgeTopics.filter((topic) => {
      const matchesLevel = level === 'Wszystkie' || topic.level === level
      const haystack = [topic.title, topic.summary, ...topic.goals, ...topic.sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])])]
        .join(' ')
        .toLowerCase()
      return matchesLevel && (!normalizedQuery || haystack.includes(normalizedQuery))
    })
  }, [query, level])

  return (
    <div id="page-knowledge" className="page-container printable-page">
      <PageHeader
        eyebrow="Materiały szkoleniowe"
        title="Baza wiedzy"
        description="Tematy ułożone od podstaw sieci do mechanizmów istotnych w środowisku ProAudio i AV-over-IP."
        actions={<PdfButton elementId="page-knowledge" fileName="proaudio-baza-wiedzy.pdf" />}
      />

      <div className="toolbar" data-pdf-hide="true">
        <SearchInput value={query} onChange={setQuery} placeholder="Szukaj pojęcia, np. VLAN, ARP, OSI…" />
        <div className="segmented-control" aria-label="Filtr poziomu">
          {levels.map((item) => (
            <button key={item} type="button" className={level === item ? 'is-active' : ''} onClick={() => setLevel(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="result-summary">
        <span><BookOpen size={17} /> {filteredTopics.length} moduły</span>
        <span><GraduationCap size={17} /> poziom mieszany</span>
        <span><Gauge size={17} /> teoria + praktyka</span>
      </div>

      <div className="topic-list">
        {filteredTopics.map((topic, index) => (
          <Accordion
            key={topic.id}
            title={`${topic.number}. ${topic.title}`}
            subtitle={topic.summary}
            badge={topic.level}
            defaultOpen={index === 0}
          >
            <div className="topic-meta">
              {topic.date && <span><CalendarDays size={16} /> termin: {topic.date}</span>}
              <span><GraduationCap size={16} /> poziom: {topic.level}</span>
            </div>

            <div className="learning-goals">
              <h4>Po tym module uczestnik potrafi:</h4>
              <ul>
                {topic.goals.map((goal) => <li key={goal}><CheckCircle2 size={17} />{goal}</li>)}
              </ul>
            </div>

            <div className="content-sections">
              {topic.sections.map((section) => (
                <section key={section.heading} className="content-section">
                  <h4>{section.heading}</h4>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  {section.example && <div className="example-box"><strong>Przykład</strong><p>{section.example}</p></div>}
                  {section.note && <div className="note-box"><Lightbulb size={18} /><p>{section.note}</p></div>}
                </section>
              ))}
            </div>
          </Accordion>
        ))}
      </div>

      {filteredTopics.length === 0 && <div className="empty-state"><h3>Brak wyników</h3><p>Zmień wyszukiwaną frazę lub poziom.</p></div>}
    </div>
  )
}
