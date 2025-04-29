import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetAllStocksResponse,
  GetAnalyticalAllStocksResponse,
  GetStockLastUpdatedAtResponse,
} from '@/types/api/stock'
import {
  GetAllStocks,
  GetAnalyticalAllStocks,
  GetStockLastUpdatedAt,
} from '@/services/webApi/stock-api'
import { GetProductClassificationTypes } from '@/services/webApi/sensatta-api'
import { GetProductClassificationTypesResponse } from '@/types/api/sensatta'
import { UseGetAnalyticalAllStocksRequest } from '@/types/queries/stock'

export const useGetProductClassificationTypes = () => {
  return useQuery<GetProductClassificationTypesResponse[]>({
    queryKey: [queryKeys.SENSATTA.GET_PRODUCT_CLASSIFICATION_TYPES],
    queryFn: async () => await GetProductClassificationTypes(),
    refetchOnWindowFocus: false,
  })
}

export const useGetAllStocks = () => {
  return useQuery<GetAllStocksResponse[]>({
    queryKey: [queryKeys.STOCK.GET_ALL],
    queryFn: async () => {
      const response = await GetAllStocks()

      return response
    },
    refetchOnWindowFocus: false,
  })
}

export const useGetAnalyticalAllStocks = ({ companyCode }: UseGetAnalyticalAllStocksRequest) => {
  return useQuery<GetAnalyticalAllStocksResponse>({
    queryKey: [queryKeys.STOCK.GET_ANALYTICAL_ALL, companyCode],
    queryFn: async () => {
      const response = await GetAnalyticalAllStocks({ companyCode })

      return response
    },
    refetchOnWindowFocus: false,
    enabled: !!companyCode && companyCode.length > 0,
  })
}

export const useGetStockLastUpdatedAt = () => {
  return useQuery<GetStockLastUpdatedAtResponse>({
    queryKey: [queryKeys.STOCK.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetStockLastUpdatedAt()

      return response
    },
    refetchOnWindowFocus: false,
  })
}
