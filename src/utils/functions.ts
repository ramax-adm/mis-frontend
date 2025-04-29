'use client'

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const maskDocument = (value: string) => {
  if ((value as string).length < 12) {
    return cpfMask(value as string)
  } else {
    return cnpjMask(value as string)
  }
}

export const removeCpfMask = (value: string) => {
  return value.replace(/\D/g, '')
}

export const removePhoneMask = (value: string) => {
  return value.replace(/\D/g, '')
}

export const replaceDotForComma = (value: string) => {
  return value.replace('.', ',')
}
