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
  extraHoursByDay: {
    [k: string]: {
      quantity: string
      quantityInSeconds: number
    }
  }
  extraHoursByEmployee: ExtraHoursByEmployeeItem[]
}

export interface HistoryExtraHoursByEmployeeItem {
  employeeName: string
  department: string
  extraHours: string
}

export interface HistoryAbsenceHoursByEmployeeItem {
  employeeName: string
  department: string
  absenceHours: string
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
export interface HumanResourceHoursResumeHistoryResponse {
  extraHoursByEmployee: HistoryExtraHoursByEmployeeItem[]
  absenceHoursByEmployee: HistoryAbsenceHoursByEmployeeItem[]
  extraHoursByDepartmentByDay: HistoryExtraHoursByDepartmentItem[]
  absenceHoursByDepartmentByDay: HistoryAbsenceHoursByDepartmentItem[]
}

export interface GetHumanResourceHoursResumeDataResponse {
  totals: HumanResourceHoursResumeTotalsResponse
  day: HumanResourceHoursResumeDayResponse
  history: HumanResourceHoursResumeHistoryResponse
}
