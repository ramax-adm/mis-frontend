import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetAnalyticalCattlePurchaseFreights,
  GetCattleFreightsStatuses,
  GetFreightsLastUpdatedAt,
} from '@/services/webApi/freights-api'
import {
  GetAnalyticalCattlePurchaseFreightsResponse,
  GetCattleFreightsStatusesResponse,
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

export const useGetCattleFreightsStatuses = () => {
  return useQuery<GetCattleFreightsStatusesResponse[]>({
    queryKey: [queryKeys.FREIGHTS.GET_CATTLE_PURCHASE_FREIGHTS_STATUSES],
    queryFn: async () => {
      const response = await GetCattleFreightsStatuses()

      return response
    },
    refetchOnWindowFocus: false,
  })
}

export const useGetAnalyticalCattlePurchaseFreights = ({
  startDate,
  endDate,
  companyCode,
  status,
  freightCompany,
}: UseGetAnalyticalCattlePurchaseFreights) => {
  return useQuery<GetAnalyticalCattlePurchaseFreightsResponse>({
    queryKey: [
      queryKeys.FREIGHTS.GET_CATTLE_PURCHASE_FREIGHTS_ANALYTICAL,
      startDate,
      endDate,
      companyCode,
      status,
      freightCompany,
    ],
    queryFn: async () => {
      const isMainFiltersChoosed = !!startDate && !!endDate && !!companyCode
      if (!isMainFiltersChoosed) {
        return
      }
      const response = await GetAnalyticalCattlePurchaseFreights({
        startDate,
        endDate,
        companyCode,
        status,
        freightCompany,
      })

      return response
    },

    enabled: !!startDate && !!endDate && !!companyCode && companyCode.length > 0,
  })
}
