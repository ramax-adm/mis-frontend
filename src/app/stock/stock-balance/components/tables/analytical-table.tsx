import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { GetStockBalanceAnalyticalDataResponse } from "@/types/api/stock-balance";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

type StockBalanceAnalyticalParsedData = {
  quantity: string;
  weightInKg: string;
  reservedQuantity: string;
  reservedWeightInKg: string;
  availableQuantity: string;
  availableWeightInKg: string;
  productLineCode: string;
  productLineName: string;
  productLine: string;
  productCode: string;
  productName: string;
  product: string;
};

interface StockBalanceAnalyticalTableProps {
  data?: GetStockBalanceAnalyticalDataResponse["items"];
}
export function StockBalanceAnalyticalTable({
  data = [],
}: StockBalanceAnalyticalTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box>
      <PaginatedTable<StockBalanceAnalyticalParsedData>
        tableStyles={{
          maxHeight: "calc(100vh - 200px);",
          width: "100%",
        }}
        cellStyles={{
          fontSize: "11px",
        }}
        headCellStyles={{
          fontSize: "13px",
        }}
        columns={columns}
        rows={parsedData}
      />
    </Box>
  );
}

const getData = ({ data = [] }: StockBalanceAnalyticalTableProps) =>
  data.map((i) => ({
    ...i,
    quantity: toLocaleString(i.quantity),
    weightInKg: toLocaleString(i.weightInKg),
    reservedQuantity: toLocaleString(i.reservedQuantity),
    reservedWeightInKg: toLocaleString(i.reservedWeightInKg),
    availableQuantity: toLocaleString(i.availableQuantity),
    availableWeightInKg: toLocaleString(i.availableWeightInKg),
  }));

const getColumns =
  (): PaginatedTableColumn<StockBalanceAnalyticalParsedData>[] => {
    return [
      {
        headerKey: "productLineCode",
        headerName: "Cod. Linha",
      },
      {
        headerKey: "productLineName",
        headerName: "Linha",
      },
      {
        headerKey: "productCode",
        headerName: "Cod. Produto",
      },
      {
        headerKey: "productName",
        headerName: "Produto",
      },
      {
        headerKey: "quantity",
        headerName: "Cx Estoque",
      },
      {
        headerKey: "weightInKg",
        headerName: "Kg Estoque",
      },
      {
        headerKey: "reservedQuantity",
        headerName: "Cx Pedido",
      },
      {
        headerKey: "reservedWeightInKg",
        headerName: "Kg Pedido",
      },
      {
        headerKey: "availableQuantity",
        headerName: "Cx Disponivel",
      },
      {
        headerKey: "availableWeightInKg",
        headerName: "Kg Disponivel",
      },
    ];
  };
