import { Card } from '@/components/Card'
import { StockTable } from '../tables/stock-table'
import { GetStockByCompanyResponse } from '@/types/api/stock'

interface StockCardProps {
  data: GetStockByCompanyResponse[]
}
export function StockCard({ data }: StockCardProps) {
  return (
    <Card.Root
      sx={{
        width: '100',
        height: '480px',
        border: 0,
        boxShadow: 'none',
        gap: 1,
        padding: 0,
      }}
    >
      <Card.Title>Estoque</Card.Title>
      <Card.Content>
        <StockTable data={data} />
      </Card.Content>
    </Card.Root>
  )
}
