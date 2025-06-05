import { COLORS } from '@/constants/styles/colors'
import { Box, BoxProps, Typography } from '@mui/material'

interface FreightsCustomizedCardProps extends BoxProps {
  cardTitle: string
}
export function FreightsCustomizedCard(props: FreightsCustomizedCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        border: `1px solid ${COLORS.BORDAS}`,
        ...props?.sx,
      }}
    >
      <Box sx={{ width: '100%', borderBottom: `1px` }}>
        <Typography fontWeight={900} fontSize={'12px'} color={COLORS.TEXTO}>
          {props.cardTitle}
        </Typography>
      </Box>
      {props.children}
    </Box>
  )
}
