import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesClientAgg,
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
  GetBusinessAuditSalesProductAgg,
  GetBusinessAuditSalesRepresentativeAgg,
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

type SalesByRepresentativeTableData = {
  representative?: string;
  salesCount: number;
  totalKg: string;
  totalFatValue: string;
  totalTableValue: string;
  totalDiff: string;
  percentValue: string;
};

interface SalesByRepresentativeTableProps {
  data?: Record<string, GetBusinessAuditSalesRepresentativeAgg>;
  isFetching?: boolean;
}
export function SalesByRepresentativeTable({
  data,
  isFetching,
}: SalesByRepresentativeTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns({});

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<SalesByRepresentativeTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "288px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditSalesRepresentativeAgg>;
}): SalesByRepresentativeTableData[] => {
  const response: SalesByRepresentativeTableData[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    const item = data[key];
    response.push({
      representative: `${item.salesRepresentativeCode} - ${item.salesRepresentativeName}`,
      salesCount: item.salesCount,
      totalKg: toLocaleString(item.totalKg),
      totalFatValue: toLocaleString(item.totalFatValue, 2),
      totalTableValue: toLocaleString(item.totalTableValue, 2),
      totalDiff: toLocaleString(item.totalDiff, 2),
      percentValue: toPercent(item.percentValue),
    });
  }
  return response;
};

const getColumns =
  ({}: {}): CustomTableColumn<SalesByRepresentativeTableData>[] => [
    {
      headerKey: "representative",
      headerName: "Representante",
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
      headerKey: "percentValue",
      headerName: "%",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
  ];
