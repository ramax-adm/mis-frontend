import { LoaderIcon } from "../customized/loader-icon";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Table } from "@/components/Table/normal-table";
import { Column } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { GetAnalyticalToExpiresByCompanyResponse } from "@/types/api/stock";
import { Box, TableCell } from "@mui/material";

type ParsedDataItem = GetAnalyticalToExpiresByCompanyResponse & {
  product: string;
  productLine: string;
};

interface AnalyticalStockToExpiresTableProps {
  data?: GetAnalyticalToExpiresByCompanyResponse[];
  isFetching: boolean;
}
export function AnalyticalStockToExpiresTable({
  data = [],
  isFetching,
}: AnalyticalStockToExpiresTableProps) {
  const columns = getColumns();
  const parsedData = getData({ data });

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 280px)",
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
        height: "calc(100vh - 280px)",
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
  data: GetAnalyticalToExpiresByCompanyResponse[];
}) => {
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
    productLine: `${i.productLineCode} - ${i.productLineName}`,
  }));
};

const getColumns = (): CustomTableColumn<ParsedDataItem>[] => [
  {
    headerKey: "productLine",
    headerName: "Linha",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "boxAmount",
    headerName: "Caixas",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "quantity",
    headerName: "Peças",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "totalWeightInKg",
    headerName: "KGs",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "productionDate",
    headerName: "Dt. Prod.",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "daysFromProduction",
    headerName: "Idade (Dias)",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "dueDate",
    headerName: "Dt. Venc.",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "daysToExpires",
    headerName: "Prazo (Dias)",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    render: (value, row) => (
      <TableCell
        sx={{
          paddingY: 0.5,
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
    headerKey: "basePriceCar",
    headerName: "$ CAR",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "basePriceTruck",
    headerName: "$ TRUCK",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "totalPrice",
    headerName: "$ Total",
    align: "center",
    sx: { paddingY: 0.5, fontSize: 9.5 },
    cellSx: { fontSize: 9 },
  },
];
