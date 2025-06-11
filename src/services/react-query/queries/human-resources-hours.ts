import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetHumanResourcesHoursAvailableDates,
  GetHumanResourcesHoursDepartments,
  GetHumanResourcesHoursEmployees,
  GetHumanResourcesHoursResumeData,
} from '@/services/webApi/human-resources-hours-api'
import { GetHumanResourceHoursResumeDataResponse } from '@/types/api/human-resources-hours'

export const useGetHumanResourcesHoursAvailableDates = ({
  companyCode,
}: {
  companyCode: string
}) => {
  return useQuery<{ date: Date }[]>({
    queryKey: [queryKeys.HUMAN_RESOURCES.GET_DATES, companyCode],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursAvailableDates({ companyCode })
      return response
    },
  })
}

export const useGetHumanResourcesHoursDepartments = ({ companyCode }: { companyCode: string }) => {
  return useQuery<{ department: string }[]>({
    queryKey: [queryKeys.HUMAN_RESOURCES.GET_DEPARTMENTS, companyCode],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursDepartments({ companyCode })
      return response
    },
  })
}

export const useGetHumanResourcesHoursEmployees = ({
  companyCode,
  department = '',
}: {
  companyCode: string
  department?: string
}) => {
  return useQuery<{ employeeName: string }[]>({
    queryKey: [queryKeys.HUMAN_RESOURCES.GET_EMPLOYEES, companyCode, department],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursEmployees({ companyCode, department })
      return response
    },
  })
}

export const useGetHumanResourceHoursResumeData = ({
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
}) => {
  return useQuery<GetHumanResourceHoursResumeDataResponse>({
    queryKey: [
      queryKeys.HUMAN_RESOURCES.GET_RESUME_DATA,
      startDate,
      endDate,
      companyCode,
      employeeName,
      department,
    ],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursResumeData({
        startDate,
        endDate,
        companyCode,
        employeeName,
        department,
      })
      return response
    },
    enabled: !!companyCode,
  })
}
