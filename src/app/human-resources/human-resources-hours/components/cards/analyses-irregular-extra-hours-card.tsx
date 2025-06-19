import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import {
  HumanResourcesHoursHourRelation,
  IrregularExtraHoursRegistriesItem,
} from '@/types/api/human-resources-hours'
import { AnalysesHoursRelationGraph } from '../graphs/analyses-hours-relation-graph'
import { AnalysesIrregularExtraHoursTable } from '../tables/analyses-irregular-extra-hours-table'

interface AnalysesIrregularExtraHoursCardProps {
  data?: IrregularExtraHoursRegistriesItem[]
}
export function AnalysesIrregularExtraHoursCard({
  data = [],
}: AnalysesIrregularExtraHoursCardProps) {
  const haveSomeData = data.length > 0
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        width: { xs: '100%', sm: '46%' },
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. Irregulares p/ evento'
    >
      {haveSomeData && <AnalysesIrregularExtraHoursTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
