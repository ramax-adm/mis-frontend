import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
  GetOrderLineItem,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Box, TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";

import { formatToDate } from "@/utils/formatToDate";
import { OrderLine } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";

type SalesByInvoiceDetailsTableData = GetOrderLineItem & {
  product: string;
  marketFormated: string;
};

interface SalesByInvoiceDetailsTableProps {
  data?: GetOrderLineItem[];
  isFetching: boolean;
}
export function SalesByInvoiceDetailsTable({
  data,
  isFetching,
}: SalesByInvoiceDetailsTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

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
    <CustomTable<SalesByInvoiceDetailsTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "300px" }}
    />
  );
}

const getData = ({
  data = [],
}: {
  data?: GetOrderLineItem[];
}): SalesByInvoiceDetailsTableData[] => {
  const marketMap = {
    [MarketEnum.ME]: "ME",
    [MarketEnum.MI]: "MI",
  } as Record<string, string>;
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
    marketFormated: marketMap[i.market ?? ""] ?? "N/A",
  }));
};

const getColumns = (): CustomTableColumn<SalesByInvoiceDetailsTableData>[] => [
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", paddingX: 0.5 },
  },
  {
    headerKey: "marketFormated",
    headerName: "Mercado",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", paddingX: 0.5 },
  },
  {
    headerKey: "situation",
    headerName: "Situação",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", paddingX: 0.5 },
  },
  {
    headerKey: "quantity",
    headerName: "Qtd.",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", paddingX: 0.5 },
  },
  {
    headerKey: "weightInKg",
    headerName: "KGs",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "currency",
    headerName: "Moeda",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", paddingX: 0.5 },
  },
  {
    headerKey: "saleUnitValue",
    headerName: "$ Un.",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number, 2)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "referenceTableUnitValue",
    headerName: "$ Tab. Un.",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number, 2)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
  // {
  //   headerKey: "additionPercent",
  //   headerName: "% Add.",
  //   render: (value) => (
  //     <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
  //       {toPercent(value as number)}
  //     </TableCell>
  //   ),
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  // },
  // {
  //   headerKey: "discountPercent",
  //   headerName: "% Desc.",
  //   render: (value) => (
  //     <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
  //       {toPercent(value as number)}
  //     </TableCell>
  //   ),
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  // },

  {
    headerKey: "invoicingValue",
    headerName: "$ NF",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number, 2)}
      </TableCell>
    ),
    sx: { fontSize: "11px", padding: 0.5 },
  },
  {
    headerKey: "tableValue",
    headerName: "$ Tab.",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number, 2)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "dif",
    headerName: "$ Dif.",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toLocaleString(value as number, 2)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
  {
    headerKey: "difPercent",
    headerName: "% Dif.",
    render: (value) => (
      <TableCell sx={{ fontSize: "10px", padding: 0.5 }}>
        {toPercent(value as number)}
      </TableCell>
    ),
    sx: { fontSize: "11px", paddingX: 0.5 },
  },
];
