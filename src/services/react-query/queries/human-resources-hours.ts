import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import {
  GetHumanResourcesHoursAnalyticalData,
  GetHumanResourcesHoursAvailableDates,
  GetHumanResourcesHoursDepartments,
  GetHumanResourcesHoursEmployees,
  GetHumanResourcesHoursLastUpdatedAt,
  GetHumanResourcesHoursResumeData,
} from '@/services/webApi/human-resources-hours-api'
import {
  GetHumanResourceHoursAnalyticalDataResponse,
  GetHumanResourceHoursLastUpdatedAtResponse,
  GetHumanResourceHoursResumeDataResponse,
} from '@/types/api/human-resources-hours'

export const useGetHumanResourcesHoursLastUpdatedAt = () => {
  return useQuery<GetHumanResourceHoursLastUpdatedAtResponse>({
    queryKey: [queryKeys.HUMAN_RESOURCES.GET_LAST_UPDATED_AT],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursLastUpdatedAt()

      return response
    },
  })
}

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

export const useGetHumanResourceHoursAnalyticalData = ({
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
  console.log('here')

  return useQuery<GetHumanResourceHoursAnalyticalDataResponse>({
    queryKey: [
      queryKeys.HUMAN_RESOURCES.GET_ANALYTICAL_DATA,
      startDate,
      endDate,
      companyCode,
      employeeName,
      department,
    ],
    queryFn: async () => {
      const response = await GetHumanResourcesHoursAnalyticalData({
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
