import {
  HistoryAbsenceHoursByDepartmentItem,
  HistoryExtraHoursByEmployeeItem,
} from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryAbsenceHoursByDepartmentGraph } from '../graphs/history-absence-hours-by-department-graph'

interface HistoryAbsenceHoursByDepartmentCardProps {
  data: HistoryAbsenceHoursByDepartmentItem[]
}
export function HistoryAbsenceHoursByDepartmentCard({
  data,
}: HistoryAbsenceHoursByDepartmentCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. Folgas '
    >
      <HistoryAbsenceHoursByDepartmentGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
