import { Download, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { exportElementToPdf } from '../utils/pdf'

type PdfButtonProps = {
  elementId: string
  fileName: string
}

export function PdfButton({ elementId, fileName }: PdfButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleDownload() {
    setError('')
    setIsLoading(true)
    try {
      await exportElementToPdf(elementId, fileName)
    } catch (downloadError) {
      console.error(downloadError)
      setError('Nie udało się utworzyć PDF. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pdf-action" data-pdf-hide="true">
      <button type="button" className="button button-primary" onClick={handleDownload} disabled={isLoading}>
        {isLoading ? <LoaderCircle className="spin" size={18} /> : <Download size={18} />}
        {isLoading ? 'Tworzę PDF…' : 'Pobierz PDF'}
      </button>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
