import { MarketEnum } from "@/types/sensatta";
import { GetFetch, PostFetch, urls } from "../axios/api-base";

export async function GetStockIncomingBatchesLastUpdatedAt() {
  const response = await GetFetch(
    urls.STOCK.INCOMING_BATCHES.GET_LAST_UPDATED_AT
  );

  return response.data;
}

export async function GetStockIncomingBatchesProductLinesFilters({
  market,
}: {
  market?: MarketEnum;
}) {
  const response = await GetFetch(
    urls.STOCK.INCOMING_BATCHES.GET_PRODUCT_LINES_FILTERS,
    { params: { market } }
  );

  return response.data;
}

export async function GetStockIncomingBatchesResumeData({
  market,
  productLineCodes,
}: {
  market?: MarketEnum;
  productLineCodes?: string;
}) {
  const response = await GetFetch(urls.STOCK.INCOMING_BATCHES.GET_RESUME_DATA, {
    params: {
      market,
      productLineCodes,
    },
  });

  return response.data;
}
export async function GetStockIncomingBatchesAnalyticalData({
  companyCode,
  market,
  productLineCodes,
}: {
  companyCode: string;
  market?: MarketEnum;
  productLineCodes?: string;
}) {
  const response = await GetFetch(
    urls.STOCK.INCOMING_BATCHES.GET_ANALYTICAL_DATA,
    {
      params: {
        companyCode,
        market,
        productLineCodes,
      },
    }
  );

  return response.data;
}

export async function PostExportStockIncomingBatchesAllXlsx({
  exportType,
  filters,
}: {
  exportType: "resumed" | "analytical";
  filters: {
    market?: MarketEnum;
    productLineCodes?: string[];
  };
}) {
  const response = await PostFetch(
    urls.STOCK.INCOMING_BATCHES.POST_EXPORT_XLSX,
    { exportType, filters },
    {
      responseType: "blob",
    }
  );

  return response;
}
