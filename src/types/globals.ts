export type BaseEntity = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  createdBy: string
  updatedBy: string
  deletedBy: string
}
export type PaginatedResponse<T> = {
  data: T[]
  page: number
  limit: number
  total: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  lastPage: number
}

export type PaginationRequest = {
  page: number
  limit?: number
}

export type ApiErrorResponse = {
  message: string
  error: string
  statusCode: number
}
