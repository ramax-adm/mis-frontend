import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetStockIncomingBatchesLastUpdatedAt,
  GetStockIncomingBatchesProductLinesFilters,
  GetStockIncomingBatchesResumeData,
} from "@/services/webApi/stock-incoming-batches-api";
import { MarketEnum } from "@/types/sensatta";
import {
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
