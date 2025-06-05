import {
  FreightByFreightCompanyItem,
  FreightByFreightTypeItem,
  FreightOverPriceTableItem,
} from '@/types/api/freights'
import { FreightsCustomizedCard } from '../customized/card'
import { FreightsOverPriceTable } from '../tables/freights-over-table-price-table'
import { FreightByFreightCompanyTable } from '../tables/freights-by-freight-company-table'
import { FreightByFreightTypeTable } from '../tables/freights-by-freight-type-table'
import { Alert } from '@mui/material'

interface FreightsByFreightTypeCardProps {
  data: FreightByFreightTypeItem[]
}
export function FreightsByFreightTypeCard({ data }: FreightsByFreightTypeCardProps) {
  const haveSomeData = data.length > 0
  return (
    <FreightsCustomizedCard
      cardTitle='Tipo Transporte'
      sx={{ width: '45%', height: '300px', paddingX: 1 }}
    >
      {haveSomeData && <FreightByFreightTypeTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
