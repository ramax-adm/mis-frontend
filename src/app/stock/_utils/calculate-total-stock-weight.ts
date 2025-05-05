import { GetAnalyticalStockByCompanyResponse, GetStockByCompanyResponse } from '@/types/api/stock'
import { fromLocaleStringToNumber, toLocaleString } from '@/utils/number.utils'

export const calculateTotalStockWeight = (
  item: GetStockByCompanyResponse[] | GetAnalyticalStockByCompanyResponse[],
) => {
  const value = item
    .map((item) => ({ ...item, totalWeightInKg: fromLocaleStringToNumber(item.totalWeightInKg) }))
    .reduce((acc, item) => acc + item.totalWeightInKg, 0)

  return toLocaleString(value)
}
