export function formatToPercent(value: number) {
  return value.toString().concat(' %')
}

export function formatToPercentMask(value: number | string) {
  if (!value) return ''

  const inputValue = typeof value === 'string' ? value : value.toString()
  const rawValue = inputValue.replace(/[^\d]/g, '')

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(rawValue) / 100)
}
