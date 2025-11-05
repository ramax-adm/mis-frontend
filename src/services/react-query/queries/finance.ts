import { GetFetch, urls } from "@/services/axios/api-base";
import { queryKeys } from "../query-keys";
import { useApiQuery } from "../react-query";
import { AccountsReceivableGetAnalyticalDataResponseDto } from "@/types/api/finance";
import { FilterOptionItem } from "@/types/globals";
import {
  AccountReceivableBucketSituationEnum,
  AccountReceivableStatusEnum,
  AccountReceivableVisualizationEnum,
} from "@/types/finance";

export const useAccountsReceivableGetLastUpdatedAt = () => {
  return useApiQuery({
    queryKey: [queryKeys.FINANCE.ACCOUNTS_RECEIVABLE.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FINANCE.ACCOUNTS_RECEIVABLE.GET_LAST_UPDATED_AT
      );

      return response.data;
    },
  });
};
export const useAccountsReceivableClientsFilters = ({
  startDate,
  endDate,
  companyCode,
  clientCode,
  key,
  status,
}: {
  startDate: string;
  endDate: string;
  companyCode: string;
  clientCode?: string;
  key?: string;
  status?: AccountReceivableStatusEnum;
}) => {
  return useApiQuery<FilterOptionItem[]>({
    queryKey: [
      queryKeys.FINANCE.ACCOUNTS_RECEIVABLE.GET_CLIENTS_FILTERS,
      startDate,
      endDate,
      companyCode,
      clientCode,
      key,
      status,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FINANCE.ACCOUNTS_RECEIVABLE.GET_CLIENTS_FILTERS,
        {
          params: {
            startDate,
            endDate,
            companyCode,
            clientCode,
            key,
            status,
          },
        }
      );

      return response.data;
    },
    enabled: !!startDate && !!endDate && !!companyCode,
  });
};

export const useGetAnalyticalAccountsReceivable = ({
  startDate,
  endDate,
  companyCode,
  clientCode,
  key,
  status,
  visualizationType,
  bucketSituations,
}: {
  startDate: string;
  endDate: string;
  companyCode: string;
  clientCode?: string;
  key?: string;
  status?: AccountReceivableStatusEnum;
  visualizationType?: AccountReceivableVisualizationEnum;
  bucketSituations?: string;
}) => {
  return useApiQuery<AccountsReceivableGetAnalyticalDataResponseDto>({
    queryKey: [
      queryKeys.FINANCE.ACCOUNTS_RECEIVABLE.GET_ANALYTICAL_ACCOUNTS_RECEIVABLE,
      startDate,
      endDate,
      companyCode,
      clientCode,
      key,
      status,
      visualizationType,
      bucketSituations,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FINANCE.ACCOUNTS_RECEIVABLE.GET_ANALYTICAL_ACCOUNTS_RECEIVABLE,
        {
          params: {
            startDate,
            endDate,
            companyCode,
            clientCode,
            key,
            status,
            visualizationType,
            bucketSituations,
          },
        }
      );

      return response.data;
    },
    enabled: !!startDate && !!endDate && !!companyCode,
  });
};
