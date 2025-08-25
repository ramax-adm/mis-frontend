import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ExportService } from "@/services/export";
import { PostExportStockBalanceAllXlsx } from "@/services/webApi/stock-balance-api";

export const useExportStockBalanceAllXlsx = ({
  filters,
}: {
  filters: {
    companyCode: string;
    market?: string;
    productLineCode?: string;
  };
}) => {
  return useMutation({
    mutationFn: async () => {
      const { data, headers } = await PostExportStockBalanceAllXlsx({
        filters,
      });
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
