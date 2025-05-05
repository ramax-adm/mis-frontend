import { ExportService } from '@/services/export'
import { PostExportStockXlsx } from '@/services/webApi/stock-api'
import { UseExportStockXlsxRequest } from '@/types/mutations/stock'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

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
    onError() {
      toast.error('Erro', {
        description: 'Erro ao exportar o arquivo!',
      })
    },
    onSuccess() {
      toast.success('Sucesso', {
        description: 'O arquivo foi exportado com sucesso!',
      })
    },
  })
}
