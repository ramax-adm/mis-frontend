import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { cnpjMask, cpfMask, replaceDotForComma } from '../../utils/functions'
import dayjs from 'dayjs'
import { SxProps } from '@mui/material'
import { COLORS } from '@/constants/styles/colors'

export type Column<T extends object> = {
  headerName: string
  type: string
  value: {
    first?: {
      value: string | ((value: T) => JSX.Element | string)
      parent?: string[]
    }
    second?: {
      value: string | ((value: T) => JSX.Element | string)
      parent?: string[]
    }
  }
  maxWidth?: string
  trueMessage?: string
  falseMessage?: string
  conditionalColor?: string | ((value: T) => string)
  headerColor?: string
  noData?: string
}

type Value = string | number | Date | object | boolean | null

export function CustomizedTable<T extends Record<string, Value>>({
  data,
  columns,
  action,
  tableStyles,
  cellStyles,
  headCellStyles,
}: {
  data: T[]
  columns: Column<T>[]
  action?: (value: T) => void
  tableStyles?: SxProps
  cellStyles?: SxProps
  headCellStyles?: SxProps
}) {
  function getConditionalColor(column: Column<T>, value: T) {
    if (!column?.conditionalColor) {
      return ''
    }

    if (typeof column.conditionalColor === 'function') {
      return (column.conditionalColor as (value: T) => string)(value)
    }

    return column?.conditionalColor
  }

  function createNewData(column: Column<T>, value: T) {
    if (typeof column.value.first?.value === 'function') {
      return (column.value.first?.value as (value: T) => JSX.Element)(value)
    }

    // eslint-disable-next-line
    let firstParent: any = value
    if (column?.value?.first?.parent) {
      const parent = column?.value?.first?.parent

      if (parent?.length > 0) {
        for (let i = 0; i < parent?.length; i++) {
          firstParent = firstParent?.[`${parent[i]}`] as object[]
          if ((firstParent as object[])?.length > 0) {
            firstParent = (firstParent as object[])[0]
          }
        }
        if ((firstParent as Record<string, string>)?.[`${column.value.first?.value}`] !== null)
          return formatValue(
            column.type,
            (firstParent as Record<string, string>)?.[`${column.value.first?.value}`],
            column.trueMessage || '',
            column.falseMessage || '',
          )
      }
    }

    if (value?.[`${column.value.first?.value}`] !== null)
      return formatValue(
        column.type,
        value?.[`${column.value.first?.value}`],
        column.trueMessage || '',
        column.falseMessage || '',
      )

    if (column?.value?.second) {
      const parent = column?.value?.second?.parent
      let secondParent = {}
      if (parent?.length && parent?.length > 0) {
        for (let i = 0; i < parent?.length; i++) {
          secondParent = value?.[`${parent[i]}`] ?? []
          if ((secondParent as object[]).length > 0) {
            secondParent = (secondParent as object[])[0]
          }
        }
      }
      if ((secondParent as Record<string, string>)?.[`${column.value.second.value}`])
        return formatValue(
          column.type,
          (secondParent as Record<string, string>)?.[`${column.value.second.value}`],
          column.trueMessage || '',
          column.falseMessage || '',
        )
    }
    if (value?.[`${column?.value?.second?.value}`])
      return formatValue(
        column.type,
        value?.[`${column?.value?.second?.value}`],
        column.trueMessage || '',
        column.falseMessage || '',
      )

    if (column.type === 'bool') {
      return value?.[`${column.value.first?.value}`] ? column.trueMessage : column.falseMessage
    }

    if (column.noData) return column.noData

    return 'Não informado'
  }

  function returnColumn(column: Column<T>) {
    return column.headerName
  }

  function formatValue(type: string, value: unknown, trueMessage: string, falseMessage: string) {
    if (type === 'moneyUs') {
      return Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(
        value as number,
      )
    }
    if (type === 'money') {
      return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
        value as number,
      )
    }
    if (type === 'date') {
      return dayjs(value as string).format('DD/MM/YYYY')
    }

    if (type === 'timedate') {
      return value ? dayjs(value as string).format('DD/MM/YYYY - HH:mm') : 'No Data'
    }
    if (type === 'percent') {
      if (value === 0) {
        return '0 %'
      }
      return value
        ? value.toString().match(/./) != null
          ? `${replaceDotForComma(value.toString())} %`
          : `${value} %`
        : 'Não informado'
    }

    if (type === 'CPF') {
      if (value) {
        if ((value as string).length < 13) {
          return cpfMask(value as string)
        } else {
          return cnpjMask(value as string)
        }
      } else return 'No data'
    }

    if (type === 'Phone') {
      const cleanValue = (value as string).replace(/[^\d]/g, '')
      return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }

    if (type === 'bool') {
      return value ? trueMessage : falseMessage
    }

    if (type === 'string' || type === 'default') {
      if (value !== '' || value !== null) {
        return value
      }
      return 'Não informado'
    }

    return value
  }

  return (
    <TableContainer component={Paper} sx={{ ...tableStyles }}>
      <Table stickyHeader sx={{ ...tableStyles }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {columns &&
              columns.map((column) => (
                <TableCell
                  size='small'
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: column.headerColor,
                    ...headCellStyles,
                  }}
                  key={column.headerName}
                  align='left'
                >
                  {returnColumn(column)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: T, index: number) => (
            <TableRow
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(62, 99, 221, 0.1)',
                },
              }}
              key={index}
              onClick={() => (action ? action(row) : null)}
            >
              {columns.map((column: Column<T>, index: number) => (
                <TableCell
                  size='small'
                  sx={{
                    fontSize: '10px',
                    maxWidth: column.maxWidth ?? '',
                    backgroundColor: getConditionalColor(column, row),
                    ...cellStyles,
                  }}
                  key={index}
                  align='left'
                >
                  {createNewData(column, row) as JSX.Element}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
