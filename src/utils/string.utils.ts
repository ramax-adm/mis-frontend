export function capitalizeFirstLetter(word: string) {
  if (word.length === 0) return word // Se a palavra for vazia, retorna a palavra sem alterações
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
