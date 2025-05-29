import { GetAnalyticalCattlePurchaseFreightsRequest } from '@/types/api/freights'
import { GetFetch, urls } from '../axios/api-base'

export async function GetFreightsLastUpdatedAt() {
  const response = await GetFetch(urls.FREIGHTS.GET_LAST_UPDATED_AT)

  return response.data
}

export async function GetAnalyticalCattlePurchaseFreights({
  startDate,
  endDate,
  companyCode,
}: GetAnalyticalCattlePurchaseFreightsRequest) {
  const response = await GetFetch(urls.FREIGHTS.GET_ANALYTICAL_CATTLE_PURCHASE_FREIGHTS, {
    params: { startDate, endDate, companyCode },
  })

  return response.data
}
