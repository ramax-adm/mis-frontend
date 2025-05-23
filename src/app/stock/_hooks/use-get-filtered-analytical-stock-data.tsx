import { GetAnalyticalAllStocksResponse } from '@/types/api/stock'
import { SelectedProductLinesByCompany } from '@/types/stock'
import { useMemo } from 'react'

interface UseGetFilteredAnalyticalStockDataRequest {
  data?: GetAnalyticalAllStocksResponse
  selectedProductLinesByCompany: SelectedProductLinesByCompany[]
}
export const useGetFilteredAnalyticalStockData = ({
  data,
  selectedProductLinesByCompany,
}: UseGetFilteredAnalyticalStockDataRequest) => {
  return useMemo(() => {
    if (!data) return null

    if (!selectedProductLinesByCompany || selectedProductLinesByCompany.length === 0) {
      return data
    }

    const relatedFilter = selectedProductLinesByCompany.find(
      (i) => i.companyCode === data.companyCode,
    )

    if (!relatedFilter) {
      return data
    }

    return {
      ...data,
      stockData: data.stockData.filter((stock) =>
        relatedFilter.values.includes(stock.productLineAcronym),
      ),
      toExpiresData: data.toExpiresData.filter((exp) =>
        relatedFilter.values.includes(exp.productLineAcronym),
      ),
    }
  }, [data, selectedProductLinesByCompany])
}
