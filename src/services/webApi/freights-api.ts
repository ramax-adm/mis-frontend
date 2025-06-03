import {
  GetAnalyticalCattlePurchaseFreightsRequest,
  PostExportCattlePurchaseFreightsXlsxRequest,
} from '@/types/api/freights'
import { GetFetch, PostFetch, urls } from '../axios/api-base'

export async function GetFreightsLastUpdatedAt() {
  const response = await GetFetch(urls.FREIGHTS.GET_LAST_UPDATED_AT)

  return response.data
}

export async function GetCattleFreightsStatuses() {
  const response = await GetFetch(urls.FREIGHTS.GET_CATTLE_PURCHASE_FREIGHTS_STATUSES)

  return response.data
}

export async function GetAnalyticalCattlePurchaseFreights({
  startDate,
  endDate,
  companyCode,
  status,
  freightCompany,
}: GetAnalyticalCattlePurchaseFreightsRequest) {
  const response = await GetFetch(urls.FREIGHTS.GET_ANALYTICAL_CATTLE_PURCHASE_FREIGHTS, {
    params: { startDate, endDate, companyCode, status, freightCompany },
  })

  return response.data
}

export async function PostExportCattlePurchaseFreightsXlsx({
  filters,
}: PostExportCattlePurchaseFreightsXlsxRequest) {
  const response = await PostFetch(
    urls.FREIGHTS.POST_EXPORT_XLSX,
    { filters },
    {
      responseType: 'blob',
    },
  )

  return response
}
