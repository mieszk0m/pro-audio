import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../types'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
      title={theme === 'dark' ? 'Jasny motyw' : 'Ciemny motyw'}
    >
      {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  )
}
