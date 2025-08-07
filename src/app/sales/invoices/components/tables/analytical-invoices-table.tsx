import { CustomizedTable } from "@/components/Table/body";
import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";
import { GetInvoicesItem } from "@/types/api/sales";
import { PageRoutes } from "@/utils/appRoutes";
import { formatDateToDDMMYYYY, formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";
import { useRouter } from "next/navigation";

interface AnalyticalInvoicesTableProps {
  data?: GetInvoicesItem[];
}
export function AnalyticalInvoicesTable({
  data = [],
}: AnalyticalInvoicesTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  const haveSomeData = data.length > 0;

  if (!haveSomeData) {
    return null;
  }

  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
      tableStyles={{ height: "calc(100vh - 300px);" }}
      cellStyles={{
        fontSize: "10px",
        paddingX: 0.5,
        paddingY: 0.2,
      }}
      headCellStyles={{
        paddingX: 0.5,
        paddingY: 0.2,
        fontSize: "11px",
      }}
    />
  );
}

const getData = ({ data = [] }: AnalyticalInvoicesTableProps) => {
  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((d) => ({
      ...d,
      date: formatToDate(d.date),
      weightInKg: toLocaleString(d.weightInKg),
      unitPrice: toLocaleString(d.unitPrice, 2),
      totalPrice: toLocaleString(d.totalPrice, 2),
    }));
};

const getColumns = () => [
  {
    headerName: "Data",
    type: "string",
    value: {
      first: {
        value: "date",
      },
    },
  },
  {
    headerName: "N° NF",
    type: "string",
    value: {
      first: {
        value: "nfNumber",
      },
    },
  },
  {
    headerName: "Cod. pedido",
    type: "string",
    value: {
      first: {
        value: "requestId",
      },
    },
  },
  {
    headerName: "Tipo",
    type: "string",
    value: {
      first: {
        value: "nfType",
      },
    },
  },
  {
    headerName: "Situação",
    type: "string",
    value: {
      first: {
        value: "nfSituation",
      },
    },
  },
  {
    headerName: "Cod Cfop",
    type: "string",
    value: {
      first: {
        value: "cfopCode",
      },
    },
  },
  {
    headerName: "Cfop",
    type: "string",
    value: {
      first: {
        value: "cfopDescription",
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
    headerName: "Cod Produto",
    type: "string",
    value: {
      first: {
        value: "productCode",
      },
    },
  },
  {
    headerName: "Produto",
    type: "string",
    value: {
      first: {
        value: "productName",
      },
    },
  },
  {
    headerName: "Caixas",
    type: "string",
    value: {
      first: {
        value: "boxAmount",
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
    headerName: "Valor Un.",
    type: "string",
    value: {
      first: {
        value: "unitPrice",
      },
    },
  },
  {
    headerName: "Valor Nota",
    type: "string",
    value: {
      first: {
        value: "totalPrice",
      },
    },
  },
];
