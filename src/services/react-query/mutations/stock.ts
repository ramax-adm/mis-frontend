import { ExportService } from '@/services/export'
import { PostExportStockXlsx } from '@/services/webApi/stock-api'
import { UseExportStockXlsxRequest } from '@/types/mutations/stock'
import { useMutation } from '@tanstack/react-query'

export const useExportStockXlsx = () => {
  return useMutation({
    mutationFn: async ({
      stockSelectedTab,
      selectedCompany,
      selectedProductLineAcronyms,
    }: UseExportStockXlsxRequest) => {
      const { data, headers } = await PostExportStockXlsx({
        exportType: stockSelectedTab,
        filters: {
          companyCode: selectedCompany,
          productLineAcronyms: selectedProductLineAcronyms,
        },
      })
      const contentDispositionHeader = headers['content-disposition'] as string
      const filenameMatches = contentDispositionHeader.match(/filename=(.+\.xlsx)/)
      const filename = filenameMatches?.[1] || `stock.xlsx`
      await ExportService.toExcel({ filename, data })
    },
  })
}
