import { GetAllStocksResponse, GetAnalyticalAllStocksResponse } from '@/types/api/stock'
import { SetStateAction } from 'react'
import { SelectedProductLinesByCompany } from '../types/selected-product-lines-by-company'
import { ProductLine } from '@/types/api/sensatta'

interface UseSelectedProductLinesFiltersRequest {
  selectedProductLinesByCompany?: SelectedProductLinesByCompany[]
  data?: GetAllStocksResponse[] | GetAnalyticalAllStocksResponse
  productLines?: ProductLine[]
  setSelectedProductLinesByCompany: (value: SetStateAction<SelectedProductLinesByCompany[]>) => void
}

const resetSelectedProductLinesState = (
  companyCode: string | null = null,
  { setSelectedProductLinesByCompany }: UseSelectedProductLinesFiltersRequest,
) => {
  if (!companyCode) return

  const values: string[] = []

  setSelectedProductLinesByCompany((prev) => {
    const filtered = prev.filter((item) => item.companyCode !== companyCode)
    return [
      ...filtered,
      {
        companyCode,
        values,
      },
    ]
  })
}

const presetSelectedProductLinesState = ({
  data,
  productLines,
  setSelectedProductLinesByCompany,
}: UseSelectedProductLinesFiltersRequest) => {
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
}

export const useSelectProductLinesFilters = ({
  data,
  productLines,
  setSelectedProductLinesByCompany,
}: UseSelectedProductLinesFiltersRequest) => ({
  reset: (companyCode: string | null) =>
    resetSelectedProductLinesState(companyCode, { data, setSelectedProductLinesByCompany }),
  preset: () =>
    presetSelectedProductLinesState({
      data,
      productLines,
      setSelectedProductLinesByCompany,
    }),
})
