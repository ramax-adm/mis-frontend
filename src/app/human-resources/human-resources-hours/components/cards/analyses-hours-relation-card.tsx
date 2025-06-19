import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HumanResourcesHoursHourRelation } from '@/types/api/human-resources-hours'
import { AnalysesHoursRelationGraph } from '../graphs/analyses-hours-relation-graph'

interface AnalysesHoursRelationCardProps {
  data?: HumanResourcesHoursHourRelation
}
export function AnalysesHoursRelationCard({ data }: AnalysesHoursRelationCardProps) {
  const haveSomeData = data && Object.values(data).some((item) => item.percent > 0)
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Relação Hs. Extras/ Acima de 2hrs.'
    >
      {haveSomeData && <AnalysesHoursRelationGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
