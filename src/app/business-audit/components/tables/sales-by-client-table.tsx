import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesClientAgg,
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
  GetBusinessAuditSalesProductAgg,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";

type SalesByClientTableData = {
  client: string;
  salesCount: number;
  totalKg: string;
  totalFatValue: string;
  totalTableValue: string;
  totalDiff: string;
  percentValueFormated: string;
  percentValue: number;
};

interface SalesByClientTableProps {
  data?: Record<string, GetBusinessAuditSalesClientAgg>;
  isFetching?: boolean;
}
export function SalesByClientTable({
  data,
  isFetching,
}: SalesByClientTableProps) {
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
    <CustomTable<SalesByClientTableData>
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
}): SalesByClientTableData[] => {
  const response: SalesByClientTableData[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    const item = data[key];
    response.push({
      client: `${item.clientName ?? ""}`,
      salesCount: item.salesCount,
      totalKg: toLocaleString(item.totalKg, 2),
      totalFatValue: toLocaleString(item.totalFatValue, 2),
      totalTableValue: toLocaleString(item.totalTableValue, 2),
      totalDiff: toLocaleString(item.totalDiff, 2),
      percentValueFormated: toPercent(item.percentValue),
      percentValue: item.percentValue,
    });
  }
  return response.sort((a, b) => b.percentValue - a.percentValue);
};

const getColumns = ({}: {}): CustomTableColumn<SalesByClientTableData>[] => [
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
    headerName: "Total KG",
    sx: { fontSize: "9.5px" },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "totalDiff",
    headerName: "Desc.",
    sx: { fontSize: "9.5px" },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "percentValueFormated",
    headerName: "%",
    sx: { fontSize: "9.5px" },
    cellSx: { fontSize: "9px" },
  },
];
