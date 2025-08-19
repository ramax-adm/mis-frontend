import { Table } from "@/components/Table/normal-table";
import { Column } from "@/components/Table/normal-table/body";
import { GetAnalyticalStockByCompanyResponse } from "@/types/api/stock";

interface AnalyticalStockTableProps {
  data: GetAnalyticalStockByCompanyResponse[];
}
export function AnalyticalStockTable({ data }: AnalyticalStockTableProps) {
  const columns = getColumns();

  return (
    <Table.Root sx={{ marginY: 0 }}>
      <Table.Body<any>
        tableStyles={{
          height: "calc(100vh - 260px);",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "9px",
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "10px",
        }}
        columns={columns}
        data={data}
      />
    </Table.Root>
  );
}

const getColumns = (): Column<GetAnalyticalStockByCompanyResponse>[] => {
  return [
    {
      headerName: "Cod. Linha",
      maxWidth: "20px",
      type: "string",
      value: {
        first: {
          value: "productLineCode",
        },
      },
    },
    {
      headerName: "Linha",
      maxWidth: "80px",
      type: "string",
      value: {
        first: {
          value: "productLineName",
        },
      },
    },
    {
      headerName: "Cod. Produto",
      maxWidth: "20px",
      type: "string",
      value: {
        first: {
          value: "productCode",
        },
      },
    },
    {
      headerName: "Produto",
      maxWidth: "80px",
      type: "string",
      value: {
        first: {
          value: "productName",
        },
      },
    },
    {
      headerName: "CXs",
      maxWidth: "30px",
      type: "string",
      value: {
        first: {
          value: "boxAmount",
        },
      },
    },
    {
      headerName: "KG",
      type: "string",
      value: {
        first: {
          value: "totalWeightInKg",
        },
      },
    },
    {
      headerName: "$/KG CAR",
      maxWidth: "30px",
      type: "string",
      value: {
        first: {
          value: "basePriceCar",
        },
      },
    },
    {
      headerName: "$/KG TRUCK",
      maxWidth: "30px",
      type: "string",
      value: {
        first: {
          value: "basePriceTruck",
        },
      },
    },
    {
      headerName: "$/SP TRUCK",
      type: "string",
      value: { first: { value: "priceSPTruck" } },
    },
    {
      headerName: "$/RJ TRUCK",
      type: "string",
      value: { first: { value: "priceRJTruck" } },
    },
    {
      headerName: "$/PR TRUCK",
      type: "string",
      value: { first: { value: "pricePRTruck" } },
    },
    {
      headerName: "$/SC TRUCK",
      type: "string",
      value: { first: { value: "priceSCTruck" } },
    },
    {
      headerName: "$/MG TRUCK",
      type: "string",
      value: { first: { value: "priceMGTruck" } },
    },
    {
      headerName: "$/BA TRUCK",
      type: "string",
      value: { first: { value: "priceBATruck" } },
    },
    {
      headerName: "$/PE TRUCK",
      type: "string",
      value: { first: { value: "pricePETruck" } },
    },
    {
      headerName: "$/PB TRUCK",
      type: "string",
      value: { first: { value: "pricePBTruck" } },
    },
    {
      headerName: "$/RN TRUCK",
      type: "string",
      value: { first: { value: "priceRNTruck" } },
    },
    {
      headerName: "$/GO TRUCK",
      type: "string",
      value: { first: { value: "priceGOTruck" } },
    },
    {
      headerName: "$/DF TRUCK",
      type: "string",
      value: { first: { value: "priceDFTruck" } },
    },
    {
      headerName: "$/FO TRUCK",
      type: "string",
      value: { first: { value: "priceFOTruck" } },
    },
    {
      headerName: "$/RS TRUCK",
      type: "string",
      value: { first: { value: "priceRSTruck" } },
    },
    {
      headerName: "$/MA TRUCK",
      type: "string",
      value: { first: { value: "priceMATruck" } },
    },
    {
      headerName: "$/MT TRUCK",
      type: "string",
      value: { first: { value: "priceMTTruck" } },
    },
    {
      headerName: "$/MS TRUCK",
      type: "string",
      value: { first: { value: "priceMSTruck" } },
    },
    {
      headerName: "$/PA TRUCK",
      type: "string",
      value: { first: { value: "pricePATruck" } },
    },
    {
      headerName: "$/ES TRUCK",
      type: "string",
      value: { first: { value: "priceESTruck" } },
    },
    {
      headerName: "$/TO TRUCK",
      type: "string",
      value: { first: { value: "priceTOTruck" } },
    },
    {
      headerName: "$/SP CAR",
      type: "string",
      value: { first: { value: "priceSPCar" } },
    },
    {
      headerName: "$/RJ CAR",
      type: "string",
      value: { first: { value: "priceRJCar" } },
    },
    {
      headerName: "$/PR CAR",
      type: "string",
      value: { first: { value: "pricePRCar" } },
    },
    {
      headerName: "$/SC CAR",
      type: "string",
      value: { first: { value: "priceSCCar" } },
    },
    {
      headerName: "$/MG CAR",
      type: "string",
      value: { first: { value: "priceMGCar" } },
    },
    {
      headerName: "$/BA CAR",
      type: "string",
      value: { first: { value: "priceBACar" } },
    },
    {
      headerName: "$/PE CAR",
      type: "string",
      value: { first: { value: "pricePECar" } },
    },
    {
      headerName: "$/PB CAR",
      type: "string",
      value: { first: { value: "pricePBCar" } },
    },
    {
      headerName: "$/RN CAR",
      type: "string",
      value: { first: { value: "priceRNCar" } },
    },
    {
      headerName: "$/GO CAR",
      type: "string",
      value: { first: { value: "priceGOCar" } },
    },
    {
      headerName: "$/DF CAR",
      type: "string",
      value: { first: { value: "priceDFCar" } },
    },
    {
      headerName: "$/FO CAR",
      type: "string",
      value: { first: { value: "priceFOCar" } },
    },
    {
      headerName: "$/RS CAR",
      type: "string",
      value: { first: { value: "priceRSCar" } },
    },
    {
      headerName: "$/MA CAR",
      type: "string",
      value: { first: { value: "priceMACar" } },
    },
    {
      headerName: "$/MT CAR",
      type: "string",
      value: { first: { value: "priceMTCar" } },
    },
    {
      headerName: "$/MS CAR",
      type: "string",
      value: { first: { value: "priceMSCar" } },
    },
    {
      headerName: "$/PA CAR",
      type: "string",
      value: { first: { value: "pricePACar" } },
    },
    {
      headerName: "$/ES CAR",
      type: "string",
      value: { first: { value: "priceESCar" } },
    },
    {
      headerName: "$/TO CAR",
      type: "string",
      value: { first: { value: "priceTOCar" } },
    },
  ];
};
