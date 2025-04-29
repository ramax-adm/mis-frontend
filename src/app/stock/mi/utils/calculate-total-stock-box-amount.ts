import { GetAnalyticalStockByCompanyResponse, GetStockByCompanyResponse } from '@/types/api/stock'
import { fromLocaleStringToNumber, toLocaleString } from '@/utils/number.utils'

export const calculateTotalStockBoxAmount = (
  item: GetStockByCompanyResponse[] | GetAnalyticalStockByCompanyResponse[],
) => {
  const value = item
    .map((item) => ({ ...item, boxAmount: fromLocaleStringToNumber(item.boxAmount) }))
    .reduce((acc, item) => acc + item.boxAmount, 0)

  return toLocaleString(value)
}
