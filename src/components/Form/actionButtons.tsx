import { Box, BoxProps, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface FormActionButtonsProps extends BoxProps {
  children: ReactNode
}
export function FormActionButtons({ children, ...props }: FormActionButtonsProps) {
  return (
    <Box
      component='div'
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: '8px',
        borderRadius: '0 0 8px 8px',
        backgroundColor: '#fff',
        ...props?.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
