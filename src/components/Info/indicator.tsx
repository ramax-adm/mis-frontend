import { Box, BoxProps, Typography } from '@mui/material'

interface IndicatorProps extends BoxProps {
  title: string
  value: string
}
export function Indicator({ title, value, ...props }: IndicatorProps) {
  return (
    <Box
      sx={{
        width: '150px',
        paddingX: '6px',
        paddingY: 0.5,
        borderRadius: 1,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        ...props.sx,
      }}
    >
      <Typography variant='caption' fontSize={'10px'}>
        {title}
      </Typography>
      <Typography variant='h6' fontSize={'20px'} fontWeight={900}>
        {value}
      </Typography>
    </Box>
  )
}
