import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetBusinessAuditOverviewDataResponse } from "@/types/api/business-audit";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";

interface OpenCattlePurchaseFreightsTableProps {
  data?: GetBusinessAuditOverviewDataResponse["openCattlePurchaseFreights"];
}
export function OpenCattlePurchaseFreightsTable({
  data,
}: OpenCattlePurchaseFreightsTableProps) {
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

const getData = ({ data = [] }: OpenCattlePurchaseFreightsTableProps) => {
  return data
    .sort(
      (a, b) =>
        new Date(b.slaughterDate).getTime() -
        new Date(a.slaughterDate).getTime()
    )
    .map((i) => ({
      ...i,
      date: formatToDate(i.slaughterDate),
      feedlotKmDistance: toLocaleString(i.feedlotKmDistance, 0),
      negotiatedKmDistance: toLocaleString(i.negotiatedKmDistance, 0),
      referenceFreightTablePrice: toLocaleString(
        i.referenceFreightTablePrice,
        2
      ),
      negotiatedFreightPrice: toLocaleString(i.negotiatedFreightPrice, 2),
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
    headerName: "Empresa",
    type: "string",
    value: {
      first: {
        value: "companyCode",
      },
    },
  },
  {
    headerName: "Cod. OC",
    type: "string",
    value: {
      first: {
        value: "purchaseCattleOrderId",
      },
    },
  },
  {
    headerName: "Transportadora",
    type: "string",
    value: {
      first: {
        value: "freightCompanyName",
      },
    },
  },
  {
    headerName: "Assessor",
    type: "string",
    value: {
      first: {
        value: "cattleAdvisorName",
      },
    },
  },
  {
    headerName: "Km Cadastro",
    type: "string",
    value: {
      first: {
        value: "feedlotKmDistance",
      },
    },
  },
  {
    headerName: "Km Negociado",
    type: "string",
    value: {
      first: {
        value: "negotiatedKmDistance",
      },
    },
  },
  {
    headerName: "R$ Tabela",
    type: "string",
    value: {
      first: {
        value: "referenceFreightTablePrice",
      },
    },
  },
  {
    headerName: "R$ Pago",
    type: "string",
    value: {
      first: {
        value: "negotiatedFreightPrice",
      },
    },
  },
];
