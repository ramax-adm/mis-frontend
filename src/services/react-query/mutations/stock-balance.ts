import { toast } from "sonner";
import { queryKeys } from "../query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostSyncStockBalanceWithSensatta } from "@/services/webApi/sensatta-api";
import { ExportService } from "@/services/export";
import { PostExportStockBalanceAllXlsx } from "@/services/webApi/stock-balance-api";

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
      const queriesToInvalidate = [queryKeys.STOCK_BALANCE.GET_LAST_UPDATED_AT];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );

      toast.success("Sucesso", {
        description: "A sincronização foi concluida com sucesso!",
      });
    },
  });
};

export const useExportStockBalanceAllXlsx = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, headers } = await PostExportStockBalanceAllXlsx();
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `stock.xlsx`;
      await ExportService.toExcel({ filename, data });
    },
    onError() {
      toast.error("Erro", {
        description: "Erro ao exportar o arquivo!",
      });
    },
    onSuccess() {
      toast.success("Sucesso", {
        description: "O arquivo foi exportado com sucesso!",
      });
    },
  });
};
