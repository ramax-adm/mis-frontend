import { PostExportCattlePurchaseXlsxRequest } from "@/types/api/purchase";
import { GetFetch, PostFetch, urls } from "../axios/api-base";

export async function GetPurchaseLastUpdatedAt() {
  const response = await GetFetch(urls.PURCHASE.GET_LAST_UPDATED_AT);

  return response.data;
}

export async function GetCattlePurchaseCattleOwner({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,
    {
      params: { startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseCattleClassification({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,
    {
      params: { startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseCattleAdvisor({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,
    {
      params: { startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseAnalyticalData({
  companyCodes,
  cattleAdvisorName,
  cattleOwnerName,
  cattleClassification,
  purchaseCattleOrderId,
  endDate,
  startDate,
}: {
  companyCodes: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  purchaseCattleOrderId?: string;

  startDate?: string | null;
  endDate?: string | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
    {
      params: {
        companyCodes,
        cattleAdvisorName,
        cattleOwnerName,
        cattleClassification,
        endDate,
        startDate,
        purchaseCattleOrderId,
      },
    }
  );

  return response.data;
}

export async function GetCattlePurchaseResumedData({
  companyCodes,
  endDate,
  startDate,
  cattleAdvisorName,
  cattleClassification,
  cattleOwnerName,
}: {
  companyCodes: string;
  startDate?: string | null;
  endDate?: string | null;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_RESUMED_DATA,
    {
      params: {
        companyCodes,
        endDate,
        startDate,
        cattleAdvisorName,
        cattleClassification,
        cattleOwnerName,
      },
    }
  );

  return response.data;
}

export async function GetCattlePurchaseAggregatedAnalyticalData({
  companyCodes,
  startDate,
  endDate,
  cattleAdvisorName,
  cattleClassification,
  cattleOwnerName,
  purchaseCattleOrderId,
}: {
  companyCodes: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  purchaseCattleOrderId?: string;
  startDate?: string | null;
  endDate?: string | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_AGGREGATED_ANALYTICAL_DATA,
    {
      params: {
        companyCodes,
        startDate,
        endDate,
        cattleAdvisorName,
        cattleClassification,
        cattleOwnerName,
        purchaseCattleOrderId,
      },
    }
  );

  return response.data;
}

export async function PostExportCattlePurchaseXlsx({
  filters,
}: PostExportCattlePurchaseXlsxRequest) {
  const response = await PostFetch(
    urls.PURCHASE.POST_EXPORT_XLSX,
    { filters },
    {
      responseType: "blob",
    }
  );

  return response;
}
