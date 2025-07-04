import {
  HistoryAbsenceHoursByEmployeeItem,
  HistoryExtraHoursByEmployeeItem,
} from '@/types/api/human-resources-hours'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { HistoryExtraHoursByEmployeeTable } from '../tables/history-extra-hours-by-employee-table'
import { HistoryAbsenceHoursByEmployeeTable } from '../tables/history-absence-hours-by-employee-table'
import { Alert } from '@mui/material'

interface HistoryAbsenceHoursByEmployeeCardProps {
  data?: HistoryAbsenceHoursByEmployeeItem[]
}
export function HistoryAbsenceHoursByEmployeeCard({
  data = [],
}: HistoryAbsenceHoursByEmployeeCardProps) {
  const haveSomeData = data.length > 0
  return (
    <HumanResourcesHoursCustomizedCard
      sx={{
        height: 'calc(100vh - 500px);',
        padding: 1,
        fontFamily: 'roboto',
      }}
      cardTitle='Ranking Hs. Faltas '
    >
      {haveSomeData && <HistoryAbsenceHoursByEmployeeTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </HumanResourcesHoursCustomizedCard>
  )
}
