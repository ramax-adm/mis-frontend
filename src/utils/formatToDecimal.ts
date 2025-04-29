export function formatDecimal(value: string) {
  const sanitizedValue = value.replace(/[^0-9]/g, '')
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(sanitizedValue) / 100)
  return formattedValue
}
