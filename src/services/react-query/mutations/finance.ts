import { PostFetch, urls } from "@/services/axios/api-base";
import { ExportService } from "@/services/export";
import { toast } from "sonner";
import { useApiMutation } from "../react-query";
import {
  AccountReceivableStatusEnum,
  AccountReceivableVisualizationEnum,
} from "@/types/finance";
import { FinanceReportTypeEnum } from "@/app/finance/_constants/finance-report-type";

export const useExportFinanceXlsx = () => {
  return useApiMutation({
    mutationFn: async ({
      type,
      filters,
    }: {
      type: FinanceReportTypeEnum;
      filters: {
        startDate: string;
        endDate: string;
        companyCodes?: string;
        clientCode?: string;
        key?: string;
        status?: AccountReceivableStatusEnum;
        visualizationType?: AccountReceivableVisualizationEnum;
        bucketSituations?: string;
      };
    }) => {
      const { data, headers } = await PostFetch(
        urls.FINANCE.POST_EXPORT_XLSX.replace(":type", type),
        { filters },
        {
          responseType: "blob",
        }
      );
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `finance.xlsx`;
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
