/* eslint-disable no-inline-comments */
// utils.ts
import { ChangeEvent } from 'react'

export function formatCurrency(value: number) {
  if (isNaN(value)) {
    return ''
  }
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatToCurrencyMask(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: { onChange: (value: number) => void; value: string },
) {
  const rawValue = event.target.value.replace(/[^\d]/g, '') // Remove caracteres não numéricos
  const numericValue = parseFloat(rawValue) / 100 // Converte para número
  const formattedValue = formatCurrency(numericValue) // Formata o valor

  // Atualiza o campo com o valor numérico e formatado
  field.onChange(numericValue) // Armazena o valor numérico
  field.value = formattedValue // Exibe o valor formatado
}
