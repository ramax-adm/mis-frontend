import { Alert } from '@mui/material'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryHoursRelationByDepartmentGraph } from '../graphs/history-hours-relation-by-department-graph'

interface HistoryHoursRelationByDepartmentCardProps {
  data?: Record<
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
  const haveSomeData =
    data &&
    Object.values(data).some(
      (item) => item.extraHoursInSeconds > 0 || item.absenceHoursInSeconds > 0,
    )
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: 'calc(100vh - 500px);',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Relação hs. p/ departamento'
    >
      {haveSomeData && <HistoryHoursRelationByDepartmentGraph data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
