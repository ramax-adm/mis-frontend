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
import { OrderLine, ReturnOccurrences } from "@/types/sales";
import { MarketEnum } from "@/types/sensatta";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";

type ReturnOccurrencesTableData = ReturnOccurrences & {
  dateFormated: string;
  invoiceDateFormated: string;
  company: string;
  client: string;
  representative: string;
  fatValue: string;
  returnValueFormated: string;
};

interface ReturnOccurrencesTableProps {
  data?: ReturnOccurrences[];
  isFetching: boolean;
}
export function ReturnOccurrencesTable({
  data,
  isFetching,
}: ReturnOccurrencesTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <PaginatedTable<ReturnOccurrencesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "220px" }}
    />
  );
}

const getData = ({
  data = [],
}: {
  data?: ReturnOccurrences[];
}): ReturnOccurrencesTableData[] => {
  return data.map((i) => ({
    ...i,
    invoiceDateFormated: formatToDate(i.invoiceDate!),
    dateFormated: formatToDate(i.date!),
    company: `${i.companyCode} - ${i.companyName}`,
    client: `${i.clientCode} - ${i.clientName}`,
    representative: `${i.salesRepresentativeCode} - ${i.salesRepresentativeName}`,
    fatValue: toLocaleString(i.invoiceValue ?? 0),
    returnValueFormated: toLocaleString(i.returnValue ?? 0),
  }));
};

const getColumns = (): PaginatedTableColumn<ReturnOccurrencesTableData>[] => [
  {
    headerKey: "invoiceDateFormated",
    headerName: "Dt. Fat",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "dateFormated",
    headerName: "Dt. Dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "occurrenceNumber",
    headerName: "B.O",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "company",
    headerName: "Empresa",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "invoiceNf",
    headerName: "NF Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnNf",
    headerName: "NF Dev.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "client",
    headerName: "Cliente",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "representative",
    headerName: "Representante",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnQuantity",
    headerName: "Qtd. itens",
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
  {
    headerKey: "returnType",
    headerName: "Tipo",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
];
