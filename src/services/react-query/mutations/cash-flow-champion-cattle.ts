import { useMutation } from '@tanstack/react-query'
import {
  UseExportCashFlowSimulationRequest,
  UseSimulateCashFlowRequest,
} from '@/types/mutations/cash-flow-champion-cattle'
import { PostSimulateDataResponse } from '@/types/api/cash-flow'
import { ExportService } from '@/services/export'
import { toast } from 'sonner'
import {
  PostSimulateCashFlowChampionCattle,
  PostExportXlsx,
} from '@/services/webApi/cash-flow-champion-cattle-api'
import {
  PostSimulateCashFlowChampionCattleRequest,
  PostSimulateCashFlowChampionCattleResponse,
} from '@/types/api/cash-flow-champion-cattle'

export const useSimulateCashFlowChampionCattle = () => {
  return useMutation({
    mutationFn: async ({
      projecaoValores,
      matPrimaValores,
      meValores,
      miValores,
      operacaoValores,
      precosMe,
      precosMi,
      rendimentosMe,
      rendimentosMi,
    }: UseSimulateCashFlowRequest) => {
      console.log({
        msg: 'useSimulateCashFlowChampionCattle',
        matPrimaValores,
        meValores,
        miValores,
        operacaoValores,
        precosMe,
        precosMi,
        rendimentosMe,
        rendimentosMi,
      })

      const response = await PostSimulateCashFlowChampionCattle({
        projecao: projecaoValores,
        matPrima: matPrimaValores,
        me: meValores,
        mi: miValores,
        operacao: operacaoValores,
        precosMe,
        precosMi,
        rendimentosMe,
        rendimentosMi,
      })

      return response as PostSimulateCashFlowChampionCattleResponse
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao simular!',
      })
    },
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Simulação concluida com sucesso!',
      })
    },
  })
}

export const useExportXlsx = () => {
  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id?: string
      values?: UseExportCashFlowSimulationRequest
    }) => {
      const { data, headers } = await PostExportXlsx({
        id,
        values: {
          projecao: values?.projecaoValores,
          matPrima: values?.matPrimaValores,
          me: values?.meValores,
          mi: values?.miValores,
          operacao: values?.operacaoValores,
          precosMe: values?.precosMe,
          precosMi: values?.precosMi,
          rendimentosMe: values?.rendimentosMe,
          rendimentosMi: values?.rendimentosMi,
        },
      })
      const contentDispositionHeader = headers['content-disposition'] as string
      const filenameMatches = contentDispositionHeader.match(/filename=(.+\.xlsx)/)
      const filename = filenameMatches?.[1] || `cashflow.xlsx`
      await ExportService.toExcel({ filename, data })
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao exportar o arquivo .xlsx',
      })
    },
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Sucesso ao exportar o arquivo .xlsx',
      })
    },
  })
}
