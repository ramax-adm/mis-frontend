import { Box, Typography } from '@mui/material'
import { AllMarketsProductsTable } from '../tables/all-markets-products-table'
import { MeProductsTable } from '../tables/me-products-table'
import { MiProductsTable } from '../tables/mi-products-table'
import { PostSimulateCashFlowChampionCattleResponse } from '@/types/api/cash-flow-champion-cattle'

interface ProductsSectionProps {
  data: PostSimulateCashFlowChampionCattleResponse | undefined
}
export function ProductsSection({ data }: ProductsSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
        width: { xs: '350px', sm: '98%' },
      }}
    >
      <AllMarketsProductsTable dailyProducts={data?.day} projectedProducts={data?.projected} />
      <MeProductsTable dailyProducts={data?.day} projectedProducts={data?.projected} />
      <MiProductsTable dailyProducts={data?.day} projectedProducts={data?.projected} />
    </Box>
  )
}
