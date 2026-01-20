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

type ReturnOccurrencesTableData = GetBusinessAuditReturnOccurrenceAgg & {
  dateFormated: string;
  invoiceDateFormated: string;
  company: string;
  client: string;
  representative: string;
  fatValue: string;
  returnValueFormated: string;
};

interface ReturnOccurrencesTableProps {
  data?: Record<string, GetBusinessAuditReturnOccurrenceAgg>;
  isFetching: boolean;
}
export function ReturnOccurrencesTable({
  data,
  isFetching,
}: ReturnOccurrencesTableProps) {
  const [, setSectionStates] = useQueryStates({
    detailsOccurrenceNumber: parseAsString.withDefault(""),
    occurrenceModalOpen: parseAsBoolean.withDefault(false),
  });
  const handleOpenDetailsModal = (occurrenceNumber: string) => {
    setSectionStates({
      detailsOccurrenceNumber: occurrenceNumber,
      occurrenceModalOpen: true,
    });
  };
  const parsedData = getData({ data });
  const columns = getColumns({ handleOpenDetailsModal });
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
    <PaginatedTable<ReturnOccurrencesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "185px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditReturnOccurrenceAgg>;
}): ReturnOccurrencesTableData[] => {
  const response = Object.values(data).map((i) => ({
    ...i,
    invoiceDateFormated: formatToDate(i.invoiceDate!),
    dateFormated: formatToDate(i.date!),
    company: `${i.companyCode} - ${i.companyName}`,
    client: `${i.clientCode} - ${i.clientName}`,
    representative: `${i.salesRepresentativeCode} - ${i.salesRepresentativeName}`,
    fatValue: toLocaleString(i.invoiceValue ?? 0),
    returnValueFormated: toLocaleString(i.returnValue ?? 0),
  }));
  return response.sort(
    (a, b) => Number(b.occurrenceNumber) - Number(a.occurrenceNumber)
  );
};

const getColumns = ({
  handleOpenDetailsModal,
}: {
  handleOpenDetailsModal: (occurrenceNumber: string) => void;
}): PaginatedTableColumn<ReturnOccurrencesTableData>[] => [
  {
    headerKey: "occurrenceNumber",
    headerName: "B.O",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
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
    headerKey: "returnType",
    headerName: "Tipo",
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
    headerKey: "invoiceNfNumber",
    headerName: "NF Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "returnNfNumber",
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
    headerKey: "occurrenceNumber",
    headerName: "Detalhes",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1, fontSize: 9.5 },
    cellSx: { fontSize: 12, paddingX: 1 },
    render: (value, row) => (
      <Box
        onClick={() => handleOpenDetailsModal(row.occurrenceNumber)}
        sx={{
          "&:hover": {
            color: grey["700"],
            cursor: "pointer",
          },
        }}
      >
        <SquareArrowOutUpRight size={12} />
      </Box>
    ),
  },
];
