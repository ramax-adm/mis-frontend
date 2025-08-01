import {
  GetAnalyticalToExpiresByCompanyResponse,
  GetToExpiresByCompanyResponse,
} from "@/types/api/stock";
import { fromLocaleStringToNumber, toLocaleString } from "@/utils/number.utils";

export function calculateTotalStockWeightToExpires(
  data:
    | GetToExpiresByCompanyResponse[]
    | GetAnalyticalToExpiresByCompanyResponse[],
  daysQuantityA: number,
  daysQuantityB: number
) {
  const result = data
    .filter((item) => item.daysToExpires >= daysQuantityA)
    .filter((item) => item.daysToExpires <= daysQuantityB)
    .map((item) => ({
      ...item,
      totalWeightInKg: fromLocaleStringToNumber(item.totalWeightInKg),
    }))
    .reduce((acc, item) => acc + item.totalWeightInKg, 0);

  return toLocaleString(result);
}
