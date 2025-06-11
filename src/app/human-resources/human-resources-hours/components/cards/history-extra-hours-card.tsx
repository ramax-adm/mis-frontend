import { HistoryExtraHoursByEmployeeItem } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryExtraHoursByEmployeeTable } from '../tables/history-extra-hours-by-employee-table'

interface HistoryExtraHoursByEmployeeCardProps {
  data: HistoryExtraHoursByEmployeeItem[]
}
export function HistoryExtraHoursByEmployeeCard({ data }: HistoryExtraHoursByEmployeeCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Hs. Extras '
    >
      <HistoryExtraHoursByEmployeeTable data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
