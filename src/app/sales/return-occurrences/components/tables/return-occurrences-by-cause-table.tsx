import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  GetBusinessAuditReturnOccurrenceByCauseAgg,
  GetBusinessAuditReturnOccurrenceByClientAgg,
} from "@/types/api/business-audit";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";
import { toLocaleString } from "@/utils/number.utils";

type ReturnOccurrencesByCauseTableData =
  GetBusinessAuditReturnOccurrenceByCauseAgg & {
    cause: string;
    valueFormated: string;
    quantityFormated: string;
    weightInKgFormated: string;
  };

interface ReturnOccurrencesByCauseTableProps {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByCauseAgg>;
  isFetching: boolean;
}
export function ReturnOccurrencesByCauseTable({
  data,
  isFetching,
}: ReturnOccurrencesByCauseTableProps) {
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
    <CustomTable<ReturnOccurrencesByCauseTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "250px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByCauseAgg>;
}): ReturnOccurrencesByCauseTableData[] => {
  const keys = Object.keys(data);

  const response: ReturnOccurrencesByCauseTableData[] = [];

  for (const key of keys) {
    response.push({
      cause: key,
      count: data[key].count,
      value: data[key].value,
      quantity: data[key].quantity,
      weightInKg: data[key].weightInKg,
      valueFormated: toLocaleString(data[key].value),
      quantityFormated: toLocaleString(data[key].quantity),
      weightInKgFormated: toLocaleString(data[key].weightInKg),
    });
  }
  return response.sort((a, b) => b.count - a.count);
};

const getColumns =
  (): CustomTableColumn<ReturnOccurrencesByCauseTableData>[] => [
    {
      headerKey: "cause",
      headerName: "Motivo",
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
      headerKey: "quantityFormated",
      headerName: "Qtd. Itens",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "valueFormated",
      headerName: "$ Fat.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "weightInKgFormated",
      headerName: "Peso Kg",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
  ];
