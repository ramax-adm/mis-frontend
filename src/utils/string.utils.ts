export function stringSubstr(string: string, length: number) {
  return string.length > length
    ? string.substring(0, length - 2).concat("...")
    : string;
}

export function capitalizeFirstLetter(word: string) {
  if (word.length === 0) return word; // Se a palavra for vazia, retorna a palavra sem alterações
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function parse(raw: string) {
  return JSON.parse(raw);
}

export function safeParse(raw?: string) {
  if (!raw) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(raw);

    return parsedValue;
  } catch {
    return {};
  }
}

export function stringify(raw: Object) {
  return JSON.stringify(raw);
}

export function toCurrency(value?: number) {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export function toPercent(value?: number) {
  if (!value) {
    return "0 %";
  }
  return (value * 100)
    .toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .concat("%");
}

export function toLocaleString(value: number, nb: number = 0) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: nb,
    maximumFractionDigits: nb,
  });
}
