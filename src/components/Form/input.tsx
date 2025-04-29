import { FormControl, FormControlProps } from '@mui/material'
import { ReactNode } from 'react'

interface FormInputProps extends FormControlProps {
  fullWidth?: boolean
  children: ReactNode
}
export function FormInput({ fullWidth = true, children, ...props }: FormInputProps) {
  return (
    <FormControl fullWidth={fullWidth} {...props}>
      {children}
    </FormControl>
  )
}
