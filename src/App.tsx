import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DiagnosticsPage } from './pages/DiagnosticsPage'
import { CommandsPage } from './pages/CommandsPage'
import { HomePage } from './pages/HomePage'
import { KnowledgeBasePage } from './pages/KnowledgeBasePage'
import { NetworkBuildPage } from './pages/NetworkBuildPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ToolsPage } from './pages/ToolsPage'
import type { Theme } from './types'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('proaudio-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('proaudio-theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route element={<Layout theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/baza-wiedzy" element={<KnowledgeBasePage />} />
        <Route path="/komendy" element={<CommandsPage />} />
        <Route path="/narzedzia" element={<ToolsPage />} />
        <Route path="/budowa-sieci" element={<NetworkBuildPage />} />
        <Route path="/diagnostyka" element={<DiagnosticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
