import { NavLink } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer" data-pdf-hide="true">
      <div className="footer-grid">
        <div>
          <strong>ProAudio Network Academy</strong>
          <p>Praktyczna baza wiedzy dla uczestników szkoleń z sieci w systemach AV.</p>
        </div>
        <div className="footer-links">
          <NavLink to="/baza-wiedzy">Baza wiedzy</NavLink>
          <NavLink to="/komendy">Komendy</NavLink>
          <NavLink to="/diagnostyka">Diagnostyka</NavLink>
        </div>
        <div className="footer-meta">
          <span>Treści edytowane w pliku:</span>
          <code>src/data/siteContent.ts</code>
        </div>
      </div>
    </footer>
  )
}
