import { GetFetch, urls } from '../axios/api-base'

export async function GetHumanResourcesHoursAvailableDates({
  companyCode,
}: {
  companyCode: string
}) {
  const response = await GetFetch(urls.HUMAN_RESOURCES.GET_DATES, { params: { companyCode } })
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
