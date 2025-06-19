import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { Alert } from '@mui/material'
import { AnalysesIrregularExtraHoursByDepartmentGraph } from '../graphs/analyses-irregular-extra-hours-by-department-graph'
import { IrregularExtraHoursByDepartment } from '@/types/api/human-resources-hours'

interface AnalysesIrregularExtraHoursByDepartmentCardProps {
  data?: IrregularExtraHoursByDepartment
}
export function AnalysesIrregularExtraHoursByDepartmentCard({
  data,
}: AnalysesIrregularExtraHoursByDepartmentCardProps) {
  const haveSomeData = data && Object.values(data).some((i) => i.registriesAmount > 0)
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '250px',
        width: { xs: '96%' },
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Concentração de irregularidade de horas p/ Departamento'
    >
      {haveSomeData && <AnalysesIrregularExtraHoursByDepartmentGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
