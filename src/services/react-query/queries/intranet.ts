import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetFetch, urls } from "@/services/axios/api-base";
import {
  IntranetDocument,
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
  UserIntranetDocumentAcceptance,
} from "@/types/intranet";
import { GetIntranetUserDocumentsItem } from "@/types/api/intranet";

export const useGetIntranetDocuments = () => {
  return useQuery<IntranetDocument[]>({
    queryKey: [queryKeys.INTRANET.GET_FIND_DOCUMENTS],
    queryFn: async () => {
      const response = await GetFetch(urls.INTRANET.GET_FIND_DOCUMENTS);

      return response?.data;
    },
  });
};

export const useGetIntranetDocument = ({ id }: { id?: string }) => {
  return useQuery<IntranetDocument>({
    queryKey: [queryKeys.INTRANET.GET_FIND_DOCUMENTS.concat(id ?? "")],
    queryFn: async () => {
      const response = await GetFetch(
        urls.INTRANET.GET_FIND_ONE_DOCUMENT.replace(":id", id ?? "")
      );

      return response?.data;
    },
    enabled: !!id,
  });
};

export const useGetIntranetDocumentVersions = () => {
  return useQuery<IntranetDocumentVersion[]>({
    queryKey: [queryKeys.INTRANET.GET_FIND_DOCUMENTS_VERSIONS],
    queryFn: async () => {
      const response = await GetFetch(
        urls.INTRANET.GET_FIND_DOCUMENTS_VERSIONS
      );

      return response?.data;
    },
  });
};

export const useGetIntranetDocumentVersion = ({ id }: { id: string }) => {
  return useQuery<IntranetDocumentVersion>({
    queryKey: [queryKeys.INTRANET.GET_FIND_DOCUMENTS_VERSIONS.concat(id)],
    queryFn: async () => {
      const response = await GetFetch(
        urls.INTRANET.GET_FIND_ONE_DOCUMENT_VERSION.replace(":id", id)
      );

      return response?.data;
    },
  });
};

export const useGetIntranetDocumentsData = ({
  type,
}: {
  type: IntranetDocumentTypeEnum;
}) => {
  return useQuery<GetIntranetUserDocumentsItem[]>({
    queryKey: [queryKeys.INTRANET.GET_USER_DOCUMENTS, type],
    queryFn: async () => {
      const response = await GetFetch(urls.INTRANET.GET_USER_DOCUMENTS, {
        params: { type },
      });

      return response.data;
    },
  });
};

export const useGetAcceptedIntranetDocumentsData = () => {
  return useQuery<UserIntranetDocumentAcceptance[]>({
    queryKey: [queryKeys.INTRANET.GET_ACCEPTED_DOCUMENTS],
    queryFn: async () => {
      const response = await GetFetch(urls.INTRANET.GET_ACCEPTED_DOCUMENTS);

      return response.data;
    },
  });
};
