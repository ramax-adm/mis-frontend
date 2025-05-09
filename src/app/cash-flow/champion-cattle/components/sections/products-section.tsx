import { Box, Typography } from '@mui/material'
import { AllMarketsProductsTable } from '../tables/all-markets-products-table'
import { MeProductsTable } from '../tables/me-products-table'
import { MiProductsTable } from '../tables/mi-products-table'

export function ProductsSection() {
  return (
    <Box>
      <Typography variant='h6' fontWeight={700} fontSize={'18px'}>
        Resultados
      </Typography>
      <AllMarketsProductsTable />
      <MeProductsTable />
      <MiProductsTable />
    </Box>
  )
}
