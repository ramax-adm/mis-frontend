import { PostFetch, urls } from "@/services/axios/api-base";
import { useApiMutation } from "../react-query";
import { toast } from "sonner";
import { ExportService } from "@/services/export";
import { InventoryTabSectionsEnum } from "@/app/stock/inventory/constants/inventory-tab-sections.enum";

export const useExportInventoryXlsx = (type: InventoryTabSectionsEnum) => {
  return useApiMutation({
    mutationFn: async ({
      filters,
    }: {
      filters: {
        boxNumber?: string;
        companyCode?: string;
        inventoryId?: string;
      };
    }) => {
      const { data, headers } = await PostFetch(
        urls.STOCK.INVENTORY.POST_EXPORT_XLSX.replace(":type", type),
        { filters },
        {
          responseType: "blob",
        }
      );
      const contentDispositionHeader = headers["content-disposition"] as string;
      const filenameMatches =
        contentDispositionHeader.match(/filename=(.+\.xlsx)/);
      const filename = filenameMatches?.[1] || `inventory.xlsx`;
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
