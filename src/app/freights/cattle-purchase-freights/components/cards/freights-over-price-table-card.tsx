import { FreightOverPriceTableItem } from '@/types/api/freights'
import { FreightsCustomizedCard } from '../customized/card'
import { FreightsOverPriceTable } from '../tables/freights-over-table-price-table'
import { Alert } from '@mui/material'

interface FreightsOverPriceTableCardProps {
  data: FreightOverPriceTableItem[]
}
export function FreightsOverPriceTableCard({ data }: FreightsOverPriceTableCardProps) {
  const haveSomeData = data.length > 0
  return (
    <FreightsCustomizedCard
      cardTitle='Fora do preço de tabela'
      sx={{ height: '300px', paddingX: 1 }}
    >
      {haveSomeData && <FreightsOverPriceTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
