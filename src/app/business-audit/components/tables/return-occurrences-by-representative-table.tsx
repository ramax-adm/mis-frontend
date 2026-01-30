import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  GetBusinessAuditReturnOccurrenceByClientAgg,
  GetBusinessAuditReturnOccurrenceByRepresentativeAgg,
} from "@/types/api/business-audit";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";
import { toLocaleString } from "@/utils/number.utils";

type ReturnOccurrencesByRepresentativeTableData =
  GetBusinessAuditReturnOccurrenceByRepresentativeAgg & {
    representative: string;
    valueFormated: string;
    quantityFormated: string;
    weightInKgFormated: string;
    invoiceValueFormated: string;
  };

interface ReturnOccurrencesByRepresentativeTableProps {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByRepresentativeAgg>;
  isFetching: boolean;
}
export function ReturnOccurrencesByRepresentativeTable({
  data,
  isFetching,
}: ReturnOccurrencesByRepresentativeTableProps) {
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
    <CustomTable<ReturnOccurrencesByRepresentativeTableData>
      columns={columns}
      rows={parsedData}
      tableStyles={{ height: "250px" }}
    />
  );
}

const getData = ({
  data = {},
}: {
  data?: Record<string, GetBusinessAuditReturnOccurrenceByRepresentativeAgg>;
}): ReturnOccurrencesByRepresentativeTableData[] => {
  const keys = Object.keys(data);

  const response: ReturnOccurrencesByRepresentativeTableData[] = [];

  for (const key of keys) {
    response.push({
      representative: key,
      count: data[key].count,
      value: data[key].value,
      quantity: data[key].quantity,
      weightInKg: data[key].weightInKg,
      valueFormated: toLocaleString(data[key].value),
      quantityFormated: toLocaleString(data[key].quantity),
      weightInKgFormated: toLocaleString(data[key].weightInKg),
      invoiceValue: data[key].invoiceValue,
      invoiceValueFormated: toLocaleString(data[key].invoiceValue),
    });
  }
  return response.sort((a, b) => b.value - a.value);
};

const getColumns =
  (): CustomTableColumn<ReturnOccurrencesByRepresentativeTableData>[] => [
    {
      headerKey: "representative",
      headerName: "Representante",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "count",
      headerName: "# Dev.",
      sx: { fontSize: "9.5px", paddingX: 0.5 },
      cellSx: { fontSize: "9px" },
    },
    {
      headerKey: "quantityFormated",
      headerName: "Qtd Dev.",
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
      headerKey: "valueFormated",
      headerName: "$ Dev.",
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
