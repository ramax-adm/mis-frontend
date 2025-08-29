import { PatchFetch, PostFetch, urls } from "@/services/axios/api-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../query-keys";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      type,
    }: {
      name: string;
      description: string;
      type: string;
    }) => {
      const response = await PostFetch(urls.INTRANET.POST_ADD_DOCUMENT, {
        name,
        description,
        type,
      });

      return response.data;
    },
    onSuccess() {
      toast.success("Sucesso", {
        description:
          "A criação de um novo documento foi concluida com sucesso.",
      });

      const queriesToInvalidate = [
        queryKeys.INTRANET.GET_USER_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS,
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
        description: "Erro na criação de um novo documento.",
      });
    },
  });
};

export const useUpdateDocument = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      type,
    }: {
      name?: string;
      description?: string;
      type?: string;
    }) => {
      const response = await PatchFetch(
        urls.INTRANET.PATCH_UPDATE_DOCUMENT.replace(":id", id),
        {
          name,
          description,
          type,
        }
      );

      return response.data;
    },
    onSuccess() {
      toast.success("Sucesso", {
        description: "A edição de um novo documento foi concluida com sucesso.",
      });

      const queriesToInvalidate = [
        queryKeys.INTRANET.GET_USER_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS.concat(id),
        queryKeys.INTRANET.GET_FIND_DOCUMENTS_VERSIONS,
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
        description: "Erro na edição de um novo documento.",
      });
    },
  });
};

export const useCreateDocumentVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      documentId,
      file,
      key,
      majorChanges,
      reviewNumber,
      category,
      storageKey,
      version,
    }: {
      documentId: string;
      key: string;
      version: string;
      reviewNumber?: number;
      majorChanges: string;
      category: string;
      storageKey?: string;
      file?: any;
    }) => {
      const fd = new FormData();

      fd.append("documentId", documentId);
      fd.append("key", key);
      fd.append("version", version);
      fd.append("majorChanges", majorChanges);
      fd.append("category", category);
      if (storageKey) fd.append("storageKey", storageKey);

      if (reviewNumber) fd.append("reviewNumber", reviewNumber.toString());
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
        queryKeys.INTRANET.GET_USER_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS_VERSIONS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS.concat(vars.documentId),
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({
          queryKey: [query],
          exact: false,
          refetchType: "all",
        })
      );
    },
  });
};

export const useUserConfirmDocumentAcceptance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      documentVersionId,
      acceptanceTimeInSeconds,
      ipAddress,
    }: {
      documentVersionId: string;
      ipAddress: string;
      acceptanceTimeInSeconds: number;
    }) => {
      const response = await PostFetch(
        urls.USER.USER_DOCUMENT_ACCEPTANCE
          .POST_CONFIRM_DOCUMENT_VERSION_ACCEPTANCE,
        { documentVersionId, acceptanceTimeInSeconds, ipAddress }
      );

      return response.data;
    },
    onSuccess() {
      const queriesToInvalidate = [
        queryKeys.INTRANET.GET_USER_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS,
        queryKeys.INTRANET.GET_FIND_DOCUMENTS_VERSIONS,
      ];

      queriesToInvalidate.forEach((query) =>
        queryClient.invalidateQueries({
          queryKey: [query],
          exact: false,
          refetchType: "all",
        })
      );
    },
  });
};
