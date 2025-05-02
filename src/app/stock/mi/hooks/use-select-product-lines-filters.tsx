import { GetAllStocksResponse, GetAnalyticalAllStocksResponse } from '@/types/api/stock'
import { SetStateAction } from 'react'
import { ProductLine } from '@/types/api/sensatta'
import { storeStockProductLineFilters } from '../utils/store-stock-product-line-filters'
import { SelectedProductLinesByCompany } from '@/types/stock'

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
    const updatedState = [
      ...filtered,
      {
        companyCode,
        values,
      },
    ]
    storeStockProductLineFilters(updatedState)
    return updatedState
  })
}

const presetSelectedProductLinesState = (
  companyCode: string | null = null,
  { data, productLines, setSelectedProductLinesByCompany }: UseSelectedProductLinesFiltersRequest,
) => {
  if (!companyCode || !data || !productLines) return

  const values = productLines.map((p) => p.acronym)

  // Filtra os dados da empresa correspondente
  const matchedCompanyData = Array.isArray(data)
    ? data.find((item) => item.companyCode === companyCode)
    : data.companyCode === companyCode
      ? data
      : null

  if (!matchedCompanyData) return

  const newState = [
    {
      companyCode,
      values,
    },
  ]

  setSelectedProductLinesByCompany((prev) => {
    const filtered = prev.filter((item) => item.companyCode !== companyCode)
    const updatedState = [...filtered, ...newState]
    storeStockProductLineFilters(updatedState)
    return updatedState
  })
}

export const useSelectProductLinesFilters = ({
  data,
  productLines,
  setSelectedProductLinesByCompany,
}: UseSelectedProductLinesFiltersRequest) => ({
  reset: (companyCode: string | null) =>
    resetSelectedProductLinesState(companyCode, { data, setSelectedProductLinesByCompany }),
  preset: (companyCode: string | null = null) =>
    presetSelectedProductLinesState(companyCode, {
      data,
      productLines,
      setSelectedProductLinesByCompany,
    }),
})
