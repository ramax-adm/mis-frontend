import { PostFetch, urls } from "@/services/axios/api-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../query-keys";

export const useCreateDocumentVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      documentId,
      file,
      key,
      majorChanges,
      reviewNumber,
      type,
      version,
    }: {
      documentId: string;
      key: string;
      version: string;
      reviewNumber: number;
      majorChanges: string;
      type: string;
      file?: any;
    }) => {
      const fd = new FormData();

      console.log({ file });

      fd.append("documentId", documentId);
      fd.append("key", key);
      fd.append("version", version);
      fd.append("reviewNumber", reviewNumber.toString());
      fd.append("majorChanges", majorChanges);
      fd.append("type", type);
      if (file) fd.append("file", file[0]);

      const response = await PostFetch(
        urls.INTRANET.POST_ADD_DOCUMENT_VERSION,
        fd
      );

      return response.data;
    },
    onSuccess(_, vars) {
      toast.success("Sucesso", {
        description:
          "A criação de uma nova versão de documento foi concluida com sucesso.",
      });

      const queriesToInvalidate = [
        queryKeys.INTRANET.GET_BY_USER,
        queryKeys.INTRANET.GET_DOCUMENTS,
        queryKeys.INTRANET.GET_DOCUMENTS_VERSIONS,
        queryKeys.INTRANET.GET_DOCUMENTS.concat(vars.documentId),
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({
          queryKey: [query],
          exact: false,
          refetchType: "all",
        })
      );
    },
    onError() {
      toast.error("Erro", {
        description: "Erro na criação de uma nova versão de documento.",
      });
    },
  });
};
