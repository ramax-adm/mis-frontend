import { Company } from "@/types/api/sensatta";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetFetch, urls } from "@/services/axios/api-base";

export const useGetUserCompanies = ({
  isConsideredOnStock,
}: {
  isConsideredOnStock?: boolean;
}) => {
  return useQuery<Company[]>({
    queryKey: [
      queryKeys.USERS.USER_COMPANIES.GET_FIND_BY_USER,
      isConsideredOnStock,
    ],
    queryFn: async () => {
      const response = await GetFetch(
        urls.USER.USER_COMPANIES.GET_FIND_BY_USER,
        { params: { isConsideredOnStock } }
      );

      return response.data;
    },
  });
};
