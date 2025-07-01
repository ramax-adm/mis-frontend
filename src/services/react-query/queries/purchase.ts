import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetCattlePurchaseAnalyticalData,
  GetCattlePurchaseCattleAdvisor,
  GetCattlePurchaseCattleClassification,
  GetCattlePurchaseCattleOwner,
  GetPurchaseLastUpdatedAt,
} from '@/services/webApi/purchase-api'
import { GetCattlePurchaseAnalyticalDataResponse } from '@/types/api/purchase'

export const useGetPurchaseLastUpdatedAt = () => {
  return useQuery({
    queryKey: [queryKeys.PURCHASE.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      return await GetPurchaseLastUpdatedAt()
    },
  })
}

export const useGetCattlePurchaseCattleOwner = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string
  startDate?: Date | null
  endDate?: Date | null
}) => {
  return useQuery<{ cattleOwnerName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleOwner({ companyCode, startDate, endDate })
    },
  })
}

export const useGetCattlePurchaseCattleClassification = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string
  startDate?: Date | null
  endDate?: Date | null
}) => {
  return useQuery<{ cattleClassification: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleClassification({ companyCode, startDate, endDate })
    },
  })
}

export const useGetCattlePurchaseCattleAdvisor = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string
  startDate?: Date | null
  endDate?: Date | null
}) => {
  return useQuery<{ cattleAdvisorName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleAdvisor({ companyCode, startDate, endDate })
    },
  })
}

export const useGetCattlePurchaseAnalyticalData = ({
  companyCode,
  cattleAdvisorName,
  cattleOwnerName,
  cattleClassification,
  endDate,
  startDate,
}: {
  companyCode: string
  cattleOwnerName?: string
  cattleAdvisorName?: string
  cattleClassification?: string
  startDate?: Date | null
  endDate?: Date | null
}) => {
  return useQuery<GetCattlePurchaseAnalyticalDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
      companyCode,
      cattleAdvisorName,
      cattleOwnerName,
      cattleClassification,
      endDate,
      startDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseAnalyticalData({
        companyCode,
        cattleAdvisorName,
        cattleOwnerName,
        cattleClassification,
        endDate,
        startDate,
      })
    },
  })
}
