import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetStockIncomingBatchesAnalyticalData,
  GetStockIncomingBatchesLastUpdatedAt,
  GetStockIncomingBatchesProductLinesFilters,
  GetStockIncomingBatchesResumeData,
} from "@/services/webApi/stock-incoming-batches-api";
import { MarketEnum } from "@/types/sensatta";
import {
  GetStockInconingBatchesAnalyticalResponse,
  GetStockInconingBatchesLastUpdatedAtResponse,
  GetStockInconingBatchesResumeResponse,
} from "@/types/api/stock-incoming-batches";

export const useGetStockIncomingBatchesLastUpdatedAt = () => {
  return useQuery<GetStockInconingBatchesLastUpdatedAtResponse>({
    queryKey: [queryKeys.STOCK_INCOMING_BATCHES.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetStockIncomingBatchesLastUpdatedAt();

      return response;
    },
  });
};

export const useGetStockIncomingBatchesProductLinesFilters = ({
  market,
}: {
  market?: MarketEnum;
}) => {
  return useQuery<{ key: string; label: string; value: string }[]>({
    queryKey: [
      queryKeys.STOCK_INCOMING_BATCHES.GET_PRODUCT_LINES_FILTERS,
      market,
    ],
    queryFn: async () => {
      const response = await GetStockIncomingBatchesProductLinesFilters({
        market,
      });

      return response;
    },
  });
};

export const useGetStockIncomingBatchesResumedData = ({
  market,
  productLineCodes,
}: {
  market?: MarketEnum;
  productLineCodes?: string;
}) => {
  return useQuery<GetStockInconingBatchesResumeResponse>({
    queryKey: [
      queryKeys.STOCK_INCOMING_BATCHES.GET_RESUMED_DATA,
      market,
      productLineCodes,
    ],
    queryFn: async () => {
      const response = await GetStockIncomingBatchesResumeData({
        market,
        productLineCodes,
      });

      return response;
    },
  });
};

export const useGetStockIncomingBatchesAnalyticalData = ({
  companyCode,
  market,
  productLineCodes,
}: {
  companyCode: string;
  market?: MarketEnum;
  productLineCodes?: string;
}) => {
  return useQuery<GetStockInconingBatchesAnalyticalResponse>({
    queryKey: [
      queryKeys.STOCK_INCOMING_BATCHES.GET_ANALYTICAL_DATA,
      companyCode,
      market,
      productLineCodes,
    ],
    queryFn: async () => {
      const response = await GetStockIncomingBatchesAnalyticalData({
        companyCode,
        market,
        productLineCodes,
      });

      return response;
    },
    enabled: !!companyCode,
  });
};
