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

const getColumns = (): Column<GetStockByCompanyResponse>[] => {
  return [
    {
      headerName: 'Cod.',
      maxWidth: '20px',
      type: 'string',
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
      headerName: 'KG',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'totalWeightInKg',
        },
      },
    },
    {
      headerName: '$ CAR',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'basePriceCar',
        },
      },
    },
    {
      headerName: '$ TRUCK',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'basePriceTruck',
        },
      },
    },
    {
      headerName: '$ Total',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'totalPrice',
        },
      },
    },
  ]
}
