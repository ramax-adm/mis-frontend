import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ExportService } from "@/services/export";
import { MarketEnum } from "@/types/sensatta";
import { PostFetch, urls } from "@/services/axios/api-base";

export const useExportStockIncomingBatchesXlsx = () => {
  return useMutation({
    mutationFn: async ({
      exportType,
      filters,
    }: {
      exportType: string;
      filters: {
        companyCode?: string;
        market?: MarketEnum;
        productLineCodes?: string[];
      };
    }) => {
      const response = await PostFetch(
        urls.STOCK.INCOMING_BATCHES.POST_EXPORT_XLSX,
        { exportType, filters },
        {
          responseType: "blob",
        }
      );

      const contentDispositionHeader = response.headers[
        "content-disposition"
      ] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `stock-incoming-batches.xlsx`;
      await ExportService.toExcel({ filename, data: response.data });
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
