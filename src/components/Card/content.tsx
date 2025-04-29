import { Box, BoxProps } from '@mui/material'

interface CardContentProps extends BoxProps {}
export function CardContent({ children, ...props }: CardContentProps) {
  return <Box {...props}>{children}</Box>
}
