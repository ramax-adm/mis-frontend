import { UploadTypeEnum, UploadFile } from '../upload'

export interface GetUploadFilesRequest {
  type: UploadTypeEnum
}

export interface GetUploadFilesResponse {
  uploadFile: UploadFile
  inputs: {
    key: string
    label: string
    value: string | number
  }[]
}
