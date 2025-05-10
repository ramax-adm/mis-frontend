import { DeleteFetch, GetFetch, PostFetch, urls } from '../axios/api-base'
import {
  PostSimulateCashFlowChampionCattleRequest,
  PostExportXlsxRequest,
} from '@/types/api/cash-flow-champion-cattle'

export async function PostSimulateCashFlowChampionCattle(
  request: PostSimulateCashFlowChampionCattleRequest,
) {
  const response = await PostFetch(
    urls.CASH_FLOW_CHAMPION_CATTLE.POST_SIMULATE_CASH_FLOW_CHAMPION_CATTLE,
    request,
  )

  return response?.data
}

export async function PostExportXlsx({ id, values }: PostExportXlsxRequest) {
  const query = `?simulation-id=${id ?? ''}`
  const dto = { ...values }
  const options = {
    responseType: 'blob',
  }

  const response = await PostFetch(
    urls.CASH_FLOW_CHAMPION_CATTLE.EXPORT_XLSX.concat(query),
    dto,
    options,
  )

  return response
}
