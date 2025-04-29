type ExportParams = {
  filename: string
  data: BlobPart
}

export class ExportService {
  static toExcel({ filename, data }: ExportParams) {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
