import { PostExportCattlePurchaseXlsxRequest } from "@/types/api/purchase";
import { GetFetch, PostFetch, urls } from "../axios/api-base";

export async function GetPurchaseLastUpdatedAt() {
  const response = await GetFetch(urls.PURCHASE.GET_LAST_UPDATED_AT);

  return response.data;
}

export async function GetCattlePurchaseCattleOwner({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,
    {
      params: { companyCode, startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseCattleClassification({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,
    {
      params: { companyCode, startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseCattleAdvisor({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,
    {
      params: { companyCode, startDate, endDate },
    }
  );
  return response.data;
}

export async function GetCattlePurchaseAnalyticalData({
  companyCode,
  cattleAdvisorName,
  cattleOwnerName,
  cattleClassification,
  endDate,
  startDate,
}: {
  companyCode: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
    {
      params: {
        companyCode,
        cattleAdvisorName,
        cattleOwnerName,
        cattleClassification,
        endDate,
        startDate,
      },
    }
  );

  return response.data;
}

export async function GetCattlePurchaseResumedData({
  companyCode,
  endDate,
  startDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_RESUMED_DATA,
    {
      params: {
        companyCode,
        endDate,
        startDate,
      },
    }
  );

  return response.data;
}

export async function GetCattlePurchaseAggregatedAnalyticalData({
  companyCode,
  startDate,
  endDate,
  cattleAdvisorName,
  cattleClassification,
  cattleOwnerName,
}: {
  companyCode: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) {
  const response = await GetFetch(
    urls.PURCHASE.GET_CATTLE_PURCHASE_AGGREGATED_ANALYTICAL_DATA,
    {
      params: {
        companyCode,
        startDate,
        endDate,
        cattleAdvisorName,
        cattleClassification,
        cattleOwnerName,
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
