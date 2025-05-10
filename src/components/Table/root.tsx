import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'

interface TableRootProps extends BoxProps {
  children: ReactNode
}
export function TableRoot({ children, ...props }: TableRootProps) {
  return (
    <Box
      sx={{
        marginY: '24px',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
