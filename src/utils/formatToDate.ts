import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export function formatToDate(value: Date) {
  return dayjs(value).add(3, 'hour').format('DD/MM/YYYY')
}

export function formatToDateMinified(value: Date) {
  return dayjs(value).format('DD/MM')
}

export function formatToInternationalDate(date: Date | Dayjs | null) {
  if (!date) date = new Date()
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDateToDDMMYYYY = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} - ${hour}:${minute}`
}

export const getHHMMSSFormat = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const pad = (num: number) => String(num).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}
