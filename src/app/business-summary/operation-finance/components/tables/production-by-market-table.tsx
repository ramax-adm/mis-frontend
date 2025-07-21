import { Column, CustomizedTable } from "@/components/Table/body";

export function ProductionByMarketTable() {
  const columns = getColumns();

  return <CustomizedTable columns={columns} data={[]} />;
}

const getColumns = (): Column<any>[] => [
  {
    headerName: "Mercado",
    type: "string",
    value: {
      first: {
        value: "market",
      },
    },
  },
  {
    headerName: "Prod. PCS",
    type: "string",
    value: {
      first: {
        value: "quantity",
      },
    },
  },
  {
    headerName: "Prod. KG",
    type: "string",
    value: {
      first: {
        value: "weightInKg",
      },
    },
  },
  {
    headerName: "R$/KG",
    type: "string",
    value: {
      first: {
        value: "valueByKg",
      },
    },
  },
  {
    headerName: "Valor R$",
    type: "string",
    value: {
      first: {
        value: "value",
      },
    },
  },
];
