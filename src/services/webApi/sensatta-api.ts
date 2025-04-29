import { GetFetch, PostFetch, urls } from '../axios/api-base'

export async function GetProductClassificationTypes() {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCT_CLASSIFICATION_TYPES)

  return response.data
}

export async function PostSyncStockWithSensatta() {
  const response = await PostFetch(urls.SENSATTA.POST_SYNC_STOCK)

  return response.data
}

export async function GetCompanies() {
  const response = await GetFetch(urls.SENSATTA.GET_COMPANIES)

  return response.data
}

export async function GetProducts() {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCTS)

  return response.data
}

export async function GetProductLines() {
  const response = await GetFetch(urls.SENSATTA.GET_PRODUCTS_LINES)

  return response.data
}
