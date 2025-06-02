import { UploadTypeEnum } from '@/types/upload'
import { GetFetch, PostFetch, urls } from '../axios/api-base'
import { GetUploadFilesRequest } from '@/types/api/upload'

export async function GetUploadFiles() {
  const response = await GetFetch(urls.UPLOAD.FIND_ALL)

  return response.data
}

export async function GetUploadFileWithInputs({ type }: GetUploadFilesRequest) {
  const response = await GetFetch(urls.UPLOAD.FIND_BY_NAME.concat(`/${type}`))

  return response.data
}

export async function PostUploadFile(type: string = '', formData: FormData) {
  const response = await PostFetch(urls.UPLOAD.POST_UPLOAD.concat(`/${type}`), formData)

  return response.data
}
