import { Column, CustomizedTable } from '@/components/Table/body'
import { FreightByCattleAdvisorItem, FreightByFreightCompanyItem } from '@/types/api/freights'
import { ExtraHoursByEmployeeItem } from '@/types/api/human-resources-hours'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'

interface ExtraHoursByEmployeeTableProps {
  data: ExtraHoursByEmployeeItem[]
}
export function ExtraHoursByEmployeeTable({ data }: ExtraHoursByEmployeeTableProps) {
  const columns = getColumns()

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: '170px',
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
        data={data}
      />
    </Box>
  )
}
const getColumns = (): Column<ExtraHoursByEmployeeItem>[] => {
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
          value: 'extraHours',
        },
      },
    },
  ]
}
