import { Box, BoxProps } from '@mui/material'

interface CardFooterProps extends BoxProps {}
export function CardFooter({ children, ...props }: CardFooterProps) {
  return (
    <Box sx={{ width: '100%', ...props?.sx }} {...props}>
      {children}
    </Box>
  )
}
