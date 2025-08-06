import { InvoicesNfTypesEnum } from "@/types/sales";
import { GetFetch, PostFetch, urls } from "../axios/api-base";

export async function GetSalesInvoicesLastUpdatedAt() {
  const response = await GetFetch(urls.SALES.INVOICES.GET_LAST_UPDATED_AT);

  return response.data;
}

export async function GetCfopsInvoiceFilters({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode?: string;
  startDate?: string;
  endDate?: string;
}) {
  const response = await GetFetch(urls.SALES.INVOICES.GET_CFOPS_FILTERS, {
    params: { companyCode, startDate, endDate },
  });

  return response.data;
}

export async function GetClientsInvoiceFilters({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode?: string;
  startDate?: string;
  endDate?: string;
}) {
  const response = await GetFetch(urls.SALES.INVOICES.GET_CLIENTS_FILTERS, {
    params: { companyCode, startDate, endDate },
  });

  return response.data;
}

export async function GetNfSituationsInvoiceFilters({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode?: string;
  startDate?: string;
  endDate?: string;
}) {
  const response = await GetFetch(
    urls.SALES.INVOICES.GET_NF_SITUATIONS_FILTERS,
    {
      params: { companyCode, startDate, endDate },
    }
  );

  return response.data;
}

export async function GetAnalyticalInvoices({
  companyCode,
  startDate,
  endDate,
  cfopCode,
  clientCode,
  nfNumber,
  nfSituation,
  nfType,
}: {
  companyCode: string;
  startDate?: string;
  endDate?: string;
  clientCode?: string;
  cfopCode?: string;
  nfType?: InvoicesNfTypesEnum;
  nfNumber?: string;
  nfSituation?: string;
}) {
  const response = await GetFetch(urls.SALES.INVOICES.GET_ANALYTICAL_INVOICES, {
    params: {
      companyCode,
      startDate,
      endDate,
      cfopCode,
      clientCode,
      nfNumber,
      nfSituation,
      nfType,
    },
  });

  return response.data;
}

export async function PostSyncSalesInvoicesWithSensatta() {
  const response = await PostFetch(urls.SALES.INVOICES.POST_SYNC_INVOICES);

  return response.data;
}
