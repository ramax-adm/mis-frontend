import { ApiCustomError } from "@/utils/api.utils";
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Os dados do cache são validos em até 5 minutos antes de serem revalidados
      staleTime: 1000 * 5 * 60,

      // Tenta até 3 vezes fazer requisições ao backend
      retry(failureCount) {
        if (failureCount >= 3) {
          return false;
        }
        return true;
      },
    },
    mutations: {},
  },
});

export function useApiQuery<TData = unknown>(
  options: UseQueryOptions<TData, ApiCustomError>
) {
  return useQuery<TData, ApiCustomError>(options);
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  options: UseMutationOptions<TData, ApiCustomError, TVariables>
) {
  return useMutation<TData, ApiCustomError, TVariables>(options);
}
