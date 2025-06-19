import { Column, CustomizedTable } from '@/components/Table/body'
import {
  HumanResourceHoursAnalyticalParsedDataItem,
  IrregularExtraHoursRegistriesByEmployee,
  MoreThanTwoExtraHoursRegistriesByEmployee,
  MoreThanTwoExtraHoursRegistriesItem,
} from '@/types/api/human-resources-hours'
import { Box } from '@mui/material'

interface AnalysesIrregularExtraHoursByEmployeeTableProps {
  data: IrregularExtraHoursRegistriesByEmployee
}
export function AnalysesIrregularExtraHoursByEmployeeTable({
  data,
}: AnalysesIrregularExtraHoursByEmployeeTableProps) {
  const columns = getColumns()
  const dataTransposed = getData({ data })

  return (
    <Box sx={{ marginTop: 2 }}>
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
        data={dataTransposed}
      />
    </Box>
  )
}

const getData = ({ data }: AnalysesIrregularExtraHoursByEmployeeTableProps) => {
  const keys = Object.keys(data)
  const response: {
    employeeName: string
    department: string
    registriesAmount: number
    extraHours: string
    extraHoursInSeconds: number
  }[] = []

  for (const key of keys) {
    response.push({
      employeeName: key,
      department: data[key].department,
      extraHours: data[key].extraHours,
      extraHoursInSeconds: data[key].extraHoursInSeconds,
      registriesAmount: data[key].registriesAmount,
    })
  }

  return response.sort((a, b) => b.registriesAmount - a.registriesAmount)
}
const getColumns = () => {
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
      headerName: 'Dept.',
      type: 'string',
      value: {
        first: {
          value: 'department',
        },
      },
    },
    {
      headerName: 'Qtd',
      maxWidth: '25px',
      type: 'string',
      value: {
        first: {
          value: 'registriesAmount',
        },
      },
    },
    {
      headerName: 'Hs',
      type: 'string',
      value: {
        first: {
          value: 'extraHours',
        },
      },
    },
  ]
}
