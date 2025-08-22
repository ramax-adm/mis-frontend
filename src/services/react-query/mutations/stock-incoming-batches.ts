import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ExportService } from "@/services/export";
import { PostExportStockIncomingBatchesAllXlsx } from "@/services/webApi/stock-incoming-batches-api";
import { MarketEnum } from "@/types/sensatta";

export const useExportStockIncomingBatchesAllXlsx = () => {
  return useMutation({
    mutationFn: async ({
      exportType,
      filters,
    }: {
      exportType: "resumed" | "analytical";
      filters: {
        companyCode?: string;
        market?: MarketEnum;
        productLineCodes?: string[];
      };
    }) => {
      const { data, headers } = await PostExportStockIncomingBatchesAllXlsx({
        exportType,
        filters,
      });
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `stock-incoming-batches.xlsx`;
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
