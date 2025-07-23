import { CustomizedTable } from "@/components/Table/body";
import { GetBusinessAuditResumeDataResponse } from "@/types/api/business-audit";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";

interface CattlePurchaseFreightsDuplicatedTableProps {
  data?: GetBusinessAuditResumeDataResponse["cattlePurchaseFreightsDuplicated"];
}
export function CattlePurchaseFreightsDuplicatedTable({
  data,
}: CattlePurchaseFreightsDuplicatedTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <CustomizedTable
      columns={columns}
      data={parsedData}
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

const getData = ({ data = [] }: CattlePurchaseFreightsDuplicatedTableProps) => {
  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((i) => ({
      ...i,
      date: formatToDate(i.date),
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
    headerName: "Placa",
    type: "string",
    value: {
      first: {
        value: "freightTransportPlate",
      },
    },
  },
];
