export function toLocaleString(value: number, nb: number = 0) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: nb,
    maximumFractionDigits: nb,
  })
}

export function fromLocaleStringToNumber(value: string) {
  if (!value) return 0
  const normalized = value.replace(/\./g, '').replace(',', '.')
  return Number(normalized)
}
