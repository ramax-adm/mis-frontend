import { LoaderIcon } from "@/components/Loading/loader-icon";
import { CustomTableColumn } from "@/components/Table/custom-table";
import PaginatedTable from "@/components/Table/paginated-table";
import { GetOrdersItem } from "@/types/api/sales";
import { MarketEnum } from "@/types/sensatta";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { Alert, Box, Button, TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

interface OrdersTableProps {
  data?: Record<string, GetOrdersItem>;
  isFetching: boolean;
}

type OrdersTableData = GetOrdersItem & {
  company: string;
  client: string;
  salesRepresentative: string;
  issueDateFormated: string;
  billingDateFormated: string;
  weightInKgFormated: string;
  saleUnitValueFormated: string;
  referenceTableUnitValueFormated: string;
  totalValueFormated: string;
  tableValueFormated: string;
  difValueFormated: string;
  details: "";
};
export function OrdersTable({ data, isFetching }: OrdersTableProps) {
  const [, setOrdersAnalyticalSectionStates] = useQueryStates({
    detailsOrderId: parseAsString.withDefault(""),
    orderLinesDetailsModalOpen: parseAsBoolean.withDefault(false),
  });

  const handleOpenOrderLinesDetailsModal = (orderId: string) => {
    setOrdersAnalyticalSectionStates({
      detailsOrderId: orderId,
      orderLinesDetailsModalOpen: true,
    });
  };
  const parsedData = getData({ data });
  const columns = getColumns({ handleOpenOrderLinesDetailsModal });
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 300px)",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return <Alert severity='info'>Sem Dados</Alert>;
  }

  return (
    <PaginatedTable<OrdersTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "calc(100vh - 300px)" }}
    />
  );
}

// 🔧 Mapeamento e formatação dos dados
const getData = ({
  data = {},
}: {
  data?: Record<string, GetOrdersItem>;
}): OrdersTableData[] => {
  const dataArray = Object.values(data);
  return dataArray
    .map((i) => ({
      ...i,
      company: `${i.companyCode} - ${i.companyName}`,
      client: `${i.clientCode} - ${i.clientName}`,
      salesRepresentative: `${i.salesRepresentativeCode} - ${i.salesRepresentativeName}`,
      issueDateFormated: i.issueDate ? formatToDate(i.issueDate) : "",
      billingDateFormated: i.billingDate ? formatToDate(i.billingDate) : "",
      weightInKgFormated: toLocaleString(i.weightInKg ?? 0, 2),
      saleUnitValueFormated: toLocaleString(i.saleUnitValue ?? 0, 2),
      referenceTableUnitValueFormated: toLocaleString(
        i.referenceTableUnitValue ?? 0,
        2
      ),
      totalValueFormated: toLocaleString(i.totalValue ?? 0, 2),
      tableValueFormated: toLocaleString(i.tableValue ?? 0, 2),
      difValueFormated: toLocaleString(i.difValue ?? 0, 2),
      details: "" as "",
    }))
    .sort((a, b) => {
      if (a.issueDate && b.issueDate) {
        return (
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        );
      }
      return 0;
    });
};

// 🧩 Definição das colunas da tabela
const getColumns = ({
  handleOpenOrderLinesDetailsModal,
}: {
  handleOpenOrderLinesDetailsModal: (orderId: string) => void;
}): CustomTableColumn<OrdersTableData>[] => [
  {
    headerKey: "issueDateFormated",
    headerName: "Dt. pedido",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "orderId",
    headerName: "N° Pedido",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "company",
    headerName: "Empresa",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "situation",
    headerName: "Situação",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "billingDateFormated",
    headerName: "Dt. fat",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "nfNumber",
    headerName: "NF",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "client",
    headerName: "Cliente",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "salesRepresentative",
    headerName: "Representante",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },

  {
    headerKey: "weightInKgFormated",
    headerName: "KGs",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  // {
  //   headerKey: "saleUnitValueFormated",
  //   headerName: "$ Valor un.",
  //   align: "right",
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  //   cellSx: { fontSize: "10px", textAlign: "right" },
  // },
  // {
  //   headerKey: "referenceTableUnitValueFormated",
  //   headerName: "$ Tab un.",
  //   align: "right",
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  //   cellSx: { fontSize: "10px", textAlign: "right" },
  // },
  {
    headerKey: "totalValueFormated",
    headerName: "$ Valor",
    align: "right",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", textAlign: "right" },
  },
  {
    headerKey: "tableValueFormated",
    headerName: "$ Tab",
    align: "right",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", textAlign: "right" },
  },
  {
    headerKey: "details",
    headerName: "Detalhes",
    align: "center",
    sx: { fontSize: "11px", paddingY: 0, paddingX: 0.5 },
    cellSx: { fontSize: 12, paddingX: 0.5 },
    render: (value, row) => {
      return (
        <Box
          onClick={() => handleOpenOrderLinesDetailsModal(row.orderId)}
          sx={{
            "&:hover": {
              color: grey["700"],
              cursor: "pointer",
            },
          }}
        >
          <SquareArrowOutUpRight size={12} />
        </Box>
      );
    },
  },
];
