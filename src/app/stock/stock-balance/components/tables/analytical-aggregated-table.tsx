import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { GetStockBalanceAggregatedAnalyticalItem } from "@/types/api/stock-balance";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

interface StockBalanceAnalyticalAggregatedTableProps {
  data?: GetStockBalanceAggregatedAnalyticalItem[];
}
export function StockBalanceAnalyticalAggregatedTable({
  data = [],
}: StockBalanceAnalyticalAggregatedTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box sx={{}}>
      <CustomizedTable<any>
        tableStyles={{
          maxHeight: "150px",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "10px",
          paddingY: 0.5,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "11px",
        }}
        columns={columns}
        data={parsedData}
      />
    </Box>
  );
}

const getData = ({ data = [] }: StockBalanceAnalyticalAggregatedTableProps) =>
  data.map((i) => ({
    ...i,
    quantity: toLocaleString(i.quantity),
    weightInKg: toLocaleString(i.weightInKg),
    reservedQuantity: toLocaleString(i.reservedQuantity),
    reservedWeightInKg: toLocaleString(i.reservedWeightInKg),
    availableQuantity: toLocaleString(i.availableQuantity),
    availableWeightInKg: toLocaleString(i.availableWeightInKg),
  }));

const getColumns = (): Column<GetStockBalanceAggregatedAnalyticalItem>[] => {
  return [
    {
      headerName: "Cod. Produto",
      width: "30px",
      type: "string",
      value: {
        first: {
          value: "productCode",
        },
      },
    },
    {
      headerName: "Produto",
      width: "150px",
      type: "string",
      value: {
        first: {
          value: "productName",
        },
      },
    },
    {
      headerName: "Cx Estoque",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "quantity",
        },
      },
    },
    {
      headerName: "Kg Estoque",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "weightInKg",
        },
      },
    },
    {
      headerName: "Cx Pedido",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "reservedQuantity",
        },
      },
    },
    {
      headerName: "Kg Pedido",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "reservedWeightInKg",
        },
      },
    },
    {
      headerName: "Cx Disponivel",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "availableQuantity",
        },
      },
    },
    {
      headerName: "Kg Disponivel",
      width: "40px",
      type: "string",
      value: {
        first: {
          value: "availableWeightInKg",
        },
      },
    },
  ];
};
