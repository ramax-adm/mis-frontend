import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetAnalyticalCattlePurchaseFreights,
  GetFreightsLastUpdatedAt,
} from '@/services/webApi/freights-api'
import {
  GetAnalyticalCattlePurchaseFreightsResponse,
  GetFreightsLastUpdatedAtResponse,
} from '@/types/api/freights'
import { UseGetAnalyticalCattlePurchaseFreights } from '@/types/queries/freights'

export const useGetFreightsLastUpdatedAt = () => {
  return useQuery<GetFreightsLastUpdatedAtResponse>({
    queryKey: [queryKeys.FREIGHTS.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetFreightsLastUpdatedAt()

      return response
    },
    refetchOnWindowFocus: false,
  })
}

export const useGetAnalyticalCattlePurchaseFreights = ({
  startDate,
  endDate,
  companyCode,
}: UseGetAnalyticalCattlePurchaseFreights) => {
  return useQuery<GetAnalyticalCattlePurchaseFreightsResponse>({
    queryKey: [
      queryKeys.FREIGHTS.GET_CATTLE_PURCHASE_FREIGHTS_ANALYTICAL,
      startDate,
      endDate,
      companyCode,
    ],
    queryFn: async () => {
      if (!startDate || !endDate || !companyCode) {
        return
      }
      const response = await GetAnalyticalCattlePurchaseFreights({
        startDate,
        endDate,
        companyCode,
      })

      return response
    },

    enabled: !!startDate && !!endDate && !!companyCode && companyCode.length > 0,
  })
}
