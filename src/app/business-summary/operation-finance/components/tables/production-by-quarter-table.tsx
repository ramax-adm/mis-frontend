import { Column } from "@/components/Table/body";

export function ProductionByQuarterTable() {}

const getColumns = (): Column<any>[] => [
  {
    headerName: "Quarteio",
    type: "string",
    value: {
      first: {
        value: "quarter",
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
