export type UploadFile = {
  id: string
  name: string
  type: UploadTypeEnum
  inputs: UploadFileInputs
  apiUrl: string
  createdAt: Date
}

export type UploadFileInputType = {
  id: string
  label: string
  type: string
}

export type UploadFileInput = {
  id: string
  label: string
  type: string
}

export type UploadFileInputs = UploadFileInput[]

export enum UploadTypeEnum {
  EXTERNAL_BATCHES = 'external-batches',
}

export enum UploadInputIdEnum {
  COMPANY = 'companyCode',
}
