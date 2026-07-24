import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

type AccordionProps = {
  title: string
  subtitle?: string
  children: ReactNode
  defaultOpen?: boolean
  badge?: string
}

export function Accordion({ title, subtitle, children, defaultOpen = false, badge }: AccordionProps) {
  return (
    <details className="accordion" open={defaultOpen}>
      <summary>
        <div>
          <div className="accordion-title-row">
            <h3>{title}</h3>
            {badge && <span className="tag tag-accent">{badge}</span>}
          </div>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <ChevronDown className="accordion-chevron" size={21} aria-hidden="true" />
      </summary>
      <div className="accordion-content">{children}</div>
    </details>
  )
}
