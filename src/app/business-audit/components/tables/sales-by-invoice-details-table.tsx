import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
} from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import { formatToDate } from "@/utils/formatToDate";
import { OrderLine } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";

type SalesByInvoiceDetailsTableData = OrderLine & {
  marketFormated: string;
  difPrice: number;
  totalFatPrice: number;
  totalTablePrice: number;
  totalDifPrice: number;
};

interface SalesByInvoiceDetailsTableProps {
  data?: OrderLine[];
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
  data?: OrderLine[];
}): SalesByInvoiceDetailsTableData[] => {
  const marketMap = {
    [MarketEnum.ME]: "ME",
    [MarketEnum.MI]: "MI",
  } as Record<string, string>;
  return data.map((i) => ({
    ...i,
    marketFormated: marketMap[i.market ?? ""] ?? "N/A",
    difPrice: (i.saleUnitValue || 0) - (i.referenceTableUnitValue || 0),
    totalFatPrice: (i.saleUnitValue || 0) * (i.weightInKg || 0),
    totalTablePrice: (i.referenceTableUnitValue || 0) * (i.weightInKg || 0),
    totalDifPrice:
      ((i.saleUnitValue || 0) - (i.referenceTableUnitValue || 0)) *
      (i.weightInKg || 0),
  }));
};

const getColumns = (): CustomTableColumn<SalesByInvoiceDetailsTableData>[] => [
  {
    headerKey: "productCode",
    headerName: "Cod produto",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "productName",
    headerName: "Produto",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "marketFormated",
    headerName: "Mercado",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "nfNumber",
    headerName: "NF",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "situation",
    headerName: "Situação",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "quantity",
    headerName: "Qtd. itens",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "weightInKg",
    headerName: "Peso KG",
    render: (value) => toLocaleString(value as number),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "currency",
    headerName: "Moeda",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "saleUnitValue",
    headerName: "Preço Un.",
    render: (value) => toLocaleString(value as number, 2),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "referenceTableUnitValue",
    headerName: "Preço Tab. Un.",
    render: (value) => toLocaleString(value as number, 2),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "difPrice",
    render: (value) => toLocaleString(value as number, 2),
    headerName: "Desc.",
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "totalFatPrice",
    headerName: "Total NF",
    render: (value) => toLocaleString(value as number, 2),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "totalTablePrice",
    headerName: "Total Tab.",
    render: (value) => toLocaleString(value as number, 2),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "totalDifPrice",
    headerName: "Total Desc.",
    render: (value) => toLocaleString(value as number, 2),
    sx: { fontSize: "10px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
];
