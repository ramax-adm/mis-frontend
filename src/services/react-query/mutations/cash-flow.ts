import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DeleteManyUserSimulations,
  DeleteUserSimulation,
  PostExportXlsx,
  PostSaveUserSimulation,
  PostSimulateCashFlow,
} from '../../webApi/cash-flow-api'
import {
  UseExportCashFlowSimulationRequest,
  UseSaveUserSimulationRequest,
  UseSimulateCashFlowRequest,
} from '@/types/mutations/cash-flow'
import { PostSimulateDataResponse } from '@/types/api/cash-flow'
import { queryKeys } from '../query-keys'
import { ExportService } from '@/services/export'
import { toast } from 'sonner'

export const useSimulateCashFlow = () => {
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
        msg: 'useSimulateCashFlow',
        matPrimaValores,
        meValores,
        miValores,
        operacaoValores,
        precosMe,
        precosMi,
        rendimentosMe,
        rendimentosMi,
      })

      const response = await PostSimulateCashFlow({
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

      return response as PostSimulateDataResponse
    },
    onError() {
      toast.success('Erro', {
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

export const useSaveUserSimulation = () => {
  const queryClient = useQueryClient()
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
    }: UseSaveUserSimulationRequest) => {
      if (
        !projecaoValores ||
        !matPrimaValores ||
        !meValores ||
        !miValores ||
        !operacaoValores ||
        !precosMe ||
        !precosMi ||
        !rendimentosMe ||
        !rendimentosMi
      ) {
        return
      }
      const response = await PostSaveUserSimulation({
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

      return response
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao salvar a simulação!',
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CASH_FLOW.GET_USER_SIMULATIONS],
        refetchType: 'all',
        exact: false,
      })
      toast.success('Sucesso', {
        description: 'Sucesso ao salvar a simulação!',
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

export const useDeleteUserSimulation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        return
      }
      const response = await DeleteUserSimulation(id)

      return response
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao remover simulação previa.',
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CASH_FLOW.GET_USER_SIMULATIONS],
        refetchType: 'all',
        exact: false,
      })

      toast.success('Sucesso', {
        description: 'Sucesso ao remover simulação.',
      })
    },
  })
}

export const useDeleteManyUserSimulations = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (date?: string) => {
      if (!date) {
        return
      }
      const response = await DeleteManyUserSimulations(date)

      return response
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao remover as simulações do dia.',
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CASH_FLOW.GET_USER_SIMULATIONS],
        refetchType: 'all',
        exact: false,
      })

      toast.success('Sucesso', {
        description: 'Sucesso ao remover as simulações do dia.',
      })
    },
  })
}
