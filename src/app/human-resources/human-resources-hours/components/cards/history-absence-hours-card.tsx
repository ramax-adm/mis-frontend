import {
  HistoryAbsenceHoursByEmployeeItem,
  HistoryExtraHoursByEmployeeItem,
} from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryExtraHoursByEmployeeTable } from '../tables/history-extra-hours-by-employee-table'
import { HistoryAbsenceHoursByEmployeeTable } from '../tables/history-absence-hours-by-employee-table'

interface HistoryAbsenceHoursByEmployeeCardProps {
  data: HistoryAbsenceHoursByEmployeeItem[]
}
export function HistoryAbsenceHoursByEmployeeCard({
  data,
}: HistoryAbsenceHoursByEmployeeCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: 'calc(100vh - 480px);',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Ranking Hs. Faltas '
    >
      <HistoryAbsenceHoursByEmployeeTable data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
