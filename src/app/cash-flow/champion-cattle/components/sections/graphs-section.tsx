import { Box, Typography } from '@mui/material'
import { ProductMarketRelationGraph } from '../graphs/product-market-relation-graph'

export function GraphsSection() {
  return (
    <Box
      sx={{
        marginTop: 6,
      }}
    >
      <Typography variant='h6' fontWeight={700} fontSize={'18px'}>
        Graficos
      </Typography>
      <ProductMarketRelationGraph />
    </Box>
  )
}
