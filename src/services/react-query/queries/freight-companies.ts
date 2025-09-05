import { GetFetch, urls } from "@/services/axios/api-base";
import { queryKeys } from "../query-keys";
import { useQuery } from "@tanstack/react-query";
import { GetFreightCompaniesResponseItem } from "@/types/api/freight-companies";

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
