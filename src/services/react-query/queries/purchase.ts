import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetCattlePurchaseAggregatedAnalyticalData,
  GetCattlePurchaseAnalyticalData,
  GetCattlePurchaseCattleAdvisor,
  GetCattlePurchaseCattleClassification,
  GetCattlePurchaseCattleOwner,
  GetCattlePurchaseResumedData,
  GetPurchaseLastUpdatedAt,
} from "@/services/webApi/purchase-api";
import {
  GetCattlePurchaseAggregatedAnalyticalDataResponse,
  GetCattlePurchaseAnalyticalDataResponse,
  GetCattlePurchaseResumedDataResponse,
} from "@/types/api/purchase";

export const useGetPurchaseLastUpdatedAt = () => {
  return useQuery({
    queryKey: [queryKeys.PURCHASE.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      return await GetPurchaseLastUpdatedAt();
    },
  });
};

export const useGetCattlePurchaseCattleOwner = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  return useQuery<{ cattleOwnerName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleOwner({
        companyCode,
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseCattleClassification = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  return useQuery<{ cattleClassification: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleClassification({
        companyCode,
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseCattleAdvisor = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  return useQuery<{ cattleAdvisorName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleAdvisor({
        companyCode,
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseResumedData = ({
  companyCode,
  startDate,
  endDate,
}: {
  companyCode: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  return useQuery<GetCattlePurchaseResumedDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_RESUMED_DATA,
      companyCode,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await GetCattlePurchaseResumedData({
        companyCode,
        startDate,
        endDate,
      });

      return response;
    },
  });
};

export const useGetCattlePurchaseAnalyticalData = ({
  dataVisualization,
  companyCode,
  cattleAdvisorName,
  cattleOwnerName,
  cattleClassification,
  endDate,
  startDate,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCode: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  return useQuery<GetCattlePurchaseAnalyticalDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
      companyCode,
      cattleAdvisorName,
      cattleOwnerName,
      cattleClassification,
      endDate,
      startDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseAnalyticalData({
        companyCode,
        cattleAdvisorName,
        cattleOwnerName,
        cattleClassification,
        endDate,
        startDate,
      });
    },
    enabled: dataVisualization === "analytical",
  });
};

export const useGetCattlePurchaseAggregatedAnalyticalData = ({
  dataVisualization,
  companyCode,
  startDate,
  endDate,
  cattleAdvisorName,
  cattleClassification,
  cattleOwnerName,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCode: string;
  startDate: Date | null;
  endDate: Date | null;
  cattleAdvisorName: string;
  cattleClassification: string;
  cattleOwnerName: string;
}) => {
  return useQuery<GetCattlePurchaseAggregatedAnalyticalDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_AGGREGATED_ANALYTICAL_DATA,
      companyCode,
      startDate,
      endDate,
      cattleAdvisorName,
      cattleClassification,
      cattleOwnerName,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseAggregatedAnalyticalData({
        companyCode,
        startDate,
        endDate,
        cattleAdvisorName,
        cattleClassification,
        cattleOwnerName,
      });
    },
    enabled: dataVisualization === "aggregated-analytical",
  });
};
