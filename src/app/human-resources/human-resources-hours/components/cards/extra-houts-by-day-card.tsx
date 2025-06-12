import { HumanResourcesHoursCustomizedCard } from '../customized/card'
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
        height: '220px',
        padding: 1,
        fontFamily: 'roboto',
        justifyContent: 'center',
      }}
      cardTitle='Hs. Extras p/ dia '
    >
      <ExtraHoursByDayGraph data={data} />
    </HumanResourcesHoursCustomizedCard>
  )
}
