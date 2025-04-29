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
      headerName: 'R$/KG base',
      type: 'string',
      value: {
        first: {
          value: 'basePrice',
        },
      },
    },
    { headerName: 'R$/KG SP TRUCK', type: 'string', value: { first: { value: 'priceSPTruck' } } },
    { headerName: 'R$/KG RJ TRUCK', type: 'string', value: { first: { value: 'priceRJTruck' } } },
    { headerName: 'R$/KG PR TRUCK', type: 'string', value: { first: { value: 'pricePRTruck' } } },
    { headerName: 'R$/KG SC TRUCK', type: 'string', value: { first: { value: 'priceSCTruck' } } },
    { headerName: 'R$/KG MG TRUCK', type: 'string', value: { first: { value: 'priceMGTruck' } } },
    { headerName: 'R$/KG BA TRUCK', type: 'string', value: { first: { value: 'priceBATruck' } } },
    { headerName: 'R$/KG PE TRUCK', type: 'string', value: { first: { value: 'pricePETruck' } } },
    { headerName: 'R$/KG PB TRUCK', type: 'string', value: { first: { value: 'pricePBTruck' } } },
    { headerName: 'R$/KG RN TRUCK', type: 'string', value: { first: { value: 'priceRNTruck' } } },
    { headerName: 'R$/KG GO TRUCK', type: 'string', value: { first: { value: 'priceGOTruck' } } },
    { headerName: 'R$/KG DF TRUCK', type: 'string', value: { first: { value: 'priceDFTruck' } } },
    { headerName: 'R$/KG FO TRUCK', type: 'string', value: { first: { value: 'priceFOTruck' } } },
    { headerName: 'R$/KG RS TRUCK', type: 'string', value: { first: { value: 'priceRSTruck' } } },
    { headerName: 'R$/KG MA TRUCK', type: 'string', value: { first: { value: 'priceMATruck' } } },
    { headerName: 'R$/KG MT TRUCK', type: 'string', value: { first: { value: 'priceMTTruck' } } },
    { headerName: 'R$/KG MS TRUCK', type: 'string', value: { first: { value: 'priceMSTruck' } } },
    { headerName: 'R$/KG PA TRUCK', type: 'string', value: { first: { value: 'pricePATruck' } } },
    { headerName: 'R$/KG ES TRUCK', type: 'string', value: { first: { value: 'priceESTruck' } } },
    { headerName: 'R$/KG TO TRUCK', type: 'string', value: { first: { value: 'priceTOTruck' } } },
    { headerName: 'R$/KG SP CAR', type: 'string', value: { first: { value: 'priceSPCar' } } },
    { headerName: 'R$/KG RJ CAR', type: 'string', value: { first: { value: 'priceRJCar' } } },
    { headerName: 'R$/KG PR CAR', type: 'string', value: { first: { value: 'pricePRCar' } } },
    { headerName: 'R$/KG SC CAR', type: 'string', value: { first: { value: 'priceSCCar' } } },
    { headerName: 'R$/KG MG CAR', type: 'string', value: { first: { value: 'priceMGCar' } } },
    { headerName: 'R$/KG BA CAR', type: 'string', value: { first: { value: 'priceBACar' } } },
    { headerName: 'R$/KG PE CAR', type: 'string', value: { first: { value: 'pricePECar' } } },
    { headerName: 'R$/KG PB CAR', type: 'string', value: { first: { value: 'pricePBCar' } } },
    { headerName: 'R$/KG RN CAR', type: 'string', value: { first: { value: 'priceRNCar' } } },
    { headerName: 'R$/KG GO CAR', type: 'string', value: { first: { value: 'priceGOCar' } } },
    { headerName: 'R$/KG DF CAR', type: 'string', value: { first: { value: 'priceDFCar' } } },
    { headerName: 'R$/KG FO CAR', type: 'string', value: { first: { value: 'priceFOCar' } } },
    { headerName: 'R$/KG RS CAR', type: 'string', value: { first: { value: 'priceRSCar' } } },
    { headerName: 'R$/KG MA CAR', type: 'string', value: { first: { value: 'priceMACar' } } },
    { headerName: 'R$/KG MT CAR', type: 'string', value: { first: { value: 'priceMTCar' } } },
    { headerName: 'R$/KG MS CAR', type: 'string', value: { first: { value: 'priceMSCar' } } },
    { headerName: 'R$/KG PA CAR', type: 'string', value: { first: { value: 'pricePACar' } } },
    { headerName: 'R$/KG ES CAR', type: 'string', value: { first: { value: 'priceESCar' } } },
    { headerName: 'R$/KG TO CAR', type: 'string', value: { first: { value: 'priceTOCar' } } },
  ]
}
