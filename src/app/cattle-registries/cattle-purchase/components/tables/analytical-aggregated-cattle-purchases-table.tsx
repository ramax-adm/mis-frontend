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
  cattleOwner: string;
  company: string;
  cattleAdvisor: string;
  cattleQuantityFormated: string;
  weightInArrobaFormated: string;
  weightInKgFormated: string;
  freightPriceFormated: string;
  purchasePriceFormated: string;
  commissionPriceFormated: string;
  totalValueFormated: string;
  arrobaPriceFormated: string;
  headPriceFormated: string;
  kgPriceFormated: string;
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
        cattleOwner: `${i.cattleOwnerCode} - ${i.cattleOwnerName}`,
        company: `${i.companyCode} - ${i.companyName}`,
        cattleAdvisor: `${i.cattleAdvisorCode} - ${i.cattleAdvisorName}`,
        cattleQuantityFormated: toLocaleString(i.cattleQuantity ?? 0, 0),
        weightInArrobaFormated: toLocaleString(i.weightInArroba ?? 0, 2),
        weightInKgFormated: toLocaleString(i.weightInKg ?? 0, 2),
        freightPriceFormated: toLocaleString(i.freightPrice ?? 0, 2),
        purchasePriceFormated: toLocaleString(i.purchasePrice ?? 0, 2),
        commissionPriceFormated: toLocaleString(i.commissionPrice ?? 0, 2),
        totalValueFormated: toLocaleString(i.totalValue ?? 0, 2),
        arrobaPriceFormated: toLocaleString(i.arrobaPrice ?? 0, 2),
        headPriceFormated: toLocaleString(i.headPrice ?? 0, 2),
        kgPriceFormated: toLocaleString(i.kgPrice ?? 0, 2),
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
      headerKey: "company",
      headerName: "Empresa",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleOwner",
      headerName: "Pecuarista",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleAdvisor",
      headerName: "Assessor",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "cattleQuantityFormated",
      headerName: "Cabeças",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "weightInArrobaFormated",
      headerName: "Peso @",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "weightInKgFormated",
      headerName: "Peso KG",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "freightPriceFormated",
      headerName: "$ Frete",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "commissionPriceFormated",
      headerName: "$ Comissão",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "purchasePriceFormated",
      headerName: "$ Compra",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "headPriceFormated",
      headerName: "$/Cab",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "arrobaPriceFormated",
      headerName: "$/@",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "kgPriceFormated",
      headerName: "$/KG",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalValueFormated",
      headerName: "$ Total",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
