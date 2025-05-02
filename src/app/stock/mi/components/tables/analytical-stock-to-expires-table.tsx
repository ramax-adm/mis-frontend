import { Table } from '@/components/Table'
import { Column } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import { GetAnalyticalToExpiresByCompanyResponse } from '@/types/api/stock'

interface AnalyticalStockToExpiresTableProps {
  data: GetAnalyticalToExpiresByCompanyResponse[]
}
export function AnalyticalStockToExpiresTable({ data }: AnalyticalStockToExpiresTableProps) {
  const columns = getColumns()

  return (
    <Table.Root sx={{ marginY: 0 }}>
      <Table.Body<any>
        tableStyles={{
          height: '450px',
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
    </Table.Root>
  )
}

const getColumns = (): Column<GetAnalyticalToExpiresByCompanyResponse>[] => {
  return [
    {
      headerName: 'Cod. Linha',
      maxWidth: '20px',
      type: 'string',
      value: {
        first: {
          value: 'productLineCode',
        },
      },
    },
    {
      headerName: 'Linha',
      type: 'string',
      maxWidth: '80px',
      value: {
        first: {
          value: 'productLineName',
        },
      },
    },
    {
      headerName: 'Cod. Produto',
      type: 'string',
      maxWidth: '20px',
      value: {
        first: {
          value: 'productCode',
        },
      },
    },
    {
      headerName: 'Produto',
      maxWidth: '80px',
      type: 'string',
      value: {
        first: {
          value: 'productName',
        },
      },
    },
    {
      headerName: 'CXs',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'boxAmount',
        },
      },
    },
    {
      headerName: 'PCS',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'quantity',
        },
      },
    },
    {
      headerName: 'KGs',
      maxWidth: '50px',
      type: 'string',
      value: {
        first: {
          value: 'totalWeightInKg',
        },
      },
    },
    {
      headerName: '$ Base',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'basePrice',
        },
      },
    },
    {
      headerName: '$ Total',
      maxWidth: '50px',
      type: 'string',
      value: {
        first: {
          value: 'totalPrice',
        },
      },
    },
    {
      headerName: 'Dt. Venc.',
      maxWidth: '90px',
      type: 'string',
      value: {
        first: {
          value: 'dueDate',
        },
      },
    },
    {
      headerName: 'Prazo',
      maxWidth: '30px',
      type: 'string',
      conditionalColor: (row: GetAnalyticalToExpiresByCompanyResponse) => {
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
  ]
}
