import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Alert, Box } from "@mui/material";
import { LoaderIcon } from "@/components/Loading/loader-icon";
import { toLocaleString } from "@/utils/string.utils";
import { AccountReceivableLossByClientAgg } from "@/types/api/finance";

type AccountsReceivableLossByClientTableData =
  AccountReceivableLossByClientAgg & {
    client: string;
    valueFormated: string;
    percentageFormated: string;
  };

interface AccountsReceivableLossByClientTableProps {
  data?: Record<string, AccountReceivableLossByClientAgg>;
  isFetching: boolean;
}
export function AccountsReceivableLossByClientTable({
  data,
  isFetching,
}: AccountsReceivableLossByClientTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();
  const haveSomeData = parsedData.length > 0;

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "220px",
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
          height: "220px",
        }}
      >
        <Alert severity='info'>Sem Dados</Alert>;
      </Box>
    );
  }

  return (
    <CustomTable<AccountsReceivableLossByClientTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "220px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, AccountReceivableLossByClientAgg>;
}): AccountsReceivableLossByClientTableData[] => {
  const transposedData = Object.entries(data).map(([key, value]) => ({
    ...value,
    client: key,
    valueFormated: toLocaleString(value.value),
    percentageFormated: toLocaleString(value.percentage) + " %",
  }));
  return transposedData;
};

const getColumns =
  (): CustomTableColumn<AccountsReceivableLossByClientTableData>[] => [
    {
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "quantity",
      headerName: "Qtd.",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
    {
      headerKey: "valueFormated",
      headerName: "$ Aberto",
      sx: { fontSize: "11px", paddingX: 0.5 },
      cellSx: { fontSize: "10px" },
    },
  ];
