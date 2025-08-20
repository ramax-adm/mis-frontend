import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetAppWebpages } from "@/services/webApi/application-api";
import { AppWebpage } from "@/types/application";
import { setToLocalStorage } from "@/utils/storage.utils";
import { StorageKeysEnum } from "@/constants/app/storage";

export const useGetAppWebpages = () => {
  return useQuery<AppWebpage[]>({
    queryKey: [queryKeys.APPLICATION.WEBPAGES],
    queryFn: async () => {
      const response = await GetAppWebpages();

      setToLocalStorage(
        StorageKeysEnum.AUTH_SESSION_WEBPAGES,
        JSON.stringify(response)
      );
      return response;
    },
    enabled: typeof window !== "undefined",
  });
};
