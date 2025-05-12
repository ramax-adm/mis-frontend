import { Box, Typography } from '@mui/material'
import { ProductMarketRelationGraph } from '../graphs/product-market-relation-graph'
import { PostSimulateCashFlowChampionCattleResponse } from '@/types/api/cash-flow-champion-cattle'

interface GraphsSectionProps {
  data: PostSimulateCashFlowChampionCattleResponse | undefined
}

export function GraphsSection({ data }: GraphsSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 6,
        width: { xs: '350px', sm: '98%' },
      }}
    >
      <Typography variant='h6' fontWeight={700} fontSize={'18px'}>
        Graficos
      </Typography>
      <ProductMarketRelationGraph dailyProducts={data?.day} />
    </Box>
  )
}
