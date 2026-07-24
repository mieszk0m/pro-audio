import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportElementToPdf(elementId: string, fileName: string) {
  const source = document.getElementById(elementId)
  if (!source) {
    throw new Error(`Nie znaleziono elementu #${elementId}`)
  }

  const previousScroll = window.scrollY
  const root = document.documentElement
  const isDark = root.dataset.theme === 'dark'
  const backgroundColor = isDark ? '#0a0b0c' : '#f6f7f3'

  const canvas = await html2canvas(source, {
    scale: Math.min(2, window.devicePixelRatio || 1),
    useCORS: true,
    backgroundColor,
    logging: false,
    windowWidth: Math.max(source.scrollWidth, 1200),
    onclone: (clonedDocument) => {
      clonedDocument.documentElement.dataset.pdf = 'true'
      const clonedSource = clonedDocument.getElementById(elementId)
      if (clonedSource) {
        clonedSource.style.maxWidth = '1120px'
        clonedSource.style.margin = '0 auto'
        clonedSource.style.padding = '28px'
      }
    },
  })

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 8
  const usableWidth = pageWidth - margin * 2
  const usableHeight = pageHeight - margin * 2
  const pxPerMm = canvas.width / usableWidth
  const sliceHeightPx = Math.floor(usableHeight * pxPerMm)

  let renderedHeight = 0
  let page = 0

  while (renderedHeight < canvas.height) {
    const currentSliceHeight = Math.min(sliceHeightPx, canvas.height - renderedHeight)
    const slice = document.createElement('canvas')
    slice.width = canvas.width
    slice.height = currentSliceHeight

    const context = slice.getContext('2d')
    if (!context) throw new Error('Nie udało się utworzyć obrazu PDF')

    context.fillStyle = backgroundColor
    context.fillRect(0, 0, slice.width, slice.height)
    context.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      currentSliceHeight,
      0,
      0,
      canvas.width,
      currentSliceHeight,
    )

    if (page > 0) pdf.addPage()
    const sliceHeightMm = currentSliceHeight / pxPerMm
    pdf.addImage(slice.toDataURL('image/jpeg', 0.94), 'JPEG', margin, margin, usableWidth, sliceHeightMm)

    renderedHeight += currentSliceHeight
    page += 1
  }

  pdf.save(fileName)
  window.scrollTo({ top: previousScroll })
}
