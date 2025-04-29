import { ChangeEvent } from 'react'

export function formatToCurrencyMask(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: { onChange: (value: string) => void },
) {
  const rawValue = event.target.value.replace(/[^\d]/g, '')

  const numericValue = parseFloat(rawValue) / 100

  const formattedValue = formatCurrency(numericValue)
  field.onChange(formattedValue)
}

const formatCurrency = (value: number) => {
  if (isNaN(value)) {
    return ''
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
