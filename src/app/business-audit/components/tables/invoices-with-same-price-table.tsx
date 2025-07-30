import { CustomizedTable } from "@/components/Table/body";
import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";

interface InvoicesWithSamePriceTableProps {
  data?: GetBusinessAuditResumeDataResponse["invoicesWithSamePrice"];
}
export function InvoicesWithSamePriceTable({
  data,
}: InvoicesWithSamePriceTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
      tableStyles={{ height: "150px" }}
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

const getData = ({ data = [] }: InvoicesWithSamePriceTableProps) => {
  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((r) => ({
      ...r,
      date: formatToDate(r.date),
      totalPrice: toLocaleString(r.totalPrice, 0),
    }));
};

const getColumns = () => [
  {
    headerName: "Data",
    type: "string",
    maxWidth: "60px",
    value: {
      first: {
        value: "date",
      },
    },
  },
  {
    headerName: "NF",
    type: "string",
    value: {
      first: {
        value: "nfNumber",
      },
    },
  },
  {
    headerName: "Empresa",
    type: "string",
    maxWidth: "50px",
    value: {
      first: {
        value: "companyCode",
      },
    },
  },
  {
    headerName: "Cliente",
    type: "string",
    value: {
      first: {
        value: "clientName",
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
