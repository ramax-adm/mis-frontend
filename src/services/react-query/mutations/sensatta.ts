import {
  PostSyncFreightsWithSensatta,
  PostSyncPurchaseWithSensatta,
  PostSyncStockBalanceWithSensatta,
  PostSyncStockWithSensatta,
} from "@/services/webApi/sensatta-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { toast } from "sonner";
import { PostFetch, urls } from "@/services/axios/api-base";
import { url } from "inspector";

export const useSyncStockWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostSyncStockWithSensatta(),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.STOCK.GET_ALL,
        queryKeys.STOCK.GET_LAST_UPDATED_AT,
        queryKeys.STOCK_INCOMING_BATCHES.GET_RESUMED_DATA,
        queryKeys.STOCK_INCOMING_BATCHES.GET_LAST_UPDATED_AT,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({
          queryKey: [query],
          refetchType: "all",
          exact: false,
        })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};

export const useSyncStockBalanceWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostSyncStockBalanceWithSensatta(),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.STOCK_BALANCE.GET_LAST_UPDATED_AT,
        queryKeys.STOCK_BALANCE.GET_AGGREGATED_ANALYTICAL,
        queryKeys.STOCK_BALANCE.GET_ANALYTICAL,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({
          queryKey: [query],
          refetchType: "all",
          exact: false,
        })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};

export const useSyncFreightsWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostSyncFreightsWithSensatta(),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.FREIGHTS.GET_CATTLE_PURCHASE_FREIGHTS_ANALYTICAL,
        queryKeys.FREIGHTS.GET_LAST_UPDATED_AT,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};

export const useSyncPurchaseWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostSyncPurchaseWithSensatta(),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.PURCHASE.GET_CATTLE_PURCHASE_ANALYTICAL_DATA,
        queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_OWNER,
        queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_CLASSIFICATION,
        queryKeys.PURCHASE.GET_CATTLE_PURCHASE_CATTLE_ADVISOR,
        queryKeys.PURCHASE.GET_LAST_UPDATED_AT,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};

export const useSyncFinanceWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostFetch(urls.SENSATTA.POST_SYNC_FINANCE),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.FINANCE.ACCOUNTS_RECEIVABLE
          .GET_ANALYTICAL_ACCOUNTS_RECEIVABLE,
        queryKeys.FINANCE.ACCOUNTS_RECEIVABLE.GET_CLIENTS_FILTERS,
        queryKeys.FINANCE.ACCOUNTS_RECEIVABLE.GET_LAST_UPDATED_AT,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};
