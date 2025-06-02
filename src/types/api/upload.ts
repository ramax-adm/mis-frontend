import { UploadTypeEnum, UploadFile } from '../upload'

export interface GetUploadFilesRequest {
  type: UploadTypeEnum
}

export interface GetUploadFilesResponse {
  uploadFile: UploadFile
  inputs: {
    id: string
    type: string
    label: string
    options: {
      key: string
      label: string
      value: string | number
    }[]
  }[]
}
