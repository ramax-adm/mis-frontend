import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import {
  HumanResourcesHoursHourRelation,
  IrregularExtraHoursRegistriesByEmployee,
  IrregularExtraHoursRegistriesItem,
} from '@/types/api/human-resources-hours'
import { AnalysesHoursRelationGraph } from '../graphs/analyses-hours-relation-graph'
import { AnalysesIrregularExtraHoursTable } from '../tables/analyses-irregular-extra-hours-table'
import { AnalysesIrregularExtraHoursByEmployeeTable } from '../tables/analyses-irregular-extra-hours-by-employee-table'

interface AnalysesIrregularExtraHoursByEmployeeCardProps {
  data?: IrregularExtraHoursRegistriesByEmployee
}
export function AnalysesIrregularExtraHoursByEmployeeCard({
  data,
}: AnalysesIrregularExtraHoursByEmployeeCardProps) {
  const haveSomeData = data && Object.values(data).some((i) => i.registriesAmount > 0)
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        width: { xs: '100%', sm: '46%' },
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. Irregulares p/ colaborador'
    >
      {haveSomeData && <AnalysesIrregularExtraHoursByEmployeeTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
