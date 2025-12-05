import { GetCattlePurchaseAggregatedAnalyticalDataItem } from "@/types/api/purchase";
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
type AnalyticalAggregatedCattlePurchasesTableData = {
  purchaseCattleOrderId: string;
  slaughterDate: string;
  cattleOwnerCode: string;
  cattleOwnerName: string;
  companyCode: string;
  companyName: string;
  cattleAdvisorCode: string;
  cattleAdvisorName: string;
  cattleQuantityFormated: string;
  freightPriceFormated: string;
  purchasePriceFormated: string;
  commissionPriceFormated: string;
  totalValueFormated: string;
};

interface AnalyticalAggregatedCattlePurchasesTableProps {
  data?: GetCattlePurchaseAggregatedAnalyticalDataItem;
  isFetching?: boolean;
}

// ------------------------------------------------------
// ✅ COMPONENTE PADRONIZADO
// ------------------------------------------------------
export function AnalyticalAggregatedCattlePurchasesTable({
  data,
  isFetching = false,
}: AnalyticalAggregatedCattlePurchasesTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const haveSomeData = parsedData.length > 0;

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
    <PaginatedTable<AnalyticalAggregatedCattlePurchasesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "calc(100vh - 270px)" }}
    />
  );
}

// ------------------------------------------------------
// 🔧 MAPEAMENTO + FORMATAÇÃO DOS DADOS
// ------------------------------------------------------
const getData = ({
  data,
}: {
  data?: GetCattlePurchaseAggregatedAnalyticalDataItem;
}): AnalyticalAggregatedCattlePurchasesTableData[] => {
  if (!data) return [];

  const keys = Object.keys(data);

  return keys
    .map((key) => {
      const i = data[key];

      return {
        purchaseCattleOrderId: key,
        slaughterDate: i.slaughterDate ? formatToDate(i.slaughterDate) : "",
        cattleOwnerCode: i.cattleOwnerCode,
        cattleOwnerName: i.cattleOwnerName,
        companyCode: i.companyCode,
        companyName: i.companyName,
        cattleAdvisorCode: i.cattleAdvisorCode,
        cattleAdvisorName: i.cattleAdvisorName,
        cattleQuantityFormated: toLocaleString(i.cattleQuantity ?? 0, 0),
        freightPriceFormated: toLocaleString(i.freightPrice ?? 0, 2),
        purchasePriceFormated: toLocaleString(i.purchasePrice ?? 0, 2),
        commissionPriceFormated: toLocaleString(i.commissionPrice ?? 0, 2),
        totalValueFormated: toLocaleString(i.totalValue ?? 0, 2),
      };
    })
    .sort((a, b) => {
      const da = new Date(a.slaughterDate).getTime();
      const db = new Date(b.slaughterDate).getTime();
      return da - db;
    });
};

// ------------------------------------------------------
// 🧩 DEFINIÇÃO DAS COLUNAS (PADRÃO ANALÍTICO)
// ------------------------------------------------------
const getColumns =
  (): CustomTableColumn<AnalyticalAggregatedCattlePurchasesTableData>[] => [
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
      headerKey: "cattleQuantityFormated",
      headerName: "Cbs",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "freightPriceFormated",
      headerName: "R$ Frete",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "commissionPriceFormated",
      headerName: "R$ Comissão",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "purchasePriceFormated",
      headerName: "R$ Compra",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalValueFormated",
      headerName: "R$ Total",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
