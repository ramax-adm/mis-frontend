import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditReturnOccurrenceAgg,
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
} from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";
import { LoaderIcon } from "../customized/loader-icon";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import { formatToDate } from "@/utils/formatToDate";
import { OrderLine, ReturnOccurrences } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { ReturnOccurrence } from "@/types/business-audit";

type ReturnOccurrencesTableData = ReturnOccurrence & {
  product: string;
  fatValue: string;
  returnValueFormated: string;
  fatWeightInKgFormated: string;
  returnWeightInKgFormated: string;
};

interface ReturnOccurrencesByItemDetailsTableProps {
  data?: ReturnOccurrence[];
  isFetching: boolean;
}
export function ReturnOccurrencesByItemDetailsTable({
  data,
  isFetching,
}: ReturnOccurrencesByItemDetailsTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
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
    <CustomTable<ReturnOccurrencesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "185px" }}
    />
  );
}

const getData = ({
  data = [],
}: {
  data?: ReturnOccurrence[];
}): ReturnOccurrencesTableData[] => {
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
    fatValue: toLocaleString(i.invoiceValue ?? 0, 2),
    returnValueFormated: toLocaleString(i.returnValue ?? 0, 2),
    fatWeightInKgFormated: toLocaleString(i.invoiceWeightInKg ?? 0, 2),
    returnWeightInKgFormated: toLocaleString(i.returnWeightInKg ?? 0, 2),
  }));
};

const getColumns = (): PaginatedTableColumn<ReturnOccurrencesTableData>[] => [
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnType",
    headerName: "Tipo dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "invoiceQuantity",
    headerName: "Qtd Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnQuantity",
    headerName: "Qtd Dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "fatWeightInKgFormated",
    headerName: "KG Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnWeightInKgFormated",
    headerName: "KG Dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "fatValue",
    headerName: "$ Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnValueFormated",
    headerName: "$ Dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "occurrenceCause",
    headerName: "Motivo",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
];
