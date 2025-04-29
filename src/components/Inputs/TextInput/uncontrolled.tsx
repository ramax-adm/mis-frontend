import React from 'react'
import { FormControl, SxProps, TextField } from '@mui/material'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  label: string
  control?: Control<T>
  error?: FieldError
  sx?: SxProps
  size?: 'small' | 'medium'
  shrink?: boolean
}

export function TextInput<T extends FieldValues>({
  name,
  label,
  control,
  error,
  sx,
  shrink,
  size = 'medium',
}: Props<T>) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              label={label}
              helperText={error?.message}
              size={size}
              InputLabelProps={{
                shrink,
              }}
            />
          )
        }}
      />
    </FormControl>
  )
}
