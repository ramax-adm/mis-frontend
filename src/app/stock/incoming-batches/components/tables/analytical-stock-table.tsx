import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import {
  GetStockInconingBatchesAnalyticalResponse,
  GetStockInconingBatchesResumeResponse,
} from "@/types/api/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";
import { toLocaleString } from "@/utils/string.utils";
import { Alert, TableCell, Typography } from "@mui/material";
import { green, indigo, orange, red } from "@mui/material/colors";

type StockAnalyticalParsedData = {
  company: string;
  market: string;
  productLine: string;
  product: string;
  basePriceCar: string;
  totalPrice: string;
  totalWeightInKg: string;
  totalExpiredWeightInKg: string;
};

interface StockIncomingBatchesAnalyticalTableProps {
  data?: GetStockInconingBatchesAnalyticalResponse["data"];
}
export function StockIncomingBatchesAnalyticalTable({
  data,
}: StockIncomingBatchesAnalyticalTableProps) {
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
        <PaginatedTable<StockAnalyticalParsedData>
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

const getTitleGroups = ({ data }: StockIncomingBatchesAnalyticalTableProps) => {
  const byExpireKeysSet = new Set<string>();
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byExpireRange).forEach((j) => byExpireKeysSet.add(j))
  );
  return [
    {
      label: "Produto",
      colSpan: 7,
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
  ];
};

const getColumns = ({
  data,
}: StockIncomingBatchesAnalyticalTableProps): PaginatedTableColumn<StockAnalyticalParsedData>[] => {
  const byExpireKeysSet = new Set<string>();
  Object.values(data ?? {}).forEach((i) =>
    Object.keys(i.totals.byExpireRange).forEach((j) => byExpireKeysSet.add(j))
  );
  const byExpireKeyColors = [red["400"], orange["400"], green["400"]];
  const byExpireKeyCellColors = [red["300"], orange["300"], green["300"]];
  return [
    {
      headerKey: "company",
      headerName: "Empresa",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#E9F2FB", fontSize: "9px" },
    },
    {
      headerKey: "market",
      headerName: "Mercado",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#E9F2FB", fontSize: "9px" },
    },
    {
      headerKey: "productLine",
      headerName: "Linha",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#E9F2FB", fontSize: "9px" },
    },
    {
      headerKey: "product",
      headerName: "Produto",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#E9F2FB", fontSize: "9px" },
    },
    {
      headerKey: "totalWeightInKg",
      headerName: "Total KG",
      align: "center",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#A6C9EC", fontWeight: 700, fontSize: "9px" },
    },
    {
      headerKey: "basePriceCar",
      headerName: "$/KG",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: { backgroundColor: "#A6C9EC", fontWeight: 700, fontSize: "9px" },
    },
    {
      headerKey: "totalPrice",
      headerName: "$ Total",
      align: "center",
      sx: {
        backgroundColor: "#A6C9EC",
        fontSize: "9.5px",
      },
      cellSx: {
        backgroundColor: "#A6C9EC",
        fontWeight: 700,
        fontSize: "9px",
        color: indigo["A700"],
      },
    },
    {
      headerKey: "totalExpiredWeightInKg",
      headerName: "Vencido",
      align: "center",
      render: (value) => value ?? 0,
      sx: {
        backgroundColor: "#121212",
        color: "white",
        fontSize: "9.5px",
      },
      cellSx: {
        backgroundColor: "#242424",
        color: "white",
        fontSize: "9px",
        padding: 0.5,
      },
    },
    ...Array.from(byExpireKeysSet).map((k, i) => ({
      headerName: k as any,
      headerKey: k as any,
      render: (value: any) => value ?? 0,
      sx: {
        backgroundColor: byExpireKeyColors[i] ?? "white",
        color: byExpireKeyColors[i] ? "white" : "black",
        fontSize: "9.5px",
      },
      cellSx: {
        backgroundColor: byExpireKeyCellColors[i] ?? "white",
        color: byExpireKeyCellColors[i] ? "white" : "black",
        fontSize: "9px",
        padding: 0.5,
      },
    })),
  ];
};

const getData = ({ data }: StockIncomingBatchesAnalyticalTableProps) => {
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

    return {
      company: `${item.companyCode} - ${item.companyName}`,
      market: marketMap[item.market],
      productLine: `${item.productLineCode} - ${item.productLineName}`,
      product: `${item.productCode} - ${item.productName}`,
      basePriceCar: toLocaleString(item.basePriceCar ?? 0, 2),
      totalPrice: toLocaleString(item.totals.totalPrice ?? 0),
      totalWeightInKg: toLocaleString(item.totals.weightInKg ?? 0),
      totalExpiredWeightInKg: toLocaleString(
        item.totals.expiredWeightInKg ?? 0
      ),
      ...expireRangeFormatted,
    };
  });
};
