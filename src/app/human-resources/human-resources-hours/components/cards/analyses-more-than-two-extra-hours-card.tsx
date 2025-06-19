import { MoreThanTwoExtraHoursRegistriesItem } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { Alert } from '@mui/material'
import { AnalysesMoreThanTwoExtraHoursTable } from '../tables/analyses-more-than-two-extra-hours-table'

interface AnalysesMoreThanTwoExtraHoursCardProps {
  data?: MoreThanTwoExtraHoursRegistriesItem[]
}
export function AnalysesMoreThanTwoExtraHoursCard({
  data = [],
}: AnalysesMoreThanTwoExtraHoursCardProps) {
  const haveSomeData = data.length > 0
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        width: { xs: '100%', sm: '46%' },
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Acima de 2hs Extras p/ evento '
    >
      {haveSomeData && <AnalysesMoreThanTwoExtraHoursTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
