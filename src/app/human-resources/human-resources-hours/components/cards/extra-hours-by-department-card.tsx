import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDepartmentGraph } from '../graphs/extra-hours-by-department-graph'

interface ExtraHoursByDepartmentCardProps {
  data?: Record<
    string,
    {
      quantity: string
      percent: number
      quantityInSeconds: number
    }
  >
}
export function ExtraHoursByDepartmentCard({ data }: ExtraHoursByDepartmentCardProps) {
  const haveSomeData = data && Object.values(data).some((item) => item.quantityInSeconds > 0)
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
      {haveSomeData && <ExtraHoursByDepartmentGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
