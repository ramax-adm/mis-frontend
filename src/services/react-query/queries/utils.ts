import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetSyncedFileEntities, GetSyncedFiles } from '@/services/webApi/utils-api'
import { GetSyncedFilesResponse } from '@/types/api/utils'

export const useGetSyncedFiles = ({
  date,
  entity,
}: {
  date?: Date | null
  entity?: string | null
}) => {
  return useQuery<GetSyncedFilesResponse[]>({
    queryKey: [queryKeys.UTILS.GET_SYNCED_FILES, date, entity],
    queryFn: async () => {
      return await GetSyncedFiles({ date, entity })
    },
  })
}

export const useGetSyncedFileEntities = () => {
  return useQuery<{ label: string; key: string; value: string }[]>({
    queryKey: [queryKeys.UTILS.GET_SYNCED_FILE_ENTITIES],
    queryFn: async () => {
      return await GetSyncedFileEntities()
    },
  })
}
