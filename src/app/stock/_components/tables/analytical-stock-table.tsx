import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Table } from "@/components/Table/normal-table";
import { Column } from "@/components/Table/normal-table/body";
import { GetAnalyticalStockByCompanyResponse } from "@/types/api/stock";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { LoaderIcon } from "../customized/loader-icon";

type ParsedDataItem = GetAnalyticalStockByCompanyResponse & {
  product: string;
  productLine: string;
};

interface AnalyticalStockTableProps {
  data?: GetAnalyticalStockByCompanyResponse[];
  isFetching: boolean;
}
export function AnalyticalStockTable({
  data = [],
  isFetching,
}: AnalyticalStockTableProps) {
  const columns = getColumns();
  const parsedData = getData({ data });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 280px)",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<ParsedDataItem>
      tableStyles={{
        height: "calc(100vh - 280px)",
        width: "100%",
      }}
      columns={columns}
      rows={parsedData}
    />
  );
}

const getData = ({
  data,
}: {
  data: GetAnalyticalStockByCompanyResponse[];
}): ParsedDataItem[] => {
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
    productLine: `${i.productLineCode} - ${i.productLineName}`,
  }));
};

const getColumns = (): CustomTableColumn<ParsedDataItem>[] => [
  {
    headerKey: "productLine",
    headerName: "Linha",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "boxAmount",
    headerName: "Caixas",
    align: "center",
    sx: { fontSize: 9.5 },
    cellSx: {
      fontSize: 9,
    },
  },
  {
    headerKey: "totalWeightInKg",
    headerName: "KG",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "basePriceCar",
    headerName: "$/KG CAR",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "basePriceTruck",
    headerName: "$/KG TRUCK",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
];
// const getColumns = (): Column<GetAnalyticalStockByCompanyResponse>[] => {
//   return [
//     {
//       headerName: "Linha",
//       type: "string",
//       value: {
//         first: {
//           value: "productLine",
//         },
//       },
//     },
//     {
//       headerName: "Produto",
//       type: "string",
//       value: {
//         first: {
//           value: "product",
//         },
//       },
//     },
//     {
//       headerName: "Caixas",
//       // width: "10px",
//       type: "string",
//       value: {
//         first: {
//           value: "boxAmount",
//         },
//       },
//     },
//     {
//       headerName: "KG",
//       maxWidth: "30px",
//       type: "string",
//       value: {
//         first: {
//           value: "totalWeightInKg",
//         },
//       },
//     },
//     {
//       headerName: "$/KG CAR",
//       maxWidth: "30px",
//       type: "string",
//       value: {
//         first: {
//           value: "basePriceCar",
//         },
//       },
//     },
//     {
//       headerName: "$/KG TRUCK",
//       maxWidth: "30px",
//       type: "string",
//       value: {
//         first: {
//           value: "basePriceTruck",
//         },
//       },
//     },
//     // {
//     //   headerName: "$/SP TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceSPTruck" } },
//     // },
//     // {
//     //   headerName: "$/RJ TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceRJTruck" } },
//     // },
//     // {
//     //   headerName: "$/PR TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "pricePRTruck" } },
//     // },
//     // {
//     //   headerName: "$/SC TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceSCTruck" } },
//     // },
//     // {
//     //   headerName: "$/MG TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceMGTruck" } },
//     // },
//     // {
//     //   headerName: "$/BA TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceBATruck" } },
//     // },
//     // {
//     //   headerName: "$/PE TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "pricePETruck" } },
//     // },
//     // {
//     //   headerName: "$/PB TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "pricePBTruck" } },
//     // },
//     // {
//     //   headerName: "$/RN TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceRNTruck" } },
//     // },
//     // {
//     //   headerName: "$/GO TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceGOTruck" } },
//     // },
//     // {
//     //   headerName: "$/DF TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceDFTruck" } },
//     // },
//     // {
//     //   headerName: "$/FO TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceFOTruck" } },
//     // },
//     // {
//     //   headerName: "$/RS TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceRSTruck" } },
//     // },
//     // {
//     //   headerName: "$/MA TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceMATruck" } },
//     // },
//     // {
//     //   headerName: "$/MT TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceMTTruck" } },
//     // },
//     // {
//     //   headerName: "$/MS TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceMSTruck" } },
//     // },
//     // {
//     //   headerName: "$/PA TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "pricePATruck" } },
//     // },
//     // {
//     //   headerName: "$/ES TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceESTruck" } },
//     // },
//     // {
//     //   headerName: "$/TO TRUCK",
//     //   type: "string",
//     //   value: { first: { value: "priceTOTruck" } },
//     // },
//     // {
//     //   headerName: "$/SP CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceSPCar" } },
//     // },
//     // {
//     //   headerName: "$/RJ CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceRJCar" } },
//     // },
//     // {
//     //   headerName: "$/PR CAR",
//     //   type: "string",
//     //   value: { first: { value: "pricePRCar" } },
//     // },
//     // {
//     //   headerName: "$/SC CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceSCCar" } },
//     // },
//     // {
//     //   headerName: "$/MG CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceMGCar" } },
//     // },
//     // {
//     //   headerName: "$/BA CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceBACar" } },
//     // },
//     // {
//     //   headerName: "$/PE CAR",
//     //   type: "string",
//     //   value: { first: { value: "pricePECar" } },
//     // },
//     // {
//     //   headerName: "$/PB CAR",
//     //   type: "string",
//     //   value: { first: { value: "pricePBCar" } },
//     // },
//     // {
//     //   headerName: "$/RN CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceRNCar" } },
//     // },
//     // {
//     //   headerName: "$/GO CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceGOCar" } },
//     // },
//     // {
//     //   headerName: "$/DF CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceDFCar" } },
//     // },
//     // {
//     //   headerName: "$/FO CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceFOCar" } },
//     // },
//     // {
//     //   headerName: "$/RS CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceRSCar" } },
//     // },
//     // {
//     //   headerName: "$/MA CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceMACar" } },
//     // },
//     // {
//     //   headerName: "$/MT CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceMTCar" } },
//     // },
//     // {
//     //   headerName: "$/MS CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceMSCar" } },
//     // },
//     // {
//     //   headerName: "$/PA CAR",
//     //   type: "string",
//     //   value: { first: { value: "pricePACar" } },
//     // },
//     // {
//     //   headerName: "$/ES CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceESCar" } },
//     // },
//     // {
//     //   headerName: "$/TO CAR",
//     //   type: "string",
//     //   value: { first: { value: "priceTOCar" } },
//     // },
//   ];
// };
