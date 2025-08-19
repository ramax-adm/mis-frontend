import { Column, CustomizedTable } from "@/components/Table/normal-table/body";

export function ProductionByProductFamilyTable() {
  const columns = getColumns();

  return <CustomizedTable columns={columns} data={[]} />;
}

const getColumns = (): Column<any>[] => [
  {
    headerName: "Familia",
    type: "string",
    value: {
      first: {
        value: "familyName",
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
