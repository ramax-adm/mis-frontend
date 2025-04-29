import React from 'react'
import { FormControl, TextField } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

/**
 * Definir parametros de entrada
 *
 * Definir componente com estilos (html + css)
 *
 * Fazer a logica misturando os parametros de entrada com o desejado
 *
 * No fim deve retornar o componente em si
 */

interface FloatInputProps<T extends FieldValues> {
  name: Path<T>
  label: string
  error?: FieldError
  control?: Control<T>
  readonly?: boolean
  endAdornment?: React.JSX.Element
  size?: 'small' | 'medium'
}

export function FloatInput<T extends FieldValues>({
  name,
  label,
  error,
  control,
  endAdornment,
  size = 'medium',
}: FloatInputProps<T>) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant='outlined'
            fullWidth
            type='text'
            size={size}
            value={field.value ? field.value.toString() : ''}
            onChange={(e) => field.onChange(e.target.value.replace(',', '.'))}
            error={!!error}
            helperText={error?.message}
            placeholder='Ex: 1,70'
            InputProps={{
              endAdornment,
            }}
          />
        )}
      />
    </FormControl>
  )
}
