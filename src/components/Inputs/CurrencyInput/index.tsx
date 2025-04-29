import React from 'react'
import { FormControl, InputAdornment, TextField } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'
import { formatToCurrencyMask } from '@/utils/new-format-to-currency-mask'

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
              helperText={error?.message}
              onChange={(event) => formatToCurrencyMask(event, field)}
              error={!!error}
              InputProps={{
                endAdornment: <InputAdornment position='end'>R$</InputAdornment>,
              }}
            />
          )
        }}
      />
    </FormControl>
  )
}
