import { GetFetch, PostFetch, urls } from "../axios/api-base";

export async function GetStockBalanceLastUpdatedAt() {
  const response = await GetFetch(urls.STOCK.STOCK_BALANCE.GET_LAST_UPDATED_AT);

  return response.data;
}

export async function GetStockBalanceAggregatedAnalyticalData({
  companyCode,
  market,
  productLineCode,
}: {
  companyCode: string;
  market?: string;
  productLineCode?: string;
}) {
  const response = await GetFetch(
    urls.STOCK.STOCK_BALANCE.GET_AGGREGATED_ANALYTICAL_DATA,
    {
      params: {
        key: "productLine", // WIP: Turn This Dynamic
        companyCode,
        market,
        productLineCode,
      },
    }
  );

  return response.data;
}

export async function GetStockBalanceAnalyticalData({
  companyCode,
  market,
  productLineCode,
}: {
  companyCode: string;
  market?: string;
  productLineCode?: string;
}) {
  const response = await GetFetch(
    urls.STOCK.STOCK_BALANCE.GET_ANALYTICAL_DATA,
    {
      params: {
        companyCode,
        market,
        productLineCode,
      },
    }
  );

  return response.data;
}

export async function PostExportStockBalanceAllXlsx({
  filters,
}: {
  filters: {
    companyCode: string;
    market?: string;
    productLineCode?: string;
  };
}) {
  const response = await PostFetch(
    urls.STOCK.STOCK_BALANCE.POST_EXPORT_XLSX,
    { filters },
    {
      responseType: "blob",
    }
  );

  return response;
}
