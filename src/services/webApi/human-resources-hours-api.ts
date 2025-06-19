import { PostExportHumanResourceHoursXlsxRequest } from '@/types/api/human-resources-hours'
import { GetFetch, PostFetch, urls } from '../axios/api-base'

export async function GetHumanResourcesHoursLastUpdatedAt() {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_LAST_UPDATED_AT)

  return response.data
}

export async function GetHumanResourcesHoursAvailableDates({
  companyCode,
}: {
  companyCode: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_DATES, { params: { companyCode } })
  return response.data
}

export async function GetHumanResourcesHoursDepartments({ companyCode }: { companyCode: string }) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_DEPARTMENTS, { params: { companyCode } })
  return response.data
}

export async function GetHumanResourcesHoursEmployees({
  companyCode,
  department = '',
}: {
  companyCode: string
  department?: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_EMPLOYEES, {
    params: { companyCode, department },
  })
  return response.data
}

export async function GetHumanResourcesHoursResumeData({
  startDate,
  endDate,
  companyCode,
  employeeName,
  department,
}: {
  startDate?: Date | null
  endDate?: Date | null
  companyCode?: string
  employeeName?: string
  department?: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_RESUME_DATA, {
    params: { startDate, endDate, companyCode, employeeName, department },
  })
  return response.data
}

export async function GetHumanResourcesHoursAnalyticalData({
  startDate,
  endDate,
  companyCode,
  employeeName,
  department,
}: {
  startDate?: Date | null
  endDate?: Date | null
  companyCode?: string
  employeeName?: string
  department?: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_ANALYTICAL_DATA, {
    params: { startDate, endDate, companyCode, employeeName, department },
  })
  return response.data
}

export async function GetHumanResourcesHoursAnalysesData({
  startDate,
  endDate,
  companyCode,
  employeeName,
  department,
}: {
  startDate?: Date | null
  endDate?: Date | null
  companyCode?: string
  employeeName?: string
  department?: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_ANALYSES_DATA, {
    params: { startDate, endDate, companyCode, employeeName, department },
  })
  return response.data
}

export async function PostExportHumanResourcesHoursXlsx({
  filters,
}: PostExportHumanResourceHoursXlsxRequest) {
  const response = await PostFetch(
    urls.HUMAN_RESOURCES.POST_EXPORT_XLSX,
    { filters },
    {
      responseType: 'blob',
    },
  )

  return response
}
