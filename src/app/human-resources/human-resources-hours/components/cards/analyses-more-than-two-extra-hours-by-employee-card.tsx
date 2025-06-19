import {
  MoreThanTwoExtraHoursRegistriesByEmployee,
  MoreThanTwoExtraHoursRegistriesItem,
} from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { Alert } from '@mui/material'
import { AnalysesMoreThanTwoExtraHoursTable } from '../tables/analyses-more-than-two-extra-hours-table'
import { AnalysesMoreThanTwoExtraHoursByEmployeeTable } from '../tables/analyses-more-than-two-extra-hours-by-employee-table'

interface AnalysesMoreThanTwoExtraHoursByEmployeeCardProps {
  data?: MoreThanTwoExtraHoursRegistriesByEmployee
}
export function AnalysesMoreThanTwoExtraHoursByEmployeeCard({
  data,
}: AnalysesMoreThanTwoExtraHoursByEmployeeCardProps) {
  const haveSomeData = data && Object.values(data).some((i) => i.registriesAmount > 0)
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        width: { xs: '100%', sm: '46%' },
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Acima de 2hs Extras p/ colaborador '
    >
      {haveSomeData && <AnalysesMoreThanTwoExtraHoursByEmployeeTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
