import {
  GetAnalyticalToExpiresByCompanyResponse,
  GetToExpiresByCompanyResponse,
} from "@/types/api/stock";
import { fromLocaleStringToNumber, toLocaleString } from "@/utils/number.utils";

export function calculateTotalStockPriceToExpires(
  data: GetAnalyticalToExpiresByCompanyResponse[] = [],
  daysQuantityA: number,
  daysQuantityB: number
) {
  const result = data
    .filter((item) => item.daysToExpires >= daysQuantityA)
    .filter((item) => item.daysToExpires <= daysQuantityB)
    .map((item) => ({
      ...item,
      totalPrice: fromLocaleStringToNumber(item.totalPrice),
    }))
    .reduce((acc, item) => acc + item.totalPrice, 0);

  return toLocaleString(result);
}
