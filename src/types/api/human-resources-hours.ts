export interface ExtraHoursByEmployeeItem {
  employeeName: string
  department: string
  extraHours: string
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

export interface HumanResourceHoursResumeHistoryResponse {
  extraHoursByEmployee: {
    employeeName: string
    department: string
    extraHours: string
  }[]
  absenceHoursByEmployee: {
    employeeName: string
    department: string
    absenceHours: string
  }[]
  extraHoursByDepartment: {
    date: Date
    department: string
    extraHours: string
    extraHoursInSeconds: number
  }[]
  absenceHoursByDepartment: {
    date: Date
    department: string
    absenceHours: string
    absenceHoursInSeconds: number
  }[]
}

export interface GetHumanResourceHoursResumeDataResponse {
  totals: HumanResourceHoursResumeTotalsResponse
  day: HumanResourceHoursResumeDayResponse
  history: HumanResourceHoursResumeHistoryResponse
}
