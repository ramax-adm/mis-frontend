import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetBusinessAuditConsideredCfops,
  GetBusinessAuditConsideredNfSituations,
  GetBusinessAuditOverviewData,
} from "@/services/webApi/business-audit-api";
import {
  GetBusinessAuditOverviewDataResponse,
  GetBusinessAuditReturnOccurrencesDataResponse,
  GetBusinessAuditSalesDataResponse,
} from "@/types/api/business-audit";
import { GetFetch, urls } from "@/services/axios/api-base";
import { useApiQuery } from "../react-query";
import { OrderLine } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { FilterOptionItem } from "@/types/globals";

export const useGetBusinessAuditOverviewData = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return useApiQuery<GetBusinessAuditOverviewDataResponse>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_OVERVIEW,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetBusinessAuditOverviewData({
        startDate,
        endDate,
      });

      return response;
    },
  });
};

export const useGetBusinessAuditSalesData = ({
  startDate,
  endDate,
  priceConsideration,
  companyCodes,
  market,
  clientCodes,
  salesRepresentativeCodes,
}: {
  startDate: string;
  endDate: string;
  priceConsideration?: OrderPriceConsiderationEnum;
  market?: MarketEnum;
  companyCodes?: string;
  clientCodes?: string;
  salesRepresentativeCodes?: string;
}) => {
  return useApiQuery<GetBusinessAuditSalesDataResponse>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_SALES,
      startDate,
      endDate,
      priceConsideration,
      companyCodes,
      market,
      clientCodes,
      salesRepresentativeCodes,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_SALES,
        {
          params: {
            startDate,
            endDate,
            priceConsideration,
            companyCodes,
            market,
            clientCodes,
            salesRepresentativeCodes,
          },
        }
      );
      return response.data;
    },
  });
};

export const useGetBusinessAuditReturnOccurrencesData = ({
  startDate,
  endDate,
  companyCodes,
  occurrenceCauses,
  occurrenceNumber,
  returnTypes,
}: {
  startDate: string;
  endDate: string;
  occurrenceNumber?: string;
  companyCodes?: string;
  returnTypes?: string;
  occurrenceCauses?: string;
}) => {
  return useApiQuery<GetBusinessAuditReturnOccurrencesDataResponse>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_RETURN_OCCURRENCES,
      startDate,
      endDate,
      companyCodes,
      occurrenceCauses,
      occurrenceNumber,
      returnTypes,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_RETURN_OCCURRENCES,
        {
          params: {
            startDate,
            endDate,
            companyCodes,
            occurrenceCauses,
            occurrenceNumber,
            returnTypes,
          },
        }
      );

      return response.data;
    },
  });
};

export const useGetBusinessAuditOrdersLinesData = ({
  nfId,
  startDate,
  endDate,
}: {
  nfId: string;
  startDate: string;
  endDate: string;
}) => {
  return useApiQuery<OrderLine[]>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_ORDERS_LINES_DATA,
      nfId,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_ORDERS_LINES_DATA,
        { params: { nfId, startDate, endDate } }
      );
      return response.data;
    },
  });
};

export const useGetBusinessAuditSalesClientFilters = ({
  startDate,
  endDate,
  priceConsideration,
  companyCodes,
  market,
  clientCode,
  salesRepresentativeCode,
}: {
  startDate?: string;
  endDate?: string;
  priceConsideration?: OrderPriceConsiderationEnum;
  market?: MarketEnum;
  companyCodes?: string;
  clientCode?: string;
  salesRepresentativeCode?: string;
}) => {
  return useApiQuery<FilterOptionItem[]>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_SALES_CLIENTS_FILTERS,
      startDate,
      endDate,
      priceConsideration,
      companyCodes,
      market,
      clientCode,
      salesRepresentativeCode,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_SALES_CLIENTS_FILTERS,
        {
          params: {
            startDate,
            endDate,
            priceConsideration,
            companyCodes,
            market,
            clientCode,
            salesRepresentativeCode,
          },
        }
      );

      return response.data;
    },
  });
};

export const useGetBusinessAuditSalesRepresentativeFilters = ({
  startDate,
  endDate,
  priceConsideration,
  companyCodes,
  market,
  clientCode,
  salesRepresentativeCode,
}: {
  startDate?: string;
  endDate?: string;
  priceConsideration?: OrderPriceConsiderationEnum;
  market?: MarketEnum;
  companyCodes?: string;
  clientCode?: string;
  salesRepresentativeCode?: string;
}) => {
  return useApiQuery<FilterOptionItem[]>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_SALES_REPRESENTATIVES_FILTERS,
      startDate,
      endDate,
      priceConsideration,
      companyCodes,
      market,
      clientCode,
      salesRepresentativeCode,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_SALES_REPRESENTATIVE_FILTERS,
        {
          params: {
            startDate,
            endDate,
            priceConsideration,
            companyCodes,
            market,
            clientCode,
            salesRepresentativeCode,
          },
        }
      );

      return response.data;
    },
  });
};

export const useGetBusinessAuditConsideredCfops = () => {
  return useApiQuery<string[]>({
    queryKey: [queryKeys.BUSINESS_AUDIT.GET_CONSIDERED_CFOPS],
    queryFn: async () => {
      const response = await GetBusinessAuditConsideredCfops();

      return response;
    },
  });
};

export const useGetBusinessAuditConsideredNfSituations = () => {
  return useApiQuery<string[]>({
    queryKey: [queryKeys.BUSINESS_AUDIT.GET_CONSIDERED_NF_SITUATIONS],
    queryFn: async () => {
      const response = await GetBusinessAuditConsideredNfSituations();

      return response;
    },
  });
};
