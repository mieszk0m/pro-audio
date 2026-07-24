import { BookOpenText, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { Theme } from '../types'
import { ThemeToggle } from './ThemeToggle'

const commandLinks = [
  { label: 'TP-Link', to: '/komendy#tp-link' },
  { label: 'NETGEAR', to: '/komendy#netgear' },
  { label: 'Cisco', to: '/komendy#cisco' },
  { label: 'Windows', to: '/komendy#windows' },
]

export function SiteHeader({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  function closeMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/" className="brand" onClick={closeMenu} aria-label="ProAudio Network Academy — strona główna">
          <span className="brand-mark"><BookOpenText size={23} /></span>
          <span className="brand-copy"><strong>proaudio</strong><small>network academy</small></span>
        </NavLink>

        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Główna nawigacja">
          <NavLink to="/baza-wiedzy" onClick={closeMenu}>Baza wiedzy</NavLink>
          <div className="nav-dropdown">
            <NavLink to="/komendy" onClick={closeMenu}>Komendy <ChevronDown size={15} /></NavLink>
            <div className="nav-dropdown-menu">
              {commandLinks.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={closeMenu}>{item.label}</NavLink>
              ))}
            </div>
          </div>
          <NavLink to="/narzedzia" onClick={closeMenu}>Narzędzia</NavLink>
          <NavLink to="/budowa-sieci" onClick={closeMenu}>Budowa sieci</NavLink>
          <NavLink to="/diagnostyka" onClick={closeMenu}>Diagnostyka</NavLink>
        </nav>

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  )
}
