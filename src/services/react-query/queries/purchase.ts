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
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) => {
  return useQuery<{ cattleOwnerName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,

      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleOwner({
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseCattleClassification = ({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) => {
  return useQuery<{ cattleClassification: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,

      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleClassification({
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseCattleAdvisor = ({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) => {
  return useQuery<{ cattleAdvisorName: string }[]>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,

      startDate,
      endDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseCattleAdvisor({
        startDate,
        endDate,
      });
    },
  });
};

export const useGetCattlePurchaseResumedData = ({
  companyCodes,
  startDate,
  endDate,
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
}) => {
  return useQuery<GetCattlePurchaseResumedDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_RESUMED_DATA,
      companyCodes,
      startDate,
      endDate,
      cattleAdvisorName,
      cattleClassification,
      cattleOwnerName,
    ],
    queryFn: async () => {
      const response = await GetCattlePurchaseResumedData({
        companyCodes,
        startDate,
        endDate,
        cattleAdvisorName,
        cattleClassification,
        cattleOwnerName,
      });

      return response;
    },
  });
};

export const useGetCattlePurchaseAnalyticalData = ({
  dataVisualization,
  companyCodes,
  cattleAdvisorName,
  cattleOwnerName,
  cattleClassification,
  purchaseCattleOrderId,
  endDate,
  startDate,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCodes: string;
  cattleOwnerName?: string;
  cattleAdvisorName?: string;
  cattleClassification?: string;
  purchaseCattleOrderId?: string;
  startDate?: string | null;
  endDate?: string | null;
}) => {
  return useQuery<GetCattlePurchaseAnalyticalDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
      companyCodes,
      cattleAdvisorName,
      cattleOwnerName,
      cattleClassification,
      purchaseCattleOrderId,
      endDate,
      startDate,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseAnalyticalData({
        companyCodes,
        cattleAdvisorName,
        cattleOwnerName,
        cattleClassification,
        purchaseCattleOrderId,
        endDate,
        startDate,
      });
    },
    enabled: dataVisualization === "analytical",
  });
};

export const useGetCattlePurchaseAggregatedAnalyticalData = ({
  dataVisualization,
  companyCodes,
  startDate,
  endDate,
  cattleAdvisorName,
  cattleClassification,
  purchaseCattleOrderId,
  cattleOwnerName,
}: {
  dataVisualization: "aggregated-analytical" | "analytical";
  companyCodes: string;
  startDate: string | null;
  endDate: string | null;
  cattleAdvisorName: string;
  cattleClassification: string;
  purchaseCattleOrderId: string;
  cattleOwnerName: string;
}) => {
  return useQuery<GetCattlePurchaseAggregatedAnalyticalDataResponse>({
    queryKey: [
      queryKeys.PURCHASE.GET_CATTLE_PURCHASE_AGGREGATED_ANALYTICAL_DATA,
      companyCodes,
      startDate,
      endDate,
      cattleAdvisorName,
      cattleClassification,
      purchaseCattleOrderId,
      cattleOwnerName,
    ],
    queryFn: async () => {
      return await GetCattlePurchaseAggregatedAnalyticalData({
        companyCodes,
        startDate,
        endDate,
        cattleAdvisorName,
        cattleClassification,
        purchaseCattleOrderId,
        cattleOwnerName,
      });
    },
    enabled: dataVisualization === "aggregated-analytical",
  });
};
