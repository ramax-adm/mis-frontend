import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { GetBusinessAuditReturnOccurrenceByClientAgg } from "@/types/api/business-audit";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";
import { toLocaleString } from "@/utils/number.utils";

type ReturnOccurrencesByClientTableData =
  GetBusinessAuditReturnOccurrenceByClientAgg & {
    client: string;
  };

interface ReturnOccurrencesByClientTableProps {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByClientAgg>;
  isFetching: boolean;
}
export function ReturnOccurrencesByClientTable({
  data,
  isFetching,
}: ReturnOccurrencesByClientTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<ReturnOccurrencesByClientTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "250px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByClientAgg>;
}): ReturnOccurrencesByClientTableData[] => {
  const keys = Object.keys(data);

  const response: ReturnOccurrencesByClientTableData[] = [];

  for (const key of keys) {
    response.push({
      client: key,
      count: data[key].count,
      value: data[key].value,
      quantity: data[key].quantity,
      weightInKg: data[key].weightInKg,
    });
  }
  return response.sort((a, b) => b.count - a.count);
};

const getColumns =
  (): CustomTableColumn<ReturnOccurrencesByClientTableData>[] => [
    {
      headerKey: "client",
      headerName: "Cliente",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "count",
      headerName: "Qtd Dev.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "quantity",
      headerName: "Qtd. Itens",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "value",
      headerName: "$ Fat.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      render: (value) => toLocaleString(Number(value)),
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "weightInKg",
      headerName: "Peso Kg",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      render: (value) => toLocaleString(Number(value)),
      cellSx: { fontSize: "9px" },
    },
  ];
