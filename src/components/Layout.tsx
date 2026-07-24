import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import type { Theme } from '../types'
import { Footer } from './Footer'
import { SiteHeader } from './SiteHeader'

export function Layout({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    if (target) window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [location])

  return (
    <div className="app-shell">
      <SiteHeader theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
