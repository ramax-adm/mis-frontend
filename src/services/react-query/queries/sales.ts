import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetAnalyticalInvoices,
  GetCfopsInvoiceFilters,
  GetClientsInvoiceFilters,
  GetNfSituationsInvoiceFilters,
  GetSalesInvoicesLastUpdatedAt,
} from "@/services/webApi/sales";
import { InvoicesNfTypesEnum } from "@/types/sales";
import {
  GetAnalyticalInvoicesResponse,
  GetInvoicesItem,
  GetSalesInvoicesUpdatedAtResponse,
} from "@/types/api/sales";

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
