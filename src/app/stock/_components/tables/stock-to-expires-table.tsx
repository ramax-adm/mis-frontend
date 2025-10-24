import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { GetToExpiresByCompanyResponse } from "@/types/api/stock";
import { Box, TableCell } from "@mui/material";
import { LoaderIcon } from "../customized/loader-icon";

type ParsedDataItem = GetToExpiresByCompanyResponse & {
  product: string;
};

interface StockToExpiresTableProps {
  data?: GetToExpiresByCompanyResponse[];
  isFetching: boolean;
}
export function StockToExpiresTable({
  data = [],
  isFetching,
}: StockToExpiresTableProps) {
  const columns = getColumns();
  const parsedData = getData({ data });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 230px)",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  return (
    <CustomTable<ParsedDataItem>
      tableStyles={{
        height: "400px",
        width: "100%",
      }}
      columns={columns}
      rows={parsedData}
    />
  );
}

const getData = ({
  data,
}: {
  data: GetToExpiresByCompanyResponse[];
}): ParsedDataItem[] => {
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
    productLine: `${i.productLineCode} - ${i.productLineName}`,
  }));
};

const getColumns = (): CustomTableColumn<ParsedDataItem>[] => [
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "dueDate",
    headerName: "Venc.",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "daysToExpires",
    headerName: "Prazo",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    render: (value, row) => (
      <TableCell
        sx={{
          padding: 0.5,
          fontSize: 9,
          bgcolor:
            row.daysToExpires < 0
              ? COLORS.TABELAS.FUNDO_PRETO
              : row.daysToExpires <= 15
                ? COLORS.TABELAS.FUNDO_VERMELHO
                : row.daysToExpires <= 30
                  ? COLORS.TABELAS.FUNDO_AMARELO
                  : COLORS.TABELAS.FUNDO_VERDE,
          color: row.daysToExpires < 0 ? "white" : "black",
        }}
      >
        {value}
      </TableCell>
    ),
  },
  {
    headerKey: "totalWeightInKg",
    headerName: "KG",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
];
