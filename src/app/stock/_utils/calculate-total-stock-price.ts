import {
  GetAnalyticalStockByCompanyResponse,
  GetStockByCompanyResponse,
} from "@/types/api/stock";
import { fromLocaleStringToNumber, toLocaleString } from "@/utils/number.utils";

export const calculateTotalStockPrice = (
  item: GetStockByCompanyResponse[] | GetAnalyticalStockByCompanyResponse[] = []
) => {
  const value = item
    .map((item) => ({
      ...item,
      totalPrice: fromLocaleStringToNumber(item.totalPrice),
    }))
    .reduce((acc, item) => acc + item.totalPrice, 0);

  return toLocaleString(value);
};
