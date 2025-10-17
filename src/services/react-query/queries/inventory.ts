import { GetFetch, urls } from "@/services/axios/api-base";
import { queryKeys } from "../query-keys";
import { useApiQuery } from "../react-query";
import { FilterOptionItem } from "@/types/globals";
import {
  InventoryGetAnalitycalDataResponse,
  InventoryGetResumeDataResponse,
} from "@/types/api/inventory";

export const useGetInventoryLastUpdatedAt = () => {
  return useApiQuery({
    queryKey: [queryKeys.STOCK.INVENTORY.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetFetch(urls.STOCK.INVENTORY.GET_LAST_UPDATED_AT);

      return response.data;
    },
  });
};

export const useGetInventoriesFilters = ({
  companyCode,
}: {
  companyCode: string;
}) => {
  return useApiQuery<FilterOptionItem[]>({
    queryKey: [queryKeys.STOCK.INVENTORY.GET_INVENTORY_FILTERS, companyCode],
    queryFn: async () => {
      const response = await GetFetch(
        urls.STOCK.INVENTORY.GET_INVENTORY_FILTERS,
        {
          params: {
            companyCode,
          },
        }
      );
      return response.data;
    },
    enabled: !!companyCode,
  });
};

export const useGetInventoryResumeData = ({
  companyCode,
  inventoryId,
  boxNumber,
}: {
  companyCode: string;
  inventoryId: string;
  boxNumber?: string;
}) => {
  return useApiQuery<InventoryGetResumeDataResponse>({
    queryKey: [
      queryKeys.STOCK.INVENTORY.GET_RESUME_DATA,
      companyCode,
      inventoryId,
      boxNumber,
    ],
    queryFn: async () => {
      const response = await GetFetch(urls.STOCK.INVENTORY.GET_RESUME_DATA, {
        params: {
          companyCode,
          inventoryId,
          boxNumber,
        },
      });

      return response.data;
    },
    enabled: !!companyCode && !!inventoryId,
  });
};

export const useGetInventoryAnalyticalData = ({
  companyCode,
  inventoryId,
  boxNumber,
}: {
  companyCode: string;
  inventoryId: string;
  boxNumber?: string;
}) => {
  return useApiQuery<InventoryGetAnalitycalDataResponse>({
    queryKey: [
      queryKeys.STOCK.INVENTORY.GET_ANALYTICAL_DATA,
      companyCode,
      inventoryId,
      boxNumber,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.STOCK.INVENTORY.GET_ANALYTICAL_DATA,
        {
          params: {
            companyCode,
            inventoryId,
            boxNumber,
          },
        }
      );

      return response.data;
    },
    enabled: !!companyCode && !!inventoryId,
  });
};
