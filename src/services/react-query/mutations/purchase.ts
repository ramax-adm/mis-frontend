import { ExportService } from "@/services/export";
import { PostExportCattlePurchaseXlsx } from "@/services/webApi/purchase-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useExportCattlePurchaseXlsx = () => {
  return useMutation({
    mutationFn: async ({
      startDate,
      endDate,
      companyCodes,
      cattleAdvisorName,
      cattleClassification,
      cattleOwnerName,
      purchaseCattleOrderId,
    }: {
      companyCodes: string;
      cattleOwnerName?: string;
      cattleAdvisorName?: string;
      cattleClassification?: string;
      startDate?: string | null;
      endDate?: string | null;
      purchaseCattleOrderId?: string;
    }) => {
      const { data, headers } = await PostExportCattlePurchaseXlsx({
        filters: {
          startDate,
          endDate,
          companyCodes,
          cattleAdvisorName,
          cattleClassification,
          cattleOwnerName,
          purchaseCattleOrderId,
        },
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
