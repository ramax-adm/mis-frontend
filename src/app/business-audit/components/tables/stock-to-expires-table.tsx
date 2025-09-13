import { CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { GetBusinessAuditOverviewDataResponse } from "@/types/api/business-audit";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";

interface StockToExpiresTableProps {
  data?: GetBusinessAuditOverviewDataResponse["toExpiresStock"];
}
export function StockToExpiresTable({ data }: StockToExpiresTableProps) {
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

const getData = ({ data = {} }: StockToExpiresTableProps) => {
  const keys = Object.keys(data);

  const response: {
    dueDate: Date;
    productCode: string;
    companyCode: string;
    productName: string;
    totalWeightInKg: number;
    daysToExpires: number;
  }[] = [];
  for (const key of keys) {
    response.push({
      dueDate: data[key].dueDate,
      productCode: data[key].productCode,
      productName: data[key].productName,
      companyCode: data[key].companyCode,
      totalWeightInKg: data[key].totalWeightInKg,
      daysToExpires: data[key].daysToExpires,
    });
  }

  return response
    .sort((a, b) => a.daysToExpires - b.daysToExpires)
    .map((r) => ({
      ...r,
      dueDate: formatToDate(r.dueDate),
      totalWeightInKg: toLocaleString(r.totalWeightInKg, 0),
    }));
};

const getColumns = () => [
  {
    headerName: "Empresa",
    type: "string",
    value: {
      first: {
        value: "companyCode",
      },
    },
  },
  {
    headerName: "Cod. Produto",
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
    headerName: "Dt. Venc",
    type: "string",
    value: {
      first: {
        value: "dueDate",
      },
    },
  },
  {
    headerName: "Prazo",
    type: "string",
    conditionalColor: (row: any) => {
      if (row.daysToExpires < 0) {
        return COLORS.TABELAS.FUNDO_PRETO;
      } else if (row.daysToExpires <= 15) {
        return COLORS.TABELAS.FUNDO_VERMELHO;
      } else if (row.daysToExpires > 15 && row.daysToExpires <= 30) {
        return COLORS.TABELAS.FUNDO_AMARELO;
      }

      return COLORS.TABELAS.FUNDO_VERDE;
    },
    conditionalFontColor: (row: any) => {
      if (row.daysToExpires < 0) {
        return "white";
      } else {
        return "black";
      }
    },
    value: {
      first: {
        value: "daysToExpires",
      },
    },
  },
  {
    headerName: "KG",
    type: "string",
    value: {
      first: {
        value: "totalWeightInKg",
      },
    },
  },
];
