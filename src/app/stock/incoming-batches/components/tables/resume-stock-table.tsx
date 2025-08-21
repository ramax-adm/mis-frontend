import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";
import { toLocaleString } from "@/utils/string.utils";
import { Alert, TableCell, Typography } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";

interface StockIncomingBatchesResumeTableProps {
  data?: GetStockInconingBatchesResumeResponse["data"];
}
export function StockIncomingBatchesResumeTable({
  data,
}: StockIncomingBatchesResumeTableProps) {
  const columns = getColumns({ data });
  const titleGroups = getTitleGroups({ data });
  const parsedData = getData({ data });

  const haveSomeData = parsedData.length > 0;

  return (
    <>
      <Typography fontSize={"12px"} fontWeight={700}>
        Produtos em estoque
      </Typography>
      {!haveSomeData && <Alert severity='info'>Sem dados!</Alert>}
      {haveSomeData && (
        <PaginatedTable<{
          market: string;
          productLine: string;
          product: string;
          totalWeightInKg: string;
          totalExpiredWeightInKg: string;
        }>
          columns={columns}
          rows={parsedData}
          titleGroups={titleGroups}
          tableStyles={{
            height: "calc(100vh - 250px);",
          }}
        />
      )}
    </>
  );
}

const getTitleGroups = ({ data }: StockIncomingBatchesResumeTableProps) => {
  const byExpireKeysSet = new Set<string>();
  const byCompanyKeysSet = new Set<string>();
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byExpireRange).forEach((j) => byExpireKeysSet.add(j))
  );
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byCompany).forEach((j) => byCompanyKeysSet.add(j))
  );

  return [
    {
      label: "Produto",
      colSpan: 4,
      sx: {
        backgroundColor: "#4D93D9",
        color: "white",
      },
    },
    {
      label: "Por Vencimento (KG)",
      colSpan: byExpireKeysSet.size + 1, // pq inclui o vencido
      sx: {
        backgroundColor: "#eb513dff",
        color: "white",
      },
    },
    {
      label: "Por Empresa (KG)",
      colSpan: byCompanyKeysSet.size,
      sx: {
        backgroundColor: "#595959",
        color: "white",
      },
    },
  ];
};

const getColumns = ({
  data,
}: StockIncomingBatchesResumeTableProps): PaginatedTableColumn<{
  market: string;
  productLine: string;
  product: string;
  totalWeightInKg: string;
  totalExpiredWeightInKg: string;
}>[] => {
  const byExpireKeysSet = new Set<string>();
  const byCompanyKeysSet = new Set<string>();
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byExpireRange).forEach((j) => byExpireKeysSet.add(j))
  );
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byCompany).forEach((j) => byCompanyKeysSet.add(j))
  );

  const byExpireKeyColors = [red["400"], orange["400"], green["400"]];
  const byExpireKeyCellColors = [red["300"], orange["300"], green["300"]];
  return [
    {
      headerKey: "market",
      headerName: "Mercado",
      sx: {
        backgroundColor: "#A6C9EC",
      },
      cellSx: { backgroundColor: "#E9F2FB" },
    },
    {
      headerKey: "productLine",
      headerName: "Linha",
      sx: {
        backgroundColor: "#A6C9EC",
      },
      cellSx: { backgroundColor: "#E9F2FB" },
    },
    {
      headerKey: "product",
      headerName: "Produto",

      sx: {
        backgroundColor: "#A6C9EC",
      },
      cellSx: { backgroundColor: "#E9F2FB" },
    },
    {
      headerKey: "totalWeightInKg",
      headerName: "Total KG",
      align: "center",
      render: (value) => value ?? 0,
      sx: {
        backgroundColor: "#A6C9EC",
      },
      cellSx: { backgroundColor: "#A6C9EC", fontWeight: 700 },
    },
    {
      headerKey: "totalExpiredWeightInKg",
      headerName: "Vencido",
      align: "center",
      render: (value) => value ?? 0,
      sx: {
        backgroundColor: "#121212",
        color: "white",
      },
      cellSx: {
        backgroundColor: "#242424",
        color: "white",
        fontSize: "10px",
        padding: 0.5,
      },
    },
    ...Array.from(byExpireKeysSet).map((k, i) => ({
      headerName: k as any,
      headerKey: k as any,
      align: "center",
      render: (value: any) => value ?? 0,
      sx: {
        backgroundColor: byExpireKeyColors[i] ?? "white",
        color: byExpireKeyColors[i] ? "white" : "black",
      },
      cellSx: {
        backgroundColor: byExpireKeyCellColors[i] ?? "white",
        color: byExpireKeyCellColors[i] ? "white" : "black",
        fontSize: "10px",
        padding: 0.5,
      },
    })),
    ...Array.from(byCompanyKeysSet).map((k) => ({
      headerName: k as any,
      headerKey: k as any,
      render: (value: any) => value ?? 0,
      sx: {
        backgroundColor: "#BFBFBF",
      },
      cellSx: { backgroundColor: "#f5f5f5", fontSize: "10px", padding: 0.5 },
    })),
  ];
};

const getData = ({ data }: StockIncomingBatchesResumeTableProps) => {
  const marketMap = {
    [MarketEnum.ME]: "ME",
    [MarketEnum.MI]: "MI",
  } as Record<string, string>;

  const dataValues = Object.values(data ?? {});

  return dataValues.map((item) => {
    // formata os prazos
    const expireRangeFormatted = Object.fromEntries(
      Object.entries(item.totals.byExpireRange).map(([key, value]) => [
        key,
        toLocaleString(value ?? 0),
      ])
    );

    // formata as empresas
    const byCompanyFormatted = Object.fromEntries(
      Object.entries(item.totals.byCompany).map(([key, value]) => [
        key,
        toLocaleString(value ?? 0),
      ])
    );

    return {
      market: marketMap[item.market],
      productLine: `${item.productLineCode} - ${item.productLineName}`,
      product: `${item.productCode} - ${item.productName}`,
      totalWeightInKg: toLocaleString(item.totals.weightInKg),
      totalExpiredWeightInKg: toLocaleString(item.totals.expiredWeightInKg),
      ...expireRangeFormatted,
      ...byCompanyFormatted,
    };
  });
};
