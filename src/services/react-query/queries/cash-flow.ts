import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetTiposArrend,
  GetUserSimulations,
} from "@/services/webApi/cash-flow-api";
import {
  GetArrendTypesResponse,
  GetUserSimulationsResponse,
} from "@/types/api/cash-flow";
import { UseGetUserSimulationsRequest } from "@/types/queries/cash-flow";

export const useGetArrendTypes = () => {
  return useQuery<GetArrendTypesResponse[]>({
    queryKey: [queryKeys.CASH_FLOW.GET_ARREND_TYPES],
    queryFn: async () => {
      const response = await GetTiposArrend();

      return response;
    },
  });
};

export const useGetUserSimulations = ({
  date,
  fetchQuery,
}: UseGetUserSimulationsRequest) => {
  return useQuery<GetUserSimulationsResponse>({
    queryKey: [queryKeys.CASH_FLOW.GET_USER_SIMULATIONS, date],
    queryFn: async () => {
      const response = await GetUserSimulations({ date });

      return response;
    },
    enabled: !!date && fetchQuery,
  });
};
