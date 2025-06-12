import {
  HistoryExtraHoursByDepartmentItem,
  HistoryHoursRelationByDepartmentItem,
} from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryHoursRelationByDepartmentGraph } from '../graphs/history-extra-hours-by-department-graph'

interface HistoryHoursRelationByDepartmentCardProps {
  data: Record<
    string,
    {
      extraHours: string
      extraHoursInSeconds: number
      absenceHours: string
      absenceHoursInSeconds: number
    }
  >
}
export function HistoryHoursRelationByDepartmentCard({
  data,
}: HistoryHoursRelationByDepartmentCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: 'calc(100vh - 480px);',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Relação hs. p/ departamento'
    >
      <HistoryHoursRelationByDepartmentGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
