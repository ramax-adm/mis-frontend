import { Box, Typography } from '@mui/material'
import { ProductMarketRelationGraph } from '../graphs/product-market-relation-graph'

export function GraphsSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 6,
        width: { xs: '350px', sm: '430px', md: '820px', xl: '98%' },
      }}
    >
      <Typography variant='h6' fontWeight={700} fontSize={'18px'}>
        Graficos
      </Typography>
      <ProductMarketRelationGraph />
    </Box>
  )
}
