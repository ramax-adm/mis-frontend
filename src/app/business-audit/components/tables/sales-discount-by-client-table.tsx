import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { GetBusinessAuditSalesClientAgg } from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";

type SalesDiscountByClientTableData = {
  client: string;
  salesCount: number;
  totalKg: string;
  totalFatValue: string;
  totalTableValue: string;
  totalDiff: string;
  totalDiffPercent: number;
  totalDiffPercentFormated: string;
  percentValueFormated: string;
  percentValue: number;
};

interface SalesDiscountByClientTableProps {
  data?: Record<string, GetBusinessAuditSalesClientAgg>;
  isFetching?: boolean;
}
export function SalesDiscountByClientTable({
  data,
  isFetching,
}: SalesDiscountByClientTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns({});

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<SalesDiscountByClientTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "150px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditSalesClientAgg>;
}): SalesDiscountByClientTableData[] => {
  const response: SalesDiscountByClientTableData[] = [];

  const keys = Object.keys(data);
  const totalDiscounts = Object.values(data).reduce(
    (acc, item) => acc + item.totalDiff,
    0
  );

  for (const key of keys) {
    const item = data[key];

    const percentValue = item.totalDiff / totalDiscounts;

    response.push({
      client: `${item.clientCode} - ${item.clientName}`,
      salesCount: item.salesCount,
      totalKg: toLocaleString(item.totalKg),
      totalFatValue: toLocaleString(item.totalFatValue),
      totalTableValue: toLocaleString(item.totalTableValue),
      totalDiff: toLocaleString(item.totalDiff),
      totalDiffPercent: item.totalDiffPercent,
      totalDiffPercentFormated: toPercent(item.totalDiffPercent),

      percentValueFormated: toPercent(percentValue),
      percentValue: percentValue,
    });
  }
  return response.sort((a, b) => a.totalDiffPercent - b.totalDiffPercent);
};

const getColumns =
  ({}: {}): CustomTableColumn<SalesDiscountByClientTableData>[] => [
    {
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "salesCount",
      headerName: "Qtd.",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalKg",
      headerName: "KGs",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalFatValue",
      headerName: "$ Fat.",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalTableValue",
      headerName: "$ Tab.",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalDiff",
      headerName: "$ Dif.",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "totalDiffPercentFormated",
      headerName: "% Dif",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
  ];
