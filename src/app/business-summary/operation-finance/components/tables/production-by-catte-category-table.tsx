import { Column } from "@/components/Table/normal-table/body";

export function ProductionByCattleCategoryTable() {}

const getColumns = (): Column<any>[] => [
  {
    headerName: "Sexo",
    type: "string",
    value: {
      first: {
        value: "cattleCategory",
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
