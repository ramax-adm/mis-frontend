import { LoaderIcon } from "@/app/business-audit/components/customized/loader-icon";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { InventoryGetResumeDataResponse } from "@/types/api/inventory";
import { toLocaleString } from "@/utils/number.utils";
import { Alert, Box, TableCell, Typography } from "@mui/material";
import { blue, green, grey, indigo, red } from "@mui/material/colors";

type InventoryProductsWithDiferenceParsedData = {
  inventoryId: string;
  warehouseCode: string;
  product: string;
  inventoryQuantity: number;
  inventoryWeightInKg: number;
  stockQuantity: number;
  stockWeightInKg: number;
  blockedQuantity: number;
  blockedWeightInKg: number;
  cancelatedQuantity: number;
  cancelatedWeightInKg: number;
  dispatchedQuantity: number;
  dispatchedWeightInKg: number;
  quantityDif: number;
  weightInKgDif: number;
};

interface InventoryProductsWithDiferenceTableProps {
  data?: InventoryGetResumeDataResponse["data"];
  isFetching: boolean;
}
export function InventoryProductsWithDiferenceTable({
  data,
  isFetching,
}: InventoryProductsWithDiferenceTableProps) {
  const columns = getColumns();
  const titleGroups = getTitleGroups();
  const parsedData = getData({ data });

  console.log({ data, parsedData });

  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 280px);",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 280px);",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <Alert severity='info'> Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <PaginatedTable<InventoryProductsWithDiferenceParsedData>
      columns={columns}
      rows={parsedData}
      titleGroups={titleGroups}
      tableStyles={{
        height: "calc(100vh - 280px);",
      }}
    />
  );
}

const getTitleGroups = () => {
  return [
    {
      label: "Produto c/ Diferenças",
      colSpan: 3,
      sx: {
        backgroundColor: "#4D93D9",
        color: "white",
      },
    },
    {
      label: "Cancelados",
      colSpan: 2, // pq inclui o vencido
      sx: {
        backgroundColor: "#eb513dff",
        color: "white",
      },
    },
    {
      label: "Bloqueados",
      colSpan: 2, // pq inclui o vencido
      sx: {
        backgroundColor: "#121212",
        color: "white",
      },
    },
    {
      label: "Expedidos",
      colSpan: 2, // pq inclui o vencido
      sx: {
        backgroundColor: "#218b3cff",
        color: "white",
      },
    },
  ];
};

const getColumns =
  (): PaginatedTableColumn<InventoryProductsWithDiferenceParsedData>[] => {
    return [
      {
        headerKey: "inventoryId",
        headerName: "Inventario",
        sx: { backgroundColor: blue["100"] },
        cellSx: { backgroundColor: blue["50"] },
      },
      {
        headerKey: "warehouseCode",
        headerName: "Almoxarifado",
        sx: { backgroundColor: blue["100"] },
        cellSx: { backgroundColor: blue["50"] },
      },
      {
        headerKey: "product",
        headerName: "Produto",
        sx: { backgroundColor: blue["100"] },
        cellSx: { backgroundColor: blue["50"] },
      },
      {
        headerKey: "cancelatedQuantity",
        headerName: "Qtd.",
        sx: { backgroundColor: red["100"] },
        cellSx: { backgroundColor: red["50"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
      {
        headerKey: "cancelatedWeightInKg",
        headerName: "Peso KG",
        sx: { backgroundColor: red["100"] },
        cellSx: { backgroundColor: red["50"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
      {
        headerKey: "blockedQuantity",
        headerName: "Qtd.",
        sx: { backgroundColor: grey["300"] },
        cellSx: { backgroundColor: grey["100"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
      {
        headerKey: "blockedWeightInKg",
        headerName: "Peso KG",
        sx: { backgroundColor: grey["300"] },
        cellSx: { backgroundColor: grey["100"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
      {
        headerKey: "dispatchedQuantity",
        headerName: "Qtd.",
        sx: { backgroundColor: green["100"] },
        cellSx: { backgroundColor: green["50"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
      {
        headerKey: "dispatchedWeightInKg",
        headerName: "Peso KG",
        sx: { backgroundColor: green["100"] },
        cellSx: { backgroundColor: green["50"] },
        render: (value) => toLocaleString(Number(value) ?? 0),
      },
    ];
  };

const getData = ({
  data = [],
}: {
  data?: InventoryGetResumeDataResponse["data"];
}): InventoryProductsWithDiferenceParsedData[] => {
  return data?.map((item) => ({
    inventoryId: item.inventoryId,
    warehouseCode: item.warehouseCode,
    product: `${item.productCode} - ${item.productName}`,
    inventoryQuantity: item.inventoryQuantity,
    inventoryWeightInKg: item.inventoryWeightInKg,
    stockQuantity: item.stockQuantity,
    stockWeightInKg: item.stockWeightInKg,
    blockedQuantity: item.blockedQuantity,
    blockedWeightInKg: item.blockedWeightInKg,
    cancelatedQuantity: item.cancelatedQuantity,
    cancelatedWeightInKg: item.cancelatedWeightInKg,
    dispatchedQuantity: item.dispatchedQuantity,
    dispatchedWeightInKg: item.dispatchedWeightInKg,
    quantityDif: item.quantityDif,
    weightInKgDif: item.weightInKgDif,
  }));
};
