import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { GetStockByCompanyResponse } from "@/types/api/stock";
import { LoaderIcon } from "../customized/loader-icon";
import { Box } from "@mui/material";

type ParsedDataItem = GetStockByCompanyResponse & {
  product: string;
};

interface StockTableProps {
  data?: GetStockByCompanyResponse[];
  isFetching: boolean;
}
export function StockTable({ data = [], isFetching }: StockTableProps) {
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
  data: GetStockByCompanyResponse[];
}): ParsedDataItem[] => {
  return data.map((i) => ({
    ...i,
    product: `${i.productCode} - ${i.productName}`,
  }));
};

const getColumns = (): CustomTableColumn<ParsedDataItem>[] => [
  {
    headerKey: "product",
    headerName: "Produto",
    sx: { padding: 0.5, fontSize: 9.5, maxWidth: "80px" },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "totalWeightInKg",
    headerName: "KG",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5, maxWidth: "30px" },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "basePriceCar",
    headerName: "$ CAR",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5, maxWidth: "30px" },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "basePriceTruck",
    headerName: "$ TRUCK",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5, maxWidth: "30px" },
    cellSx: { fontSize: 9 },
  },
  {
    headerKey: "totalPrice",
    headerName: "$ Total",
    align: "center",
    sx: { padding: 0.5, fontSize: 9.5, maxWidth: "30px" },
    cellSx: { fontSize: 9 },
  },
];
