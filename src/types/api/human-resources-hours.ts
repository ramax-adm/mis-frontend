export interface ExtraHoursByEmployeeItem {
  employeeName: string
  department: string
  extraHours: string
  extraHoursInSeconds: number
}

export interface HumanResourceHoursResumeTotalsResponse {
  normalHours: string
  extraHours: string
  halfExtraHours: string
  fullExtraHours: string
  hoursOff: string
  absenceHours: string
}

export interface HumanResourceHoursResumeDayResponse {
  extraHoursByDepartment: {
    [k: string]: {
      quantity: string
      quantityInSeconds: number
      percent: number
    }
  }

  extraHoursByEmployee: ExtraHoursByEmployeeItem[]
}

export interface HistoryExtraHoursByEmployeeItem {
  employeeName: string
  department: string
  extraHours: string
  extraHoursInSeconds: number
}

export interface HistoryAbsenceHoursByEmployeeItem {
  employeeName: string
  department: string
  absenceHours: string
  absenceHoursInSeconds: number
}

export interface HistoryExtraHoursByDepartmentItem {
  date: Date
  department: string
  extraHours: string
  extraHoursInSeconds: number
}

export interface HistoryAbsenceHoursByDepartmentItem {
  date: Date
  department: string
  absenceHours: string
  absenceHoursInSeconds: number
}

export interface HistoryHoursRelationByDepartmentItem {
  department: string
  extraHours: string
  extraHoursInSeconds: number
  absenceHours: string
  absenceHoursInSeconds: number
}

export interface HumanResourceHoursResumeHistoryResponse {
  extraHoursByDay: {
    [k: string]: {
      quantity: string
      quantityInSeconds: number
    }
  }
  extraHoursByEmployee: HistoryExtraHoursByEmployeeItem[]
  absenceHoursByEmployee: HistoryAbsenceHoursByEmployeeItem[]
  extraHoursByDepartmentByDay: HistoryExtraHoursByDepartmentItem[]
  absenceHoursByDepartmentByDay: HistoryAbsenceHoursByDepartmentItem[]
  historyHoursRelationByDepartment: {
    [k: string]: {
      extraHours: string
      extraHoursInSeconds: number
      absenceHours: string
      absenceHoursInSeconds: number
    }
  }
}

export interface GetHumanResourceHoursResumeDataResponse {
  totals: HumanResourceHoursResumeTotalsResponse
  day: HumanResourceHoursResumeDayResponse
  history: HumanResourceHoursResumeHistoryResponse
}

export interface GetHumanResourceHoursLastUpdatedAtResponse {
  parsedUpdatedAt: string
  updatedAt: Date
}

/***********************ANALITICO*****************************/
export interface HumanResourceHoursAnalyticalOriginalDataItem {
  date: Date
  integrationSystem: string
  companyCode: string
  payrollNumber: string
  employeeName: string
  department: string
  normalHours: string
  hoursOff: string
  absenceHours: string
  halfExtraHours: string
  fullExtraHours: string
  createdAt: Date
}

export interface HumanResourceHoursAnalyticalParsedDataItem {
  date: string
  integrationSystem: string
  companyCode: string
  payrollNumber: string
  employeeName: string
  department: string
  normalHours: string
  hoursOff: string
  absenceHours: string
  halfExtraHours: string
  fullExtraHours: string
  createdAt: string
}
export interface GetHumanResourceHoursAnalyticalDataResponse {
  originalData: HumanResourceHoursAnalyticalOriginalDataItem[]
  parsedData: HumanResourceHoursAnalyticalParsedDataItem[]
  totals: {
    normalHours: string
    extraHours: string
    halfExtraHours: string
    fullExtraHours: string
    hoursOff: string
    absenceHours: string
  }
}

/************************ XLSX ******************************/
export interface PostExportHumanResourceHoursXlsxRequest {
  filters: {
    startDate?: Date | null
    endDate?: Date | null
    companyCode?: string
    employeeName?: string | null
    department?: string | null
  }
}
