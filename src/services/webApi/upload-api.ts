import { UploadTypeEnum } from '@/types/upload'
import { GetFetch, urls } from '../axios/api-base'
import { GetUploadFilesRequest } from '@/types/api/upload'

export async function GetUploadFiles() {
  const response = await GetFetch(urls.UPLOAD.FIND_ALL)

  return response.data
}

export async function GetUploadFileWithInputs({ type }: GetUploadFilesRequest) {
  const response = await GetFetch(urls.UPLOAD.FIND_BY_NAME.concat(`/${type}`))

  return response.data
}
