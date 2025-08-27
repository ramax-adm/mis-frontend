import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetFetch, urls } from "@/services/axios/api-base";
import { IntranetDocument, IntranetDocumentVersion } from "@/types/intranet";

export const useGetIntranetDocuments = () => {
  return useQuery<IntranetDocument[]>({
    queryKey: [queryKeys.INTRANET.GET_DOCUMENTS],
    queryFn: async () => {
      const response = await GetFetch(urls.INTRANET.GET_DOCUMENTS);

      return response?.data;
    },
  });
};

export const useGetIntranetDocument = ({ id }: { id: string }) => {
  return useQuery<IntranetDocument>({
    queryKey: [queryKeys.INTRANET.GET_DOCUMENTS.concat(id)],
    queryFn: async () => {
      const response = await GetFetch(
        urls.INTRANET.GET_ONE_DOCUMENT.replace(":id", id)
      );

      return response?.data;
    },
    enabled: !!id,
  });
};

export const useGetIntranetDocumentVersions = () => {
  return useQuery<IntranetDocumentVersion[]>({
    queryKey: [queryKeys.INTRANET.GET_DOCUMENTS_VERSIONS],
    queryFn: async () => {
      const response = await GetFetch(urls.INTRANET.GET_DOCUMENTS_VERSIONS);

      return response?.data;
    },
  });
};

export const useGetIntranetDocumentVersion = ({ id }: { id: string }) => {
  return useQuery<IntranetDocumentVersion>({
    queryKey: [queryKeys.INTRANET.GET_DOCUMENTS_VERSIONS.concat(id)],
    queryFn: async () => {
      const response = await GetFetch(
        urls.INTRANET.GET_ONE_DOCUMENT_VERSION.replace(":id", id)
      );

      return response?.data;
    },
  });
};
