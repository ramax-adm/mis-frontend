import { GetFetch, urls } from "@/services/axios/api-base";
import { queryKeys } from "../query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  GetFreightCompaniesResponseItem,
  GetFreightCompanyAnttConsultationResponse,
} from "@/types/api/freight-companies";

export const useGetFreightCompaniesFilters = () => {
  return useQuery<any[]>({
    queryKey: [
      queryKeys.FREIGHTS.FREIGHT_COMPANIES.GET_FREIGHT_COMPANIES_FILTERS,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FREIGHTS.FREIGHT_COMPANIES.GET_FREIGHT_COMPANIES_FILTERS
      );
      return response.data;
    },
  });
};

export const useGetFreightCompaniesWithConsultation = () => {
  return useQuery<GetFreightCompaniesResponseItem[]>({
    queryKey: [queryKeys.FREIGHTS.FREIGHT_COMPANIES.GET_FIND_ALL],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FREIGHTS.FREIGHT_COMPANIES.GET_FIND_ALL
      );
      return response.data;
    },
  });
};

export const useGetFreightCompanyAnttConsultation = ({
  sensattaCode,
}: {
  sensattaCode?: string;
}) => {
  return useQuery<GetFreightCompanyAnttConsultationResponse>({
    queryKey: [
      queryKeys.FREIGHTS.FREIGHT_COMPANIES.GET_FIND_ONE.concat(
        sensattaCode ?? ""
      ),
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.FREIGHTS.FREIGHT_COMPANIES.GET_FIND_ONE.replace(
          ":id",
          sensattaCode ?? ""
        )
      );
      return response.data;
    },
    enabled: !!sensattaCode,
  });
};
