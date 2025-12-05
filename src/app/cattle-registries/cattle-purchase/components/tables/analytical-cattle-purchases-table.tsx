import { GetCattlePurchaseAnalyticalParsedItem } from "@/types/api/purchase";
import { Alert, Box } from "@mui/material";
import PaginatedTable from "@/components/Table/paginated-table";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { LoaderIcon } from "@/components/Loading/loader-icon";

// ------------------------------------------------------
// ✅ TIPAGEM DA LINHA DA TABELA
// ------------------------------------------------------
type AnalyticalCattlePurchasesTableData = GetCattlePurchaseAnalyticalParsedItem;

interface AnalyticalCattlePurchasesTableProps {
  data?: GetCattlePurchaseAnalyticalParsedItem[];
  isFetching?: boolean;
}

// ------------------------------------------------------
// ✅ COMPONENTE PADRONIZADO
// ------------------------------------------------------
export function AnalyticalCattlePurchasesTable({
  data = [],
  isFetching = false,
}: AnalyticalCattlePurchasesTableProps) {
  const columns = getColumns();
  const haveSomeData = data.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 270px)",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return <Alert severity='info'>Sem Dados</Alert>;
  }

  return (
    <PaginatedTable<AnalyticalCattlePurchasesTableData>
      columns={columns}
      rows={data}
      tableStyles={{ height: "calc(100vh - 270px)" }}
    />
  );
}

// ------------------------------------------------------
// 🧩 DEFINIÇÃO DAS COLUNAS (PADRÃO ANALÍTICO)
// ------------------------------------------------------
const getColumns =
  (): CustomTableColumn<AnalyticalCattlePurchasesTableData>[] => [
    {
      headerKey: "slaughterDate",
      headerName: "Dt. Abate",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "purchaseCattleOrderId",
      headerName: "Cod. OC",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleOwnerName",
      headerName: "Pecuarista",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleAdvisorName",
      headerName: "Assessor",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleQuantity",
      headerName: "Cbs",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleClassification",
      headerName: "Classif.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleWeightInArroba",
      headerName: "Peso @",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "paymentTerm",
      headerName: "Prazo",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "freightPrice",
      headerName: "R$ Frete",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "commissionPrice",
      headerName: "R$ Comissão",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "purchasePrice",
      headerName: "R$ Compra",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "headPrice",
      headerName: "$/Cab",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "arrobaPrice",
      headerName: "$/@",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "kgPrice",
      headerName: "$/KG",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalValue",
      headerName: "R$ Total",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
