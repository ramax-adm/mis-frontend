import { ExportService } from "@/services/export";
import { useApiMutation } from "../react-query";
import { toast } from "sonner";
import { PostFetch, urls } from "@/services/axios/api-base";
import { MarketEnum } from "@/types/sensatta";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";

export const useExportBusinessAuditXlsx = (type: "overview" | "sales") => {
  return useApiMutation({
    mutationFn: async ({
      filters,
    }: {
      filters: {
        startDate?: string;
        endDate?: string;
        companyCodes?: string;
        market?: MarketEnum;
        priceConsideration?: OrderPriceConsiderationEnum;
      };
    }) => {
      const { data, headers } = await PostFetch(
        urls.BUSINESS_AUDIT.POST_EXPORT_XLSX.replace(":type", type),
        { filters },
        {
          responseType: "blob",
        }
      );
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `business-audit.xlsx`;
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
