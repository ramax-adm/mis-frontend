import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDepartmentGraph } from '../graphs/extra-hours-by-department-graph'

interface ExtraHoursByDepartmentCardProps {
  data: Record<
    string,
    {
      quantity: string
      percent: number
      quantityInSeconds: number
    }
  >
}
export function ExtraHoursByDepartmentCard({ data }: ExtraHoursByDepartmentCardProps) {
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: '220px',
        padding: 1,
        fontFamily: 'roboto',
        justifyContent: 'center',
      }}
      cardTitle='Concentração Hs. extras p/ departamento'
    >
      <ExtraHoursByDepartmentGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
