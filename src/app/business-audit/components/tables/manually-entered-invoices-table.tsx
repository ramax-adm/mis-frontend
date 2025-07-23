import { CustomizedTable } from "@/components/Table/body";
import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";

interface ManuallyEnteredInvoicesTableProps {
  data?: GetBusinessAuditResumeDataResponse["manuallyEnteredInvoicesByCompany"];
}
export function ManuallyEnteredInvoicesTable({
  data,
}: ManuallyEnteredInvoicesTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
      tableStyles={{ height: "330px" }}
      cellStyles={{
        fontSize: "9px",
        paddingX: 0.5,
        paddingY: 0.2,
      }}
      headCellStyles={{
        paddingX: 0.5,
        paddingY: 0.2,
        fontSize: "9px",
      }}
    />
  );
}

const getData = ({ data = {} }: ManuallyEnteredInvoicesTableProps) => {
  const keys = Object.keys(data);

  const response: {
    company: string;
    quantity: number;
    weightInKg: number;
    totalPrice: number;
  }[] = [];
  for (const key of keys) {
    response.push({
      company: key,
      quantity: data[key].quantity,
      weightInKg: data[key].weightInKg,
      totalPrice: data[key].totalPrice,
    });
  }

  return response
    .sort((a, b) => b.totalPrice - a.totalPrice)
    .map((r) => ({
      ...r,
      quantity: toLocaleString(r.quantity, 0),
      weightInKg: toLocaleString(r.weightInKg, 0),
      totalPrice: toLocaleString(r.totalPrice, 0),
    }));
};

const getColumns = () => [
  {
    headerName: "Empresa",
    type: "string",
    value: {
      first: {
        value: "company",
      },
    },
  },
  {
    headerName: "Qtd.",
    type: "string",
    value: {
      first: {
        value: "quantity",
      },
    },
  },
  {
    headerName: "Peso KG",
    type: "string",
    value: {
      first: {
        value: "weightInKg",
      },
    },
  },
  {
    headerName: "Total R$",
    type: "string",
    value: {
      first: {
        value: "totalPrice",
      },
    },
  },
];
