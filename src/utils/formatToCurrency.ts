export function formatToCurrency(value?: number, defaultValue = 'Não Informado') {
  if (!value && value !== 0) {
    return defaultValue
  }

  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
