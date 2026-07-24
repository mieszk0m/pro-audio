import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type CodeBlockProps = {
  code: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <code>{code}</code>
      <button type="button" onClick={copyCode} aria-label="Kopiuj komendę" title="Kopiuj komendę" data-pdf-hide="true">
        {copied ? <Check size={17} /> : <Copy size={17} />}
      </button>
    </div>
  )
}
