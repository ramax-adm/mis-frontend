import { GetProductLinesRequest } from '@/types/api/stock'
import { GetFetch, PostFetch, urls } from '../axios/api-base'

export async function GetProductClassificationTypes() {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCT_CLASSIFICATION_TYPES)

  return response.data
}

export async function PostSyncStockWithSensatta() {
  const response = await PostFetch(urls.SENSATTA.POST_SYNC_STOCK)

  return response.data
}

export async function PostSyncFreightsWithSensatta() {
  const response = await PostFetch(urls.SENSATTA.POST_SYNC_FREIGHTS)

  return response.data
}

export async function GetCompanies() {
  const response = await GetFetch(urls.SENSATTA.GET_COMPANIES)

  return response.data
}

export async function GetCompany(id: string) {
  const response = await GetFetch(urls.SENSATTA.GET_COMPANIES.concat(`/${id}`))

  return response.data
}

export async function GetProducts() {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCTS)

  return response.data
}

export async function GetFreightsCompanies() {
  const response = await GetFetch(urls.SENSATTA.GET_FREIGHT_COMPANIES)

  return response.data
}

export async function GetProductLines({ market }: GetProductLinesRequest) {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCTS_LINES, { params: { market } })

  return response.data
}
