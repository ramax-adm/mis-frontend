import { Table } from '@/components/Table'
import { Column, CustomizedTable } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import { GetToExpiresByCompanyResponse } from '@/types/api/stock'

interface StockToExpiresTableProps {
  data: GetToExpiresByCompanyResponse[]
}
export function StockToExpiresTable({ data }: StockToExpiresTableProps) {
  const columns = getColumns()

  return (
    <Table.Root sx={{ marginY: 0 }}>
      <Table.Body<any>
        tableStyles={{
          height: '450px',
          width: '100%',
        }}
        cellStyles={{
          padding: 1,
        }}
        headCellStyles={{
          paddingX: 1,
        }}
        columns={columns}
        data={data}
      />
    </Table.Root>
  )
}

const getColumns = (): Column<GetToExpiresByCompanyResponse>[] => {
  return [
    {
      headerName: 'Cod.',
      type: 'string',
      value: {
        first: {
          value: 'productCode',
        },
      },
    },
    {
      headerName: 'Produto',
      type: 'string',
      value: {
        first: {
          value: 'productName',
        },
      },
    },
    {
      headerName: 'Venc.',
      type: 'string',
      value: {
        first: {
          value: 'dueDate',
        },
      },
    },
    {
      headerName: 'Prazo',
      type: 'string',
      conditionalColor: (row: GetToExpiresByCompanyResponse) => {
        if (row.daysToExpires <= 15) {
          return COLORS.TABELAS.FUNDO_VERMELHO
        } else if (row.daysToExpires > 15 && row.daysToExpires <= 30) {
          return COLORS.TABELAS.FUNDO_AMARELO
        }

        return COLORS.TABELAS.FUNDO_VERDE
      },
      value: {
        first: {
          value: 'daysToExpires',
        },
      },
    },
    {
      headerName: 'KG',
      type: 'string',
      value: {
        first: {
          value: 'totalWeightInKg',
        },
      },
    },
  ]
}
