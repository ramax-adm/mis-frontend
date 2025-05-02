import { Card } from '@/components/Card'
import { GetToExpiresByCompanyResponse } from '@/types/api/stock'
import { StockToExpiresTable } from '../tables/stock-to-expires-table'

interface StockToExpireCardProps {
  data: GetToExpiresByCompanyResponse[]
}
export function StockToExpireCard({ data }: StockToExpireCardProps) {
  return (
    <Card.Root
      sx={{ width: '100', height: '480px', border: 0, boxShadow: 'none', gap: 1, padding: 0 }}
    >
      <Card.Title>Vencimentos (FIFO)</Card.Title>
      <Card.Content>
        <StockToExpiresTable data={data} />
      </Card.Content>
    </Card.Root>
  )
}
