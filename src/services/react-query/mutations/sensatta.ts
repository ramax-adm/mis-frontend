import { PostSyncStockWithSensatta } from '@/services/webApi/sensatta-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { toast } from 'sonner'

export const useSyncStockWithSensatta = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => await PostSyncStockWithSensatta(),
    onError() {
      toast.success('Erro', {
        description: 'Erro ao sincronizar com o sensatta!',
      })
    },

    onSuccess() {
      const queriesToInvalidate = [queryKeys.STOCK.GET_ALL, queryKeys.STOCK.GET_LAST_UPDATED_AT]

      queriesToInvalidate.forEach((query) => queryClient.invalidateQueries({ queryKey: [query] }))

      toast.success('Sucesso', {
        description: 'A sincronização foi concluida com sucesso!',
      })
    },
  })
}
