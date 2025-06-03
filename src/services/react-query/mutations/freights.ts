import { ExportService } from '@/services/export'
import { PostExportCattlePurchaseFreightsXlsx } from '@/services/webApi/freights-api'
import { UseExportCattlePurchaseFreightsXlsxRequest } from '@/types/mutations/freights'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useExportCattlePurchaseFreightsXlsx = () => {
  return useMutation({
    mutationFn: async ({
      endDate,
      startDate,
      freightCompany,
      selectedCompany,
      status,
    }: UseExportCattlePurchaseFreightsXlsxRequest) => {
      const { data, headers } = await PostExportCattlePurchaseFreightsXlsx({
        filters: {
          endDate,
          startDate,
          freightCompany,
          companyCode: selectedCompany,
          status,
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
