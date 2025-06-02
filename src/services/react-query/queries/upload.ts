import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetUploadFiles, GetUploadFileWithInputs } from '@/services/webApi/upload-api'
import { UploadFile } from '@/types/upload'
import { GetUploadFilesResponse } from '@/types/api/upload'
import { UseGetUploadFileWithInputsRequest } from '@/types/queries/upload'

export const useGetUploadFiles = () => {
  return useQuery<UploadFile[]>({
    queryKey: [queryKeys.UPLOAD.FIND_ALL],
    queryFn: async () => {
      const response = await GetUploadFiles()
      return response
    },
  })
}

export const useGetUploadFileWithInputs = ({ type }: UseGetUploadFileWithInputsRequest) => {
  return useQuery<GetUploadFilesResponse>({
    queryKey: [queryKeys.UPLOAD.FIND_BY_TYPE.concat(type)],
    queryFn: async () => {
      const response = await GetUploadFileWithInputs({ type })
      return response
    },
    enabled: !!type,
  })
}
