import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDayGraph } from '../graphs/extra-hours-by-day-graph'

interface ExtraHoursByDayCardProps {
  data?: Record<
    string,
    {
      quantity: string
      quantityInSeconds: number
    }
  >
}
export function ExtraHoursByDayCard({ data }: ExtraHoursByDayCardProps) {
  const haveSomeData = data && Object.values(data).some((item) => item.quantityInSeconds > 0)
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
      {haveSomeData && <ExtraHoursByDayGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
