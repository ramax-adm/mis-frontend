export function removeCurrencyFormat(value: string) {
  if (!value) return 0

  return parseFloat(
    value.replace(/R\$/, '').replaceAll('.', 'n').replace(',', '.').replaceAll('n', ''),
  )
}
