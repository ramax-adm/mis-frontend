import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Alert, Box } from "@mui/material";
import { AccountReceivableItem } from "@/types/finance";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { formatDateToDDMMYYYY, formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import PaginatedTable from "@/components/Table/paginated-table";
import { AccountReceivableOpenValueByClientAgg } from "@/types/api/finance";

type AccountsReceivableOpenValueByClientTableData =
  AccountReceivableOpenValueByClientAgg & {
    client: string;
    valueFormated: string;
    openValueToExpireFormated: string;
    openValueExpiredFormated: string;
    percentageFormated: string;
  };

interface AccountsReceivableOpenValueByClientTableProps {
  data?: Record<string, AccountReceivableOpenValueByClientAgg>;
  isFetching: boolean;
}
export function AccountsReceivableOpenValueByClientTable({
  data,
  isFetching,
}: AccountsReceivableOpenValueByClientTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "180px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "180px",
        }}
      >
        <Alert severity='info'>Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <CustomTable<AccountsReceivableOpenValueByClientTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "160px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, AccountReceivableOpenValueByClientAgg>;
}): AccountsReceivableOpenValueByClientTableData[] => {
  const transposedData = Object.entries(data)
    .map(([key, value]) => ({
      ...value,
      client: key,
      valueFormated: toLocaleString(value.value),
      openValueToExpireFormated: toLocaleString(value.openValueToExpire),
      openValueExpiredFormated: toLocaleString(value.openValueExpired),
      percentageFormated: toLocaleString(value.percentage) + " %",
    }))
    .sort((a, b) => b.value - a.value);
  return transposedData;
};

const getColumns =
  (): CustomTableColumn<AccountsReceivableOpenValueByClientTableData>[] => [
    {
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "quantity",
      headerName: "Qtd.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "valueFormated",
      headerName: "$ Valor",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "openValueExpiredFormated",
      headerName: "$ Aberto a vencer",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "openValueToExpireFormated",
      headerName: "$ Aberto vencido",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
