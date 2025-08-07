import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../query-keys";
import {
  PostExportSalesInvoicesXlsx,
  PostSyncSalesInvoicesWithSensatta,
} from "@/services/webApi/sales";
import { PostExportSalesInvoicesXlsxRequest } from "@/types/api/sales";
import { ExportService } from "@/services/export";

export const useSyncSalesInvoicesWithSensatta = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await PostSyncSalesInvoicesWithSensatta(),
    onError() {
      toast.error("Erro", {
        description: "Erro ao sincronizar com o sensatta!",
      });
    },

    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.SALES.INVOICE.GET_LAST_UPDATED_AT,
        queryKeys.SALES.INVOICE.GET_CFOPS_FILTERS,
        queryKeys.SALES.INVOICE.GET_CLIENTS_FILTERS,
        queryKeys.SALES.INVOICE.GET_NF_SITUATIONS_FILTERS,
        queryKeys.SALES.INVOICE.GET_ANALYTICAL_DATA,
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

export const useExportSalesInvoicesXlsx = () => {
  return useMutation({
    mutationFn: async ({ filters }: PostExportSalesInvoicesXlsxRequest) => {
      const { data, headers } = await PostExportSalesInvoicesXlsx({ filters });
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `stock.xlsx`;
      await ExportService.toExcel({ filename, data });
    },
    onError() {
      toast.error("Erro", {
        description: "Erro ao exportar o excel.",
      });
    },

    onSuccess() {
      toast.success("Sucesso", {
        description: "Exportação em excel concluido com sucesso!",
      });
    },
  });
};
