import {
  GetAnalyticalToExpiresByCompanyResponse,
  GetToExpiresByCompanyResponse,
} from '@/types/api/stock'
import { fromLocaleStringToNumber, toLocaleString } from '@/utils/number.utils'

export function calculateTotalStockWeightToExpires(
  data: GetToExpiresByCompanyResponse[] | GetAnalyticalToExpiresByCompanyResponse[],
  daysQuantityA: number = 0,
  daysQuantityB: number = 0,
) {
  const result = data
    .filter((item) =>
      daysQuantityA || daysQuantityA !== 0 ? item.daysToExpires >= daysQuantityA : true,
    )
    .filter((item) =>
      daysQuantityB || daysQuantityB !== 0 ? item.daysToExpires <= daysQuantityB : true,
    )
    .map((item) => ({ ...item, totalWeightInKg: fromLocaleStringToNumber(item.totalWeightInKg) }))
    .reduce((acc, item) => acc + item.totalWeightInKg, 0)

  return toLocaleString(result)
}
