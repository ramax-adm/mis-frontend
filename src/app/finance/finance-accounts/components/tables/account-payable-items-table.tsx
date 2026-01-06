import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Alert, Box } from "@mui/material";
import { AccountPayableItem, AccountReceivableItem } from "@/types/finance";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { formatDateToDDMMYYYY, formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import PaginatedTable from "@/components/Table/paginated-table";

type AccountsPayableTableData = AccountPayableItem & {
  company: string;
  client: string;
  baseDateFormated: string;
  issueDateFormated: string;
  dueDateFormated: string;
  valueFormated: string;
};

interface AccountsPayableTableProps {
  data?: AccountPayableItem[];
  isFetching: boolean;
}
export function AccountsPayableTable({
  data,
  isFetching,
}: AccountsPayableTableProps) {
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
          height: "calc(100vh - 300px);",
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
    <PaginatedTable<AccountsPayableTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "calc(100vh - 300px);" }}
    />
  );
}

const getData = ({
  data = [],
}: {
  data?: AccountPayableItem[];
}): AccountsPayableTableData[] => {
  return data
    .map((i) => ({
      ...i,
      company: `${i.companyCode} - ${i.companyName}`,
      client: `${i.clientCode} - ${i.clientName}`,
      baseDateFormated: i.baseDate ? formatToDate(i.baseDate) : "",
      issueDateFormated: i.issueDate ? formatToDate(i.issueDate) : "",
      dueDateFormated: i.dueDate ? formatToDate(i.dueDate) : "",

      valueFormated: toLocaleString(i.value ?? 0, 2),
    }))
    .sort((a, b) => {
      if (a.issueDate && b.issueDate) {
        return (
          new Date(b.issueDate)?.getTime() - new Date(a.issueDate)?.getTime()
        );
      }
      return 0;
    });
};

const getColumns = (): CustomTableColumn<AccountsPayableTableData>[] => [
  // {
  //   headerKey: "baseDateFormated",
  //   headerName: "Dt. Base",
  //   sx: { fontSize: "11px", paddingX: 0.5 },
  //   cellSx: { fontSize: "10px" },
  // },
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
    headerKey: "key",
    headerName: "Chave",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "paymentNumber",
    headerName: "N° Registro",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "issueDateFormated",
    headerName: "Dt. Emissão",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "dueDateFormated",
    headerName: "Dt. Venc.",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "valueFormated",
    headerName: "$ Valor",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
  {
    headerKey: "status",
    headerName: "Status",
    sx: { fontSize: "11px", paddingX: 0.5 },
    cellSx: { fontSize: "10px" },
  },
];
