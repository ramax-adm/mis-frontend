import { CustomizedTable } from "@/components/Table/normal-table/body";
import {
  useGetBusinessAuditConsideredCfops,
  useGetBusinessAuditConsideredNfSituations,
} from "@/services/react-query/queries/business-audit";
import { GetBusinessAuditOverviewDataResponse } from "@/types/api/business-audit";
import { InvoicesNfTypesEnum } from "@/types/sales";
import { PageRoutes } from "@/utils/appRoutes";
import { toLocaleString } from "@/utils/string.utils";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";

type GetDataResponseItem = {
  companyCode: string;
  companyName: string;
  quantity: string;
  weightInKg: string;
  totalPrice: string;
  company: string;
  productQuantity: number;
};

interface ManuallyEnteredInvoicesTableProps {
  data?: GetBusinessAuditOverviewDataResponse["manuallyEnteredInvoicesByCompany"];
}
export function ManuallyEnteredInvoicesTable({
  data,
}: ManuallyEnteredInvoicesTableProps) {
  const { data: consideredCfops } = useGetBusinessAuditConsideredCfops();
  const { data: consideredNfSituations } =
    useGetBusinessAuditConsideredNfSituations();
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
      .concat(`cfopCodes=${consideredCfops?.join(",")}`)
      .concat("&")
      .concat(`nfSituations=${consideredNfSituations?.join(",")}`)
      .concat("&")
      .concat(`startDate=${startDate}`)
      .concat("&")
      .concat(`endDate=${endDate}`)
      .concat("&")
      .concat(`nfType=${InvoicesNfTypesEnum.AVULSA}`);
    router.push(destinyUrl);
  };
  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
      action={handleAction}
      tableStyles={{ height: "100px" }}
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
    companyCode: string;
    companyName: string;
    quantity: number;
    productQuantity: number;
    weightInKg: number;
    totalPrice: number;
  }[] = [];
  for (const key of keys) {
    response.push({
      company: key,
      companyCode: data[key].companyCode,
      companyName: data[key].companyName,
      quantity: data[key].quantity,
      productQuantity: data[key].productQuantity,
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
    headerName: "Cod. Empresa",
    type: "string",
    value: {
      first: {
        value: "companyCode",
      },
    },
  },
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
    headerName: "Qtd. NFs",
    type: "string",
    value: {
      first: {
        value: "quantity",
      },
    },
  },
  {
    headerName: "Qtd. Produtos",
    type: "string",
    value: {
      first: {
        value: "productQuantity",
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
