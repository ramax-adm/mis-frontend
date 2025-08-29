import { QueryClient } from "@tanstack/react-query";
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
