import { Alert, Box, TableCell } from "@mui/material";
import PaginatedTable from "@/components/Table/paginated-table";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { GetInvoicesItem } from "@/types/api/sales";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { SquareArrowOutUpRight } from "lucide-react";

type AnalyticalInvoicesTableData = GetInvoicesItem & {
  company: string;
  client: string;
  product: string;
  dateFormated: string;
  cfop: string;
  valueFormated: string;
  weightFormated: string;
  unitPriceFormated: string;
  details: "";
};

interface AnalyticalInvoicesTableProps {
  data?: GetInvoicesItem[];
  isFetching: boolean;
}

export function AnalyticalInvoicesTable({
  data,
  isFetching,
}: AnalyticalInvoicesTableProps) {
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
    <PaginatedTable<AnalyticalInvoicesTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "calc(100vh - 300px)" }}
    />
  );
}

// 🔧 Mapeamento e formatação dos dados
const getData = ({
  data = [],
}: {
  data?: GetInvoicesItem[];
}): AnalyticalInvoicesTableData[] => {
  return data
    .map((i) => ({
      ...i,
      company: `${i.companyCode} - ${i.companyName}`,
      client: `${i.clientCode} - ${i.clientName}`,
      dateFormated: i.date ? formatToDate(i.date) : "",
      cfop: `${i.cfopCode ?? ""} - ${i.cfopDescription ?? ""}`,
      product: `${i.productCode} - ${i.productName}`,
      weightFormated: toLocaleString(i.weightInKg ?? 0),
      unitPriceFormated: toLocaleString(i.unitPrice ?? 0, 2),
      valueFormated: toLocaleString(i.totalPrice ?? 0, 2),
      details: "" as "",
    }))
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
};

// 🧩 Definição das colunas da tabela
const getColumns = (): CustomTableColumn<AnalyticalInvoicesTableData>[] => [
  {
    headerKey: "dateFormated",
    headerName: "Data",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "nfType",
    headerName: "Tipo NF",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "nfDocumentType",
    headerName: "Documento",
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
    headerKey: "nfNumber",
    headerName: "N° NF",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "nfSituation",
    headerName: "Situação",
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
    headerKey: "cfop",
    headerName: "CFOP",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  // {
  //   headerKey: "boxAmount",
  //   headerName: "Caixas",
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  //   cellSx: { fontSize: "10px" },
  // },
  {
    headerKey: "weightFormated",
    headerName: "Peso (Kg)",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "unitPriceFormated",
    headerName: "$ Valor Un.",
    align: "right",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", textAlign: "right" },
  },
  {
    headerKey: "valueFormated",
    headerName: "$ Total",
    align: "right",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px", textAlign: "right" },
  },
];
