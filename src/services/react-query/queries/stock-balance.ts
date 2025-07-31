import { GetStockLastUpdatedAt } from "@/services/webApi/stock-api";
import { queryKeys } from "../query-keys";
import { GetStockLastUpdatedAtResponse } from "@/types/api/stock";
import {
  GetStockBalanceAggregatedAnalyticalDataResponse,
  GetStockBalanceAnalyticalDataResponse,
  GetStockBalanceLastUpdatedAtResponse,
} from "@/types/api/stock-balance";
import { useQuery } from "@tanstack/react-query";
import {
  GetStockBalanceAggregatedAnalyticalData,
  GetStockBalanceAnalyticalData,
  GetStockBalanceLastUpdatedAt,
} from "@/services/webApi/stock-balance-api";

export const useGetStockBalanceLastUpdatedAt = () => {
  return useQuery<GetStockBalanceLastUpdatedAtResponse>({
    queryKey: [queryKeys.STOCK_BALANCE.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetStockBalanceLastUpdatedAt();

      return response;
    },
  });
};

export const useGetStockBalanceAggregatedAnalyticalData = ({
  dataVisualization,
  companyCode,
  market,
  productLineCode,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCode: string;
  market?: string;
  productLineCode?: string;
}) => {
  return useQuery<GetStockBalanceAggregatedAnalyticalDataResponse>({
    queryKey: [
      queryKeys.STOCK_BALANCE.GET_AGGREGATED_ANALYTICAL,
      companyCode,
      market,
      productLineCode,
    ],
    queryFn: async () => {
      return await GetStockBalanceAggregatedAnalyticalData({
        companyCode,
        market,
        productLineCode,
      });
    },
    enabled: dataVisualization === "aggregated-analytical",
  });
};

export const useGetStockBalanceAnalyticalData = ({
  dataVisualization,
  companyCode,
  market,
  productLineCode,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCode: string;
  market?: string;
  productLineCode?: string;
}) => {
  return useQuery<GetStockBalanceAnalyticalDataResponse>({
    queryKey: [
      queryKeys.STOCK_BALANCE.GET_ANALYTICAL,
      companyCode,
      market,
      productLineCode,
    ],
    queryFn: async () => {
      return await GetStockBalanceAnalyticalData({
        companyCode,
        market,
        productLineCode,
      });
    },
    enabled: dataVisualization === "analytical",
  });
};
