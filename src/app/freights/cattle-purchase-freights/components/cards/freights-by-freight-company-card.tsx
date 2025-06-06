import { FreightByFreightCompanyItem, FreightOverPriceTableItem } from '@/types/api/freights'
import { FreightsCustomizedCard } from '../customized/card'
import { FreightsOverPriceTable } from '../tables/freights-over-table-price-table'
import { FreightByFreightCompanyTable } from '../tables/freights-by-freight-company-table'
import { Alert } from '@mui/material'

interface FreightsByFreightCompanyCardProps {
  data: FreightByFreightCompanyItem[]
}
export function FreightsByFreightCompanyCard({ data }: FreightsByFreightCompanyCardProps) {
  const haveSomeData = data.length > 0
  return (
    <FreightsCustomizedCard cardTitle='Transportadora' sx={{ height: '300px', paddingX: 1 }}>
      {haveSomeData && <FreightByFreightCompanyTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
