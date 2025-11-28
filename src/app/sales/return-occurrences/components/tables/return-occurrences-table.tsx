import { Alert, Box } from "@mui/material";
import PaginatedTable from "@/components/Table/paginated-table";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { GetInvoicesItem } from "@/types/api/sales";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { ReturnOccurrence } from "@/types/business-audit";

type AnalyticalReturnOccurrencesTableData = ReturnOccurrence & {
  dateFormated: string;
  invoiceDateFormated: string;
  company: string;
  product: string;
  client: string;
  representative: string;
  returnWeightInKgFormated: string;
  returnValueFormated: string;
};

interface AnalyticalReturnOccurrencesTableProps {
  data?: ReturnOccurrence[];
  isFetching: boolean;
}

export function AnalyticalReturnOccurrencesTable({
  data = [],
  isFetching,
}: AnalyticalReturnOccurrencesTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 280px)",
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
    <PaginatedTable<AnalyticalReturnOccurrencesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "calc(100vh - 280px)" }}
    />
  );
}

// 🔧 Mapeamento e formatação dos dados
const getData = ({
  data = [],
}: {
  data?: ReturnOccurrence[];
}): AnalyticalReturnOccurrencesTableData[] => {
  return data
    .map((i) => ({
      ...i,
      dateFormated: i.date ? formatToDate(i.date) : "",
      invoiceDateFormated: i.invoiceDate ? formatToDate(i.invoiceDate) : "",
      company: `${i.companyCode} - ${i.companyName}`,
      product: `${i.productCode} - ${i.productName}`,
      client: `${i.clientCode} - ${i.clientName}`,
      representative: `${i.salesRepresentativeCode} - ${i.salesRepresentativeName}`,
      returnWeightInKgFormated: toLocaleString(i.returnWeightInKg ?? 0),
      returnValueFormated: toLocaleString(i.returnValue ?? 0, 2),
    }))
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
};

// 🧩 Definição das colunas da tabela
const getColumns =
  (): CustomTableColumn<AnalyticalReturnOccurrencesTableData>[] => [
    {
      headerKey: "dateFormated",
      headerName: "Data",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "invoiceDateFormated",
      headerName: "Data NF",
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
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "product",
      headerName: "Produto",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "invoiceNf",
      headerName: "NF Fat.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "returnNf",
      headerName: "NF Dev.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "occurrenceNumber",
      headerName: "B.O",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "occurrenceCause",
      headerName: "Causa",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "returnType",
      headerName: "Tipo Dev.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "returnWeightInKgFormated",
      headerName: "KGs",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },

    {
      headerKey: "returnQuantity",
      headerName: "Qtd.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "returnValueFormated",
      headerName: "$ Dev.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
  ];
