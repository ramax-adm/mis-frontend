import { ExportService } from '@/services/export'
import { PostExportHumanResourcesHoursXlsx } from '@/services/webApi/human-resources-hours-api'
import { UseExportHumanResourcesHoursXlsxRequest } from '@/types/mutations/human-resources-hours'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useExportHumanResourcesHoursXlsx = () => {
  return useMutation({
    mutationFn: async ({
      startDate,
      endDate,
      companyCode,
      department,
      employeeName,
    }: UseExportHumanResourcesHoursXlsxRequest) => {
      const { data, headers } = await PostExportHumanResourcesHoursXlsx({
        filters: {
          startDate,
          endDate,
          companyCode,
          department,
          employeeName,
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
