import React from 'react'
import { FormControl, SxProps, TextField } from '@mui/material'
import { FieldError } from 'react-hook-form'

type Props = {
  name: string
  label: string
  value: number
  setValue: (state: number) => void
  error?: FieldError
  sx?: SxProps
  size?: 'small' | 'medium'
}

export function NumberInputControlled({
  name,
  label,
  value,
  setValue,
  sx,
  size = 'medium',
}: Props) {
  return (
    <FormControl fullWidth sx={sx} size={size}>
      <TextField
        name={name}
        label={label}
        type='number'
        value={value}
        onChange={(e) => setValue(Number(e.currentTarget.value))}
        size={size}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  )
}
