import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetBusinessAuditConsideredCfops,
  GetBusinessAuditConsideredNfSituations,
  GetBusinessAuditOverviewData,
} from "@/services/webApi/business-audit-api";
import {
  GetBusinessAuditOverviewDataResponse,
  GetBusinessAuditSalesDataResponse,
} from "@/types/api/business-audit";
import { GetFetch, urls } from "@/services/axios/api-base";
import { useApiQuery } from "../react-query";
import { OrderLine } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";

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
}: {
  startDate: string;
  endDate: string;
  priceConsideration?: OrderPriceConsiderationEnum;
  market?: MarketEnum;
  companyCodes?: string;
}) => {
  return useApiQuery<GetBusinessAuditSalesDataResponse>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_SALES,
      startDate,
      endDate,
      priceConsideration,
      companyCodes,
      market,
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
          },
        }
      );
      return response.data;
    },
  });
};

export const useGetBusinessAuditOrdersLinesData = ({
  nfNumber,
  startDate,
  endDate,
}: {
  nfNumber: string;
  startDate: string;
  endDate: string;
}) => {
  return useApiQuery<OrderLine[]>({
    queryKey: [
      queryKeys.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_ORDERS_LINES_DATA,
      nfNumber,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.BUSINESS_AUDIT.GET_BUSINESS_AUDIT_ORDERS_LINES_DATA,
        { params: { nfNumber, startDate, endDate } }
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
