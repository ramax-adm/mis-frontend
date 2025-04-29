import { Table } from '@/components/Table'
import { Column } from '@/components/Table/body'
import { GetAnalyticalStockByCompanyResponse, GetStockByCompanyResponse } from '@/types/api/stock'

interface AnalyticalStockTableProps {
  data: GetAnalyticalStockByCompanyResponse[]
}
export function AnalyticalStockTable({ data }: AnalyticalStockTableProps) {
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

const getColumns = (): Column<GetAnalyticalStockByCompanyResponse>[] => {
  return [
    {
      headerName: 'Cod. Linha',
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
      value: {
        first: {
          value: 'productLineName',
        },
      },
    },
    {
      headerName: 'Cod. Produto',
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
      headerName: 'CXs',
      type: 'string',
      value: {
        first: {
          value: 'boxAmount',
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
      headerName: 'R$/KG Base',
      type: 'string',
      value: {
        first: {
          value: 'basePrice',
        },
      },
    },
    { headerName: 'R$/SP TRUCK', type: 'string', value: { first: { value: 'priceSPTruck' } } },
    { headerName: 'R$/RJ TRUCK', type: 'string', value: { first: { value: 'priceRJTruck' } } },
    { headerName: 'R$/PR TRUCK', type: 'string', value: { first: { value: 'pricePRTruck' } } },
    { headerName: 'R$/SC TRUCK', type: 'string', value: { first: { value: 'priceSCTruck' } } },
    { headerName: 'R$/MG TRUCK', type: 'string', value: { first: { value: 'priceMGTruck' } } },
    { headerName: 'R$/BA TRUCK', type: 'string', value: { first: { value: 'priceBATruck' } } },
    { headerName: 'R$/PE TRUCK', type: 'string', value: { first: { value: 'pricePETruck' } } },
    { headerName: 'R$/PB TRUCK', type: 'string', value: { first: { value: 'pricePBTruck' } } },
    { headerName: 'R$/RN TRUCK', type: 'string', value: { first: { value: 'priceRNTruck' } } },
    { headerName: 'R$/GO TRUCK', type: 'string', value: { first: { value: 'priceGOTruck' } } },
    { headerName: 'R$/DF TRUCK', type: 'string', value: { first: { value: 'priceDFTruck' } } },
    { headerName: 'R$/FO TRUCK', type: 'string', value: { first: { value: 'priceFOTruck' } } },
    { headerName: 'R$/RS TRUCK', type: 'string', value: { first: { value: 'priceRSTruck' } } },
    { headerName: 'R$/MA TRUCK', type: 'string', value: { first: { value: 'priceMATruck' } } },
    { headerName: 'R$/MT TRUCK', type: 'string', value: { first: { value: 'priceMTTruck' } } },
    { headerName: 'R$/MS TRUCK', type: 'string', value: { first: { value: 'priceMSTruck' } } },
    { headerName: 'R$/PA TRUCK', type: 'string', value: { first: { value: 'pricePATruck' } } },
    { headerName: 'R$/ES TRUCK', type: 'string', value: { first: { value: 'priceESTruck' } } },
    { headerName: 'R$/TO TRUCK', type: 'string', value: { first: { value: 'priceTOTruck' } } },
    { headerName: 'R$/SP CAR', type: 'string', value: { first: { value: 'priceSPCar' } } },
    { headerName: 'R$/RJ CAR', type: 'string', value: { first: { value: 'priceRJCar' } } },
    { headerName: 'R$/PR CAR', type: 'string', value: { first: { value: 'pricePRCar' } } },
    { headerName: 'R$/SC CAR', type: 'string', value: { first: { value: 'priceSCCar' } } },
    { headerName: 'R$/MG CAR', type: 'string', value: { first: { value: 'priceMGCar' } } },
    { headerName: 'R$/BA CAR', type: 'string', value: { first: { value: 'priceBACar' } } },
    { headerName: 'R$/PE CAR', type: 'string', value: { first: { value: 'pricePECar' } } },
    { headerName: 'R$/PB CAR', type: 'string', value: { first: { value: 'pricePBCar' } } },
    { headerName: 'R$/RN CAR', type: 'string', value: { first: { value: 'priceRNCar' } } },
    { headerName: 'R$/GO CAR', type: 'string', value: { first: { value: 'priceGOCar' } } },
    { headerName: 'R$/DF CAR', type: 'string', value: { first: { value: 'priceDFCar' } } },
    { headerName: 'R$/FO CAR', type: 'string', value: { first: { value: 'priceFOCar' } } },
    { headerName: 'R$/RS CAR', type: 'string', value: { first: { value: 'priceRSCar' } } },
    { headerName: 'R$/MA CAR', type: 'string', value: { first: { value: 'priceMACar' } } },
    { headerName: 'R$/MT CAR', type: 'string', value: { first: { value: 'priceMTCar' } } },
    { headerName: 'R$/MS CAR', type: 'string', value: { first: { value: 'priceMSCar' } } },
    { headerName: 'R$/PA CAR', type: 'string', value: { first: { value: 'pricePACar' } } },
    { headerName: 'R$/ES CAR', type: 'string', value: { first: { value: 'priceESCar' } } },
    { headerName: 'R$/TO CAR', type: 'string', value: { first: { value: 'priceTOCar' } } },
  ]
}
