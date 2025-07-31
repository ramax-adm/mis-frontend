import { Column, CustomizedTable } from "@/components/Table/body";
import { GetStockBalanceAnalyticalDataResponse } from "@/types/api/stock-balance";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

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
      <CustomizedTable<any>
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
        data={parsedData}
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

const getColumns = (): Column<GetStockBalanceAnalyticalDataResponse>[] => {
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
      headerName: "Cod. Linha",
      width: "30px",
      type: "string",
      value: {
        first: {
          value: "productLineCode",
        },
      },
    },
    {
      headerName: "Linha",
      width: "100px",
      type: "string",
      value: {
        first: {
          value: "productLineName",
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
