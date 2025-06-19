import { MoreThanTwoExtraHoursByDepartment } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { Alert } from '@mui/material'
import { AnalysesMoreThanTwoExtraHoursByDepartmentGraph } from '../graphs/analyses-more-than-two-extra-hours-by-department-graph'

interface AnalysesMoreThanTwoExtraHoursByDepartmentCardProps {
  data?: MoreThanTwoExtraHoursByDepartment
}
export function AnalysesMoreThanTwoExtraHoursByDepartmentCard({
  data,
}: AnalysesMoreThanTwoExtraHoursByDepartmentCardProps) {
  const haveSomeData = data && Object.values(data).some((i) => i.registriesAmount > 0)
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '250px',
        width: { xs: '96%' },
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Concentração acima de 2Hs. Extras p/ Departamento'
    >
      {haveSomeData && <AnalysesMoreThanTwoExtraHoursByDepartmentGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
