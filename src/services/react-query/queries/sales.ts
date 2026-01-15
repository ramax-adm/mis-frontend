import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetAnalyticalInvoices,
  GetCfopsInvoiceFilters,
  GetClientsInvoiceFilters,
  GetNfSituationsInvoiceFilters,
  GetSalesInvoicesLastUpdatedAt,
} from "@/services/webApi/sales";
import { InvoicesNfTypesEnum, OrderLine } from "@/types/sales";
import {
  GetAnalyticalInvoicesResponse,
  GetAnalyticalOrdersResponse,
  GetAnalyticalReturnOccurrencesResponse,
  GetInvoicesItem,
  GetSalesInvoicesUpdatedAtResponse,
} from "@/types/api/sales";
import { GetFetch, urls } from "@/services/axios/api-base";
import { useApiQuery } from "../react-query";
import { FilterOptionItem } from "@/types/globals";

export const useGetSalesInvoicesLastUpdatedAt = () => {
  return useQuery<GetSalesInvoicesUpdatedAtResponse>({
    queryKey: [queryKeys.SALES.INVOICE.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetSalesInvoicesLastUpdatedAt();

      return response;
    },
    refetchOnWindowFocus: false,
  });
};

// SALES INVOICES ANALYTICAL
export const useGetCfopsInvoiceFilters = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery<{ key: string; label: string; value: string }[]>({
    queryKey: [
      queryKeys.SALES.INVOICE.GET_CFOPS_FILTERS,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () =>
      await GetCfopsInvoiceFilters({ companyCode, startDate, endDate }),
  });
};

export const useGetClientsInvoiceFilters = ({
  companyCodes,
  startDate,
  endDate,
}: {
  companyCodes?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery<{ key: string; label: string; value: string }[]>({
    queryKey: [
      queryKeys.SALES.INVOICE.GET_CLIENTS_FILTERS,
      companyCodes,
      startDate,
      endDate,
    ],
    queryFn: async () =>
      await GetClientsInvoiceFilters({ companyCodes, startDate, endDate }),
  });
};

export const useGetNfSituationsInvoiceFilters = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery<{ key: string; label: string; value: string }[]>({
    queryKey: [
      queryKeys.SALES.INVOICE.GET_NF_SITUATIONS_FILTERS,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () =>
      await GetNfSituationsInvoiceFilters({ companyCode, startDate, endDate }),
  });
};

export const useGetAnalyticalInvoices = ({
  companyCodes,
  startDate,
  endDate,
  cfopCodes,
  clientCode,
  nfNumber,
  nfSituations,
  nfType,
}: {
  companyCodes: string;
  startDate?: string;
  endDate?: string;
  clientCode?: string;
  cfopCodes?: string;
  nfType?: InvoicesNfTypesEnum;
  nfNumber?: string;
  nfSituations?: string;
}) => {
  return useQuery<GetAnalyticalInvoicesResponse>({
    queryKey: [
      queryKeys.SALES.INVOICE.GET_ANALYTICAL_DATA,
      companyCodes,
      startDate,
      endDate,
      cfopCodes,
      clientCode,
      nfNumber,
      nfSituations,
      nfType,
    ],
    queryFn: async () =>
      await GetAnalyticalInvoices({
        companyCodes,
        startDate,
        endDate,
        cfopCodes,
        clientCode,
        nfNumber,
        nfSituations,
        nfType,
      }),
  });
};

export const useGetAnalyticalOrders = ({
  companyCodes,
  startDate,
  endDate,
  situations,
  orderId,
}: {
  companyCodes?: string;
  startDate?: string;
  endDate?: string;
  situations?: string;
  orderId?: string;
}) => {
  return useApiQuery<GetAnalyticalOrdersResponse>({
    queryKey: [
      queryKeys.SALES.ORDERS.GET_ANALYTICAL_ORDERS,
      {
        companyCodes,
        startDate,
        endDate,
        situations,
        orderId,
      },
    ],
    queryFn: async () => {
      const response = await GetFetch(urls.SALES.ORDERS.GET_ANALYTICAL_ORDERS, {
        params: {
          companyCodes,
          startDate,
          endDate,
          situations,
          orderId,
        },
      });
      return response.data;
    },
  });
};

export const useGetOrderLine = ({ orderId = "" }: { orderId?: string }) => {
  return useApiQuery<OrderLine[]>({
    queryKey: [queryKeys.SALES.ORDERS.GET_ONE.concat(orderId)],
    queryFn: async () => {
      const response = await GetFetch(
        urls.SALES.ORDERS.GET_ONE.replace(":id", orderId)
      );
      return response.data;
    },
    enabled: !!orderId,
  });
};

export const useGetOrdersSituation = () => {
  return useApiQuery<FilterOptionItem[]>({
    queryKey: [queryKeys.SALES.ORDERS.GET_SITUATIONS_FILTERS],
    queryFn: async () => {
      const response = await GetFetch(urls.SALES.ORDERS.GET_SITUATIONS_FILTERS);
      return response.data;
    },
  });
};

export const useGetAnalyticalReturnOccurrences = ({
  companyCodes,
  startDate,
  endDate,
  clientCode,
  representativeCode,
  occurrenceNumber,
  returnType,
  occurrenceCauses,
}: {
  companyCodes?: string;
  startDate?: string;
  endDate?: string;
  clientCode?: string;
  representativeCode?: string;
  occurrenceNumber?: string;
  returnType?: string;
  occurrenceCauses?: string;
}) => {
  return useApiQuery<GetAnalyticalReturnOccurrencesResponse>({
    queryKey: [
      queryKeys.SALES.RETURN_OCCURRENCES.GET_ANALYTICAL_DATA,
      {
        companyCodes,
        startDate,
        endDate,
        clientCode,
        representativeCode,
        occurrenceNumber,
        returnType,
        occurrenceCauses,
      },
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.SALES.RETURN_OCCURRENCES.GET_ANALYTICAL_DATA,
        {
          params: {
            companyCodes,
            startDate,
            endDate,
            clientCode,
            representativeCode,
            occurrenceNumber,
            returnType,
            occurrenceCauses,
          },
        }
      );

      console.log("useGetAnalyticalReturnOccurrences", {
        companyCodes,
        startDate,
        endDate,
        clientCode,
        representativeCode,
        occurrenceNumber,
        returnType,
        occurrenceCauses,
      });

      return response.data;
    },
  });
};
