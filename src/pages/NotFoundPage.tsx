import { ArrowLeft } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>Nie znaleziono podstrony</h1>
      <p>Sprawdź adres lub wróć do strony głównej bazy wiedzy.</p>
      <NavLink to="/" className="button button-primary"><ArrowLeft size={18} /> Strona główna</NavLink>
    </div>
  )
}
