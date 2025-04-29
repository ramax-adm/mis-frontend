import { ProductLine } from '@/types/api/sensatta'
import { GetAllStocksResponse, GetAnalyticalAllStocksResponse } from '@/types/api/stock'
import { SetStateAction, useEffect } from 'react'
import { SelectedProductLinesByCompany } from '../types/selected-product-lines-by-company'

interface UseSetSelectedProductLinesInitialStateRequest {
  data?: GetAllStocksResponse[] | GetAnalyticalAllStocksResponse
  productLines?: ProductLine[]
  setSelectedProductLinesByCompany: (value: SetStateAction<SelectedProductLinesByCompany[]>) => void
}

export const useSetSelectedProductLinesInitialState = ({
  data,
  productLines,
  setSelectedProductLinesByCompany,
}: UseSetSelectedProductLinesInitialStateRequest) => {
  return useEffect(() => {
    if (!data || !productLines) return

    const values = productLines.map((p) => p.acronym)

    let initialState
    if (Array.isArray(data)) {
      initialState = data.map((item) => ({
        companyCode: item.companyCode,
        values,
      }))
    } else {
      initialState = [
        {
          companyCode: data.companyCode,
          values,
        },
      ]
    }

    setSelectedProductLinesByCompany(initialState)
  }, [data, productLines])
}
