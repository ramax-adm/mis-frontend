import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
  GetBusinessAuditSalesProductAgg,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Alert, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";

type SalesDiscountByProductTableData = {
  productCode?: string;
  product?: string;
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

interface SalesDiscountByProductTableProps {
  data?: Record<string, GetBusinessAuditSalesProductAgg>;
  isFetching?: boolean;
}
export function SalesDiscountByProductTable({
  data,
  isFetching,
}: SalesDiscountByProductTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns({});

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "200px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<SalesDiscountByProductTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "150px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditSalesProductAgg>;
}): SalesDiscountByProductTableData[] => {
  const response: SalesDiscountByProductTableData[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    const item = data[key];
    response.push({
      productCode: item.productCode,
      product: `${item.productCode} - ${item.productName}`,
      salesCount: item.salesCount,
      totalKg: toLocaleString(item.totalKg),
      totalFatValue: toLocaleString(item.totalFatValue),
      totalTableValue: toLocaleString(item.totalTableValue),
      totalDiff: toLocaleString(item.totalDiff),
      totalDiffPercent: item.totalDiffPercent,
      totalDiffPercentFormated: toPercent(item.totalDiffPercent),
      percentValueFormated: toPercent(item.percentValue),
      percentValue: item.percentValue,
    });
  }
  return response.sort((a, b) => a.totalDiffPercent - b.totalDiffPercent);
};

const getColumns =
  ({}: {}): CustomTableColumn<SalesDiscountByProductTableData>[] => [
    {
      headerKey: "product",
      headerName: "Produto",
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
      headerName: "% Dif.",
      sx: { fontSize: "9.5px" },
      cellSx: { fontSize: "9px" },
    },
  ];
