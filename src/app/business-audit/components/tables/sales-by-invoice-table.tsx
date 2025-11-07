import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { useGetBusinessAuditSalesData } from "@/services/react-query/queries/business-audit";
import {
  GetBusinessAuditSalesDataResponse,
  GetBusinessAuditSalesInvoiceAgg,
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
import { formatToDate } from "@/utils/formatToDate";
import { MarketEnum } from "@/types/sensatta";

type SalesByInvoiceTableData = {
  company: string;
  date?: Date;
  formatedDate: string;
  nfNumber: string;
  orderNumber: string;
  cfop: string;
  nfId: string;
  market: string;
  client: string;
  salesCount: number;
  address: string;
  representative: string;
  paymentTerm: string;
  totalKg: string;
  fatValue: string;
  tableValue: string;
  additionPercent: string;
  additionValue: string;
  discountPercent: string;
  discountValue: string;
  dif: string;
  difPercent: string;
};

interface SalesByInvoiceTableProps {
  data?: Record<string, GetBusinessAuditSalesInvoiceAgg>;
  isFetching: boolean;
  setSectionStates: (
    states: Partial<{
      nfId: string;
      salesByInvoiceModalOpen: boolean;
      priceConsideration: string;
    }>
  ) => void;
}
export function SalesByInvoiceTable({
  data,
  isFetching,
  setSectionStates,
}: SalesByInvoiceTableProps) {
  const handleOpenDetailsModal = (nfId: string) => {
    setSectionStates({ nfId, salesByInvoiceModalOpen: true });
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
          height: "150px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <PaginatedTable<SalesByInvoiceTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "200px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditSalesInvoiceAgg>;
}): SalesByInvoiceTableData[] => {
  const marketMap = {
    [MarketEnum.ME]: "ME",
    [MarketEnum.MI]: "MI",
  } as Record<string, string>;
  const response: SalesByInvoiceTableData[] = [];

  const keys = Object.keys(data);

  for (const key of keys) {
    const item = data[key];

    response.push({
      company: `${item.companyCode} - ${item.companyName}`,
      date: item.date,
      formatedDate: item.date ? formatToDate(item.date) : "S/ Data",
      nfNumber: item.nfNumber ?? "N/D",
      orderNumber: item.orderNumber ?? "N/D",
      nfId: key,
      cfop: `${item.cfopCode} - ${item.cfopDescription}`,
      market: marketMap[item.market ?? ""] ?? "N/A",
      client: `${item.clientCode} - ${item.clientName}`,
      salesCount: item.salesCount ?? 0,
      representative: `${item.representativeCode} - ${item.representativeName}`,
      address: `${item.city} - ${item.uf}`,
      paymentTerm: item.paymentTerm ?? "N/A",
      totalKg: toLocaleString(item.totalKg),
      fatValue: toLocaleString(item.totalFatValue),
      tableValue: toLocaleString(item.totalTableValue),
      additionPercent: toPercent(item.additionPercent),
      additionValue: toLocaleString(item.additionValue),
      discountPercent: toPercent(item.discountPercent),
      discountValue: toLocaleString(item.discountValue),
      dif: toLocaleString(item.totalDiff),
      difPercent: toPercent(item.totalDiffPercent),
    });
  }
  return response.sort((a, b) =>
    a.date && b.date
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : 0
  );
};

const getColumns = ({
  handleOpenDetailsModal,
}: {
  handleOpenDetailsModal: (nfNumber: string) => void;
}): PaginatedTableColumn<SalesByInvoiceTableData>[] => [
  {
    headerKey: "formatedDate",
    headerName: "Dt. Fat",
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
    headerKey: "market",
    headerName: "Mercado",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "orderNumber",
    headerName: "N° Pedido",
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
    headerKey: "salesCount",
    headerName: "NF Itens",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "cfop",
    headerName: "CFOP",
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
    headerKey: "address",
    headerName: "Localidade",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "paymentTerm",
    headerName: "Prazo",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "totalKg",
    headerName: "KGs",
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
    headerKey: "tableValue",
    headerName: "$ Tab.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  // {
  //   headerKey: "additionValue",
  //   headerName: "$ Add.",
  //   sx: { fontSize: "9.5px", paddingX: 0.5 },
  //   cellSx: { fontSize: "9px" },
  // },
  // {
  //   headerKey: "additionPercent",
  //   headerName: "% Add.",
  //   sx: { fontSize: "9.5px", paddingX: 0.5 },
  //   cellSx: { fontSize: "9px" },
  // },
  // {
  //   headerKey: "discountValue",
  //   headerName: "$ Desc.",
  //   sx: { fontSize: "9.5px", paddingX: 0.5 },
  //   cellSx: { fontSize: "9px" },
  // },
  // {
  //   headerKey: "discountPercent",
  //   headerName: "% Desc.",
  //   sx: { fontSize: "9.5px", paddingX: 0.5 },
  //   cellSx: { fontSize: "9px" },
  // },
  {
    headerKey: "dif",
    headerName: "$ Dif.",
    sx: { fontSize: "9.5px", paddingX: 0.5 },
    cellSx: { fontSize: "9px" },
  },
  {
    headerKey: "difPercent",
    headerName: "% Dif.",
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
