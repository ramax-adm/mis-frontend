import { ExtraHoursByEmployeeItem } from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDepartmentGraph } from '../graphs/extra-hours-by-department-graph'
import { ExtraHoursByEmployeeTable } from '../tables/extra-hours-by-employee-table'

interface ExtraHoursByEmployeeCardProps {
  data: ExtraHoursByEmployeeItem[]
}
export function ExtraHoursByEmployeeCard({ data }: ExtraHoursByEmployeeCardProps) {
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
      <ExtraHoursByEmployeeTable data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
