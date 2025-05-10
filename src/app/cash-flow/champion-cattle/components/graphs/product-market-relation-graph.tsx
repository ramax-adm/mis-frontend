import { COLORS } from '@/constants/styles/colors'
import { Box, Typography } from '@mui/material'

export function ProductMarketRelationGraph() {
  return (
    <Box>
      <Typography variant='h6' fontWeight={700}>
        Relação de R$/KG ME/MI
      </Typography>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(62, 99, 221, 0.2)',
          height: '300px',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Typography variant='h1' fontSize={'30px'} fontWeight={700}>
          EM CONSTRUÇÃO
        </Typography>
      </Box>
    </Box>
  )
}
