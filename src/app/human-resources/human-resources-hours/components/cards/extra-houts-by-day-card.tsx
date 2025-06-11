import { ExtraHoursByEmployeeItem } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDepartmentGraph } from '../graphs/extra-hours-by-department-graph'
import { ExtraHoursByEmployeeTable } from '../tables/extra-hours-by-employee-table'
import { ExtraHoursByDayGraph } from '../graphs/extra-hours-by-day-graph'

interface ExtraHoursByDayCardProps {
  data: Record<
    string,
    {
      quantity: string
      quantityInSeconds: number
    }
  >
}
export function ExtraHoursByDayCard({ data }: ExtraHoursByDayCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '200px',
        padding: 1,
        fontFamily: 'roboto',
        justifyContent: 'center',
      }}
      cardTitle='Ranking Hs. Extras '
    >
      <ExtraHoursByDayGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
