import { GetAnalyticalAllStocksRequest, PostExportStockXlsxRequest } from '@/types/api/stock'
import { GetFetch, PostFetch, urls } from '../axios/api-base'

export async function GetAllStocks() {
  const response = await GetFetch(urls.STOCK.GET_ALL)

  return response.data
}

export async function GetAnalyticalAllStocks({ companyCode }: GetAnalyticalAllStocksRequest) {
  const response = await GetFetch(urls.STOCK.GET_ALL_ANALITICAL, {
    params: {
      companyCode,
    },
  })

  return response.data
}

export async function GetStockLastUpdatedAt() {
  const response = await GetFetch(urls.STOCK.GET_LAST_UPDATED_AT)

  return response.data
}

export async function PostExportStockXlsx({ exportType, filters }: PostExportStockXlsxRequest) {
  const response = await PostFetch(
    urls.STOCK.POST_EXPORT_XLSX,
    { exportType, filters },
    {
      responseType: 'blob',
    },
  )

  return response
}
