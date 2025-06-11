import { HistoryExtraHoursByDepartmentItem } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryExtraHoursByDepartmentGraph } from '../graphs/history-extra-hours-by-department-graph'

interface HistoryExtraHoursByDepartmentCardProps {
  data: HistoryExtraHoursByDepartmentItem[]
}
export function HistoryExtraHoursByDepartmentCard({
  data,
}: HistoryExtraHoursByDepartmentCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. extras p/ departamento'
    >
      <HistoryExtraHoursByDepartmentGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
