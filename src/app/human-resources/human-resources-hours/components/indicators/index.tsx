import { Box, Typography } from '@mui/material'

interface HumanResourceHoursIndicatorProps {
  title: string
  value: any
}

export function HumanResourceHoursIndicator({ title, value }: HumanResourceHoursIndicatorProps) {
  let [hours, minutes] = ['', '']

  if (value) {
    ;[hours, minutes] = value?.split(':')
  } else {
    ;[hours, minutes] = ['00', '00']
  }

  return (
    <Box
      component={'span'}
      sx={{
        display: 'inline-flex',
        paddingY: 0.5,
        paddingX: 1,
        borderRadius: '6px',
        alignItems: 'center',
        backgroundColor: 'rgba(62, 99, 221, 0.2)',
      }}
    >
      <Typography fontWeight={500} fontSize={'12px'} color={'#3E63DD'}>
        {title}
      </Typography>
      <Typography fontWeight={800} fontSize={'14px'} color={'#3E63DD'}>
        {`${hours}h${minutes}m`}
      </Typography>
    </Box>
  )
}
