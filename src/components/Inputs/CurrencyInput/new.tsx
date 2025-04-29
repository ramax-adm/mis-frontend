/* eslint-disable no-inline-comments */
import React from 'react'
import { FormControl, TextField } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'
import { formatCurrency, formatToCurrencyMask } from '@/utils/new-format-to-currency-mask'

interface FloatInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  error?: FieldError
  control?: Control<T>
}

export function CurrencyInput<T extends FieldValues>({
  name,
  label,
  error,
  control,
}: FloatInputProps<T>) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label={label}
              variant='outlined'
              fullWidth
              helperText={error && error.message}
              value={field.value !== undefined ? formatCurrency(field.value) : ''} // Formata o valor para exibição
              onChange={(event) => formatToCurrencyMask(event, field)} // Aplica a máscara durante a mudança
            />
          )
        }}
      />
    </FormControl>
  )
}
