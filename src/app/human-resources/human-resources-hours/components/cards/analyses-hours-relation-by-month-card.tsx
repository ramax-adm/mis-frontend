import { Alert } from '@mui/material'
import { AnalysesHoursRelationByMonthGraph } from '../graphs/analyses-hours-relation-by-month-graph'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HumanResourcesHoursHourRelationByMonth } from '@/types/api/human-resources-hours'

interface AnalysesHoursRelationByMonthCardProps {
  data?: HumanResourcesHoursHourRelationByMonth
}
export function AnalysesHoursRelationByMonthCard({ data }: AnalysesHoursRelationByMonthCardProps) {
  const haveSomeData =
    data &&
    Object.values(data).some(
      (item) => item.quantityAbsenceHoursInSeconds > 0 || item.quantityExtraHoursInSeconds > 0,
    )
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. Extras e Faltas'
    >
      {haveSomeData && <AnalysesHoursRelationByMonthGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
