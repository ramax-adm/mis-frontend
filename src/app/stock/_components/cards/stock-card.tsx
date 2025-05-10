import { Card } from '@/components/Card'
import { StockTable } from '../tables/stock-table'
import { GetStockByCompanyResponse } from '@/types/api/stock'
import { Box, Typography } from '@mui/material'

interface StockCardProps {
  data: GetStockByCompanyResponse[]
}
export function StockCard({ data }: StockCardProps) {
  return (
    <Box
      sx={{
        width: '100',
        height: '520px',
        border: 0,
        boxShadow: 'none',
        gap: 1,
        padding: 0,
      }}
    >
      <Typography variant='body2' fontWeight={700} color={'#3E63DD'}>
        Estoque
      </Typography>
      <StockTable data={data} />
    </Box>
  )
}
