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

type SalesByProductTableData = {
  productCode?: string;
  product?: string;
  salesCount: number;
  totalKg: string;
  totalFatValue: string;
  totalTableValue: string;
  totalDiff: string;
  percentValueFormated: string;
  percentValue: number;
};

interface SalesByProductTableProps {
  data?: Record<string, GetBusinessAuditSalesProductAgg>;
  isFetching?: boolean;
}
export function SalesByProductTable({
  data,
  isFetching,
}: SalesByProductTableProps) {
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
    <CustomTable<SalesByProductTableData>
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
}): SalesByProductTableData[] => {
  const response: SalesByProductTableData[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    const item = data[key];
    response.push({
      productCode: item.productCode,
      product: `${item.productCode} - ${item.productName}`,
      salesCount: item.salesCount,
      totalKg: toLocaleString(item.totalKg),
      totalFatValue: toLocaleString(item.totalFatValue, 2),
      totalTableValue: toLocaleString(item.totalTableValue, 2),
      totalDiff: toLocaleString(item.totalDiff, 2),
      percentValueFormated: toPercent(item.percentValue),
      percentValue: item.percentValue,
    });
  }
  return response.sort((a, b) => b.percentValue - a.percentValue);
};

const getColumns = ({}: {}): CustomTableColumn<SalesByProductTableData>[] => [
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
