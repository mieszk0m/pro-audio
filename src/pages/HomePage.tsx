import { ArrowRight, BookOpenText, Cable, Command, Network, SearchCheck, Wrench } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { knowledgeTopics } from '../data/siteContent'

const sections = [
  { title: 'Baza wiedzy', description: 'Materiały uporządkowane od fundamentów do tematów AV-over-IP.', to: '/baza-wiedzy', icon: BookOpenText },
  { title: 'Komendy', description: 'TP-Link, NETGEAR, Cisco i Windows z prostym wyjaśnieniem.', to: '/komendy', icon: Command },
  { title: 'Narzędzia sieciowe', description: 'Narzędzia i kolejność ich użycia podczas pracy technika.', to: '/narzedzia', icon: Wrench },
  { title: 'Budowa sieci', description: 'Ustandaryzowany proces od wymagań po odbiór i dokumentację.', to: '/budowa-sieci', icon: Network },
  { title: 'Diagnostyka', description: 'Procedura krok po kroku, także gdy zaczynasz od punktu zero.', to: '/diagnostyka', icon: SearchCheck },
]

export function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="network-grid" aria-hidden="true" />
        <div className="home-hero-inner">
          <span className="eyebrow">Baza wiedzy • ProAudio</span>
          <h1>Sieci dla systemów <span>audio-wideo</span> wyjaśnione praktycznie.</h1>
          <p>
            Materiały szkoleniowe, komendy, narzędzia oraz standardy budowy i diagnostyki sieci — w jednym czytelnym miejscu.
          </p>
          <div className="hero-actions">
            <NavLink to="/baza-wiedzy" className="button button-primary">Rozpocznij naukę <ArrowRight size={18} /></NavLink>
            <NavLink to="/diagnostyka" className="button button-secondary">Przejdź do diagnostyki</NavLink>
          </div>
          <div className="hero-stats">
            <div><strong>{knowledgeTopics.length}</strong><span>moduły wiedzy</span></div>
            <div><strong>4</strong><span>platformy komend</span></div>
            <div><strong>PDF</strong><span>z każdej podstrony</span></div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-heading">
          <span className="eyebrow">Szybki dostęp</span>
          <h2>Wybierz obszar pracy</h2>
          <p>Układ jest celowo prosty: uczysz się, wykonujesz zadanie albo diagnozujesz problem.</p>
        </div>
        <div className="feature-grid">
          {sections.map(({ title, description, to, icon: Icon }) => (
            <NavLink key={to} to={to} className="feature-card">
              <span className="feature-icon"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="card-link">Otwórz <ArrowRight size={16} /></span>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="section learning-path-section">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">Ścieżka nauki</span>
            <h2>Od kabla do stabilnego systemu</h2>
          </div>
          <p>Każdy moduł łączy teorię z sytuacjami, które technik spotyka podczas uruchomienia lub serwisu.</p>
        </div>
        <div className="timeline-cards">
          {knowledgeTopics.slice(0, 4).map((topic) => (
            <article key={topic.id} className="timeline-card">
              <span>{topic.number}</span>
              <div>
                <small>{topic.level}{topic.date ? ` • ${topic.date}` : ''}</small>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section callout-section">
        <div className="callout-panel">
          <Cable size={38} />
          <div>
            <span className="eyebrow">Zasada szkoleniowa</span>
            <h2>Najpierw obserwuj. Potem mierz. Na końcu zmieniaj.</h2>
            <p>Każda procedura zachęca do zapisania stanu zastanego i wykonywania jednego kontrolowanego kroku naraz.</p>
          </div>
          <NavLink to="/diagnostyka" className="button button-inverse">Poznaj punkt zero <ArrowRight size={18} /></NavLink>
        </div>
      </section>
    </>
  )
}
