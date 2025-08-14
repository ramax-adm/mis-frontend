import { MarketEnum } from "@/types/sensatta";
import { GetFetch, urls } from "../axios/api-base";

export async function GetStockIncomingBatchesLastUpdatedAt() {
  const response = await GetFetch(
    urls.STOCK.INCOMING_BATCHES.GET_LAST_UPDATED_AT
  );

  return response.data;
}

export async function GetStockIncomingBatchesResumeData({
  market,
  productLineCodes,
}: {
  market?: MarketEnum;
  productLineCodes?: string[];
}) {
  const response = await GetFetch(urls.STOCK.INCOMING_BATCHES.GET_RESUME_DATA, {
    params: {
      market,
      productLineCodes,
    },
  });

  return response.data;
}
