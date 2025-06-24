import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetAppWebpages } from '@/services/webApi/application-api'
import { AppWebpage } from '@/types/application'

export const useGetAppWebpages = () => {
  return useQuery<AppWebpage[]>({
    queryKey: [queryKeys.APPLICATION.WEBPAGES],
    queryFn: async () => await GetAppWebpages(),
  })
}
