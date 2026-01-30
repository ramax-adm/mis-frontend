export function InvoiceTraceabilityByCompanyTable() {}
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditReturnOccurrenceByCauseAgg,
  GetBusinessAuditReturnOccurrenceByClientAgg,
} from "@/types/api/business-audit";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";
import { toLocaleString } from "@/utils/number.utils";
import { toPercent } from "@/utils/string.utils";
import { MarketEnum } from "@/types/sensatta";
import { formatToDate } from "@/utils/formatToDate";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import PaginatedTable from "@/components/Table/paginated-table";

type InvoiceTraceabilitySalesByInvoiceTableData =
  GetBusinessAuditInvoiceTraceabilityDataResponse["salesByInvoice"]["data"][1] & {
    nfId: string;
    dateFormated: string;
    company: string;
    client: string;
    marketFormated: string;
    weightInKgFormated: string;
    invoiceValueFormated: string;
    referenceTableValueFormated: string;
    difValueFormated: string;
  };

interface InvoiceTraceabilitySalesByInvoiceTableProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["salesByInvoice"]["data"];
  isFetching: boolean;
  setSectionStates: (
    states: Partial<{
      invoiceTraceabilityNfId: string;
      invoiceTraceabilityInvoiceDetailsModalOpen: boolean;
    }>,
  ) => void;
}
export function InvoiceTraceabilitySalesByInvoiceTable({
  data,
  isFetching,
  setSectionStates,
}: InvoiceTraceabilitySalesByInvoiceTableProps) {
  const handleOpenDetailsModal = (nfId: string) => {
    setSectionStates({
      invoiceTraceabilityNfId: nfId,
      invoiceTraceabilityInvoiceDetailsModalOpen: true,
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
          height: "290px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <PaginatedTable<InvoiceTraceabilitySalesByInvoiceTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "255px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["salesByInvoice"]["data"];
}): InvoiceTraceabilitySalesByInvoiceTableData[] => {
  const marketMap = {
    [MarketEnum.ME]: "ME",
    [MarketEnum.MI]: "MI",
  } as Record<string, string>;

  return Object.entries(data)
    .map(([key, item]) => ({
      ...item,
      nfId: key,
      dateFormated: formatToDate(item.date!),
      marketFormated: marketMap[item.market ?? ""],
      company: `${item.companyCode} - ${item.companyName}`,
      client: `${item.clientCode} - ${item.clientName}`,
      weightInKgFormated: toLocaleString(item.totalKg ?? 0),
      invoiceValueFormated: toLocaleString(item.totalFatValue ?? 0),
      referenceTableValueFormated: toLocaleString(item.totalTableValue ?? 0),
      difValueFormated: toLocaleString(item.totalDiff ?? 0),
    }))
    .sort((a, b) => {
      if (!a.date || !b.date) {
        return 0;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

const getColumns = ({
  handleOpenDetailsModal,
}: {
  handleOpenDetailsModal: (nfId: string) => void;
}): CustomTableColumn<InvoiceTraceabilitySalesByInvoiceTableData>[] => [
  {
    headerKey: "dateFormated",
    headerName: "Data",
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
    headerKey: "marketFormated",
    headerName: "Mercado",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "orderNumber",
    headerName: "Pedido",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "nfNumber",
    headerName: "NF",
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
    headerKey: "weightInKgFormated",
    headerName: "KG",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "invoiceValueFormated",
    headerName: "$ Fat.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "referenceTableValueFormated",
    headerName: "$ Tab.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "difValueFormated",
    headerName: "$ Dif.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "nfNumber",
    headerName: "Detalhes",
    align: "center",
    sx: { paddingY: 0.5, paddingX: 1, fontSize: 9.5 },
    cellSx: { fontSize: 12, paddingX: 1 },
    render: (value, row) => (
      <Box
        onClick={() => handleOpenDetailsModal(row.nfId)}
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
