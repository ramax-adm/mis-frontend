import { Box, BoxProps, Typography, TypographyProps } from '@mui/material'

interface CardTitleProps extends BoxProps {
  titleProps?: TypographyProps
}
export function CardTitle({ children, ...props }: CardTitleProps) {
  return (
    <Box sx={{ width: '100%', ...props?.sx }} {...props}>
      <Typography variant='body2' fontWeight={700} color={'#3E63DD'} {...props.titleProps}>
        {children}
      </Typography>
    </Box>
  )
}
