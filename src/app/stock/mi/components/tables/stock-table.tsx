import { Table } from '@/components/Table'
import { Column } from '@/components/Table/body'
import { GetStockByCompanyResponse } from '@/types/api/stock'

interface StockTableProps {
  data: GetStockByCompanyResponse[]
}
export function StockTable({ data }: StockTableProps) {
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

const getColumns = (): Column<GetStockByCompanyResponse>[] => {
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
      maxWidth: '50px',
      type: 'string',
      value: {
        first: {
          value: 'productName',
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
    {
      headerName: 'R$/KG',
      type: 'string',
      value: {
        first: {
          value: 'basePrice',
        },
      },
    },
    {
      headerName: 'R$ Total',
      type: 'string',
      value: {
        first: {
          value: 'totalPrice',
        },
      },
    },
  ]
}
