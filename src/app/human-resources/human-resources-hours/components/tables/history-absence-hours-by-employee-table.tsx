import { Column, CustomizedTable } from '@/components/Table/body'
import { FreightByCattleAdvisorItem, FreightByFreightCompanyItem } from '@/types/api/freights'
import {
  ExtraHoursByEmployeeItem,
  HistoryAbsenceHoursByEmployeeItem,
  HistoryExtraHoursByEmployeeItem,
} from '@/types/api/human-resources-hours'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'

interface HistoryAbsenceHoursByEmployeeTableProps {
  data: HistoryAbsenceHoursByEmployeeItem[]
}
export function HistoryAbsenceHoursByEmployeeTable({
  data,
}: HistoryAbsenceHoursByEmployeeTableProps) {
  const columns = getColumns()

  const dataParsed = getData({ data })

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: 'calc(100vh - 530px);',
          width: '100%',
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: '9px',
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: '10px',
        }}
        columns={columns}
        data={dataParsed}
      />
    </Box>
  )
}

const getData = ({ data }: HistoryAbsenceHoursByEmployeeTableProps) => {
  return data
    .sort((a, b) => b.absenceHoursInSeconds - a.absenceHoursInSeconds)
    .map((item) => ({
      ...item,
      absenceHours: item.absenceHours.split(':').slice(0, 2).join(':'),
    }))
}

const getColumns = (): Column<HistoryAbsenceHoursByEmployeeItem>[] => {
  return [
    {
      headerName: 'Funcionario',
      type: 'string',
      value: {
        first: {
          value: 'employeeName',
        },
      },
    },
    {
      headerName: 'Departamento',
      // maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'department',
        },
      },
    },
    {
      headerName: 'Horas',
      type: 'string',
      value: {
        first: {
          value: 'absenceHours',
        },
      },
    },
  ]
}
