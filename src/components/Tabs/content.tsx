import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'

interface TabsContentProps extends BoxProps {
  children: ReactNode
}
export function TabsContent({ children, ...props }: TabsContentProps) {
  return <Box>{children}</Box>
}
