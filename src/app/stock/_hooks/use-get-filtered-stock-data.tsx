import { GetAllStocksResponse } from "@/types/api/stock";
import { SelectedProductLinesByCompany } from "@/types/stock";
import { useMemo } from "react";

interface UseGetFilteredStockDataRequest {
  data?: GetAllStocksResponse[];
  selectedProductLinesByCompany: SelectedProductLinesByCompany[];
}
export const useGetFilteredStockData = ({
  data,
  selectedProductLinesByCompany,
}: UseGetFilteredStockDataRequest) => {
  return useMemo(() => {
    if (!data) return [];

    if (
      !selectedProductLinesByCompany ||
      selectedProductLinesByCompany.length === 0
    ) {
      return data.map((i) => ({
        ...i,
        stockData: [],
        toExpiresData: [],
      }));
    }

    return data.map((item) => {
      const relatedFilter = selectedProductLinesByCompany.find(
        (i) => i.companyCode === item.companyCode
      );

      if (!relatedFilter) {
        return {
          ...item,
          stockData: [],
          toExpiresData: [],
        };
      }

      return {
        ...item,
        stockData: item.stockData.filter((stock) =>
          relatedFilter.values.includes(stock.productLineAcronym)
        ),
        toExpiresData: item.toExpiresData.filter((exp) =>
          relatedFilter.values.includes(exp.productLineAcronym)
        ),
      };
    });
  }, [data, selectedProductLinesByCompany]);
};
