import {
  FreightByCattleAdvisorItem,
  FreightByFreightCompanyItem,
  FreightOverPriceTableItem,
} from '@/types/api/freights'
import { FreightsCustomizedCard } from '../customized/card'
import { FreightsOverPriceTable } from '../tables/freights-over-table-price-table'
import { FreightByFreightCompanyTable } from '../tables/freights-by-freight-company-table'
import { FreightByCattleAdvisorTable } from '../tables/freights-by-cattle-advisor-table'
import { Alert } from '@mui/material'

interface FreightsByCattleAdvisorCardProps {
  data: FreightByCattleAdvisorItem[]
}
export function FreightsByCattleAdvisorCard({ data }: FreightsByCattleAdvisorCardProps) {
  const haveSomeData = data.length > 0
  return (
    <FreightsCustomizedCard
      cardTitle='Assessor'
      sx={{ width: '45%', height: '300px', paddingX: 1 }}
    >
      {haveSomeData && <FreightByCattleAdvisorTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
