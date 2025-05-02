export function capitalizeFirstLetter(word: string) {
  if (word.length === 0) return word // Se a palavra for vazia, retorna a palavra sem alterações
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export function parse(raw: string) {
  return JSON.parse(raw)
}

export function safeParse(raw?: string) {
  if (!raw) {
    return {}
  }

  try {
    const parsedValue = JSON.parse(raw)

    return parsedValue
  } catch {
    return {}
  }
}

export function stringify(raw: Object) {
  return JSON.stringify(raw)
}
