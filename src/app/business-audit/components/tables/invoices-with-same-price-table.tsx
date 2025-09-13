import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetBusinessAuditOverviewDataResponse } from "@/types/api/business-audit";
import { PageRoutes } from "@/utils/appRoutes";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsString } from "nuqs";

type GetDataResponseItem = {
  date: string;
  totalPrice: string;
  nfNumber: string;
  companyCode: string;
  companyName: string;
  clientCode: string;
  clientName: string;
};

interface InvoicesWithSamePriceTableProps {
  data?: GetBusinessAuditOverviewDataResponse["invoicesWithSamePrice"];
}
export function InvoicesWithSamePriceTable({
  data,
}: InvoicesWithSamePriceTableProps) {
  const [startDate] = useQueryState(
    "startDate",
    parseAsString.withDefault(new Date().toISOString().split("T")[0])
  );

  const [endDate] = useQueryState(
    "endDate",
    parseAsString.withDefault(new Date().toISOString().split("T")[0])
  );
  const router = useRouter();
  const parsedData = getData({ data });
  const columns = getColumns();

  const handleAction = (row: GetDataResponseItem) => {
    const destinyUrl = PageRoutes.invoices()
      .concat("?")
      .concat(`companyCode=${row.companyCode}`)
      .concat("&")
      .concat(`startDate=${startDate}`)
      .concat("&")
      .concat(`endDate=${endDate}`)
      .concat("&")
      .concat(`nfNumber=${row.nfNumber}`);
    router.push(destinyUrl);
  };
  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
      action={handleAction}
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

const getData = ({
  data = [],
}: InvoicesWithSamePriceTableProps): GetDataResponseItem[] => {
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
