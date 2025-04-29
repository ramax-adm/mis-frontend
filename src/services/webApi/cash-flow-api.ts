import {
  GetUserSimulationsRequest,
  PostExportXlsxRequest,
  PostSimulateDataRequest,
} from '@/types/api/cash-flow'
import { DeleteFetch, GetFetch, PostFetch, urls } from '../axios/api-base'

export async function PostSimulateCashFlow(request: PostSimulateDataRequest) {
  const response = await PostFetch(urls.CASH_FLOW.POST_SIMULATE_CASH_FLOW, request)

  return response?.data
}

export async function PostSaveUserSimulation(request: PostSimulateDataRequest) {
  const response = await PostFetch(urls.CASH_FLOW.POST_SAVE_USER_SIMULATION, request)

  return response?.data
}

export async function DeleteUserSimulation(id: string) {
  console.log({ msg: 'deleting', id })

  const response = await DeleteFetch(urls.CASH_FLOW.DELETE_USER_SIMULATION.concat(`/${id}`))

  return response?.data
}

export async function DeleteManyUserSimulations(date: string) {
  const response = await DeleteFetch(urls.CASH_FLOW.DELETE_MANY_USER_SIMULATIONS, {
    params: { date },
  })

  return response?.data
}

export async function GetTiposArrend() {
  const response = await GetFetch(urls.CASH_FLOW.GET_ARREND_TYPES)

  return response?.data
}

export async function GetUserSimulations({ date }: GetUserSimulationsRequest) {
  const response = await GetFetch(urls.CASH_FLOW.GET_USER_SIMULATIONS, { params: { date } })

  return response?.data
}

export async function PostExportXlsx({ id, values }: PostExportXlsxRequest) {
  const query = `?simulation-id=${id ?? ''}`
  const response = await PostFetch(
    urls.CASH_FLOW.EXPORT_XLSX.concat(query),
    {
      ...values,
    },
    {
      responseType: 'blob',
    },
  )

  return response
}
