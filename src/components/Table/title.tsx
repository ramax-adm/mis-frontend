import { Typography, TypographyProps } from '@mui/material'

interface TableTitleProps extends TypographyProps {
  title: string
}
export function TableTitle({ title, ...props }: TableTitleProps) {
  return (
    <Typography
      variant='h4'
      sx={{
        margin: '20px',
        fontSize: '30px',
        fontWeight: '600',
        ...props.sx,
      }}
      {...props}
    >
      {title}
    </Typography>
  )
}
