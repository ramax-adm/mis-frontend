import {
  GetCattlePurchaseAggregatedAnalyticalDataItem,
  GetCattlePurchaseAggregatedAnalyticalDataResponse,
  GetCattlePurchaseAnalyticalParsedItem,
} from "@/types/api/purchase";
import { Alert, Box } from "@mui/material";
import { CattlePurchaseCustomizedCard } from "../customized/card";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { formatToDate } from "@/utils/formatToDate";
import { toLocaleString } from "@/utils/string.utils";

interface AnalyticalAggregatedCattlePurchasesTableProps {
  data?: GetCattlePurchaseAggregatedAnalyticalDataItem;
}
export function AnalyticalAggregatedCattlePurchasesTable({
  data,
}: AnalyticalAggregatedCattlePurchasesTableProps) {
  const haveSomeData = data && Object.values(data).length > 0 ? true : false;
  const parsedData = getData({ data });
  const columns = getColumns();

  if (!haveSomeData) {
    return null;
  }

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: "calc(100vh - 270px);",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "10px",
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "11px",
        }}
        columns={columns}
        data={parsedData}
      />
    </Box>
  );
}

const getData = ({ data }: AnalyticalAggregatedCattlePurchasesTableProps) => {
  if (!data) {
    return [];
  }

  const response: {
    purchaseCattleOrderId: string;
    slaughterDate: Date;
    cattleOwnerCode: string;
    cattleOwnerName: string;
    companyCode: string;
    companyName: string;
    cattleAdvisorCode: string;
    cattleAdvisorName: string;
    cattleQuantity: string;
    freightPrice: string;
    purchasePrice: string;
    commissionPrice: string;
    totalValue: string;
  }[] = [];
  const keys = Object.keys(data);

  for (const key of keys) {
    response.push({
      purchaseCattleOrderId: key,
      slaughterDate: data[key].slaughterDate,
      cattleOwnerCode: data[key].cattleOwnerCode,
      cattleOwnerName: data[key].cattleOwnerName,
      companyCode: data[key].companyCode,
      companyName: data[key].companyName,
      cattleAdvisorCode: data[key].cattleAdvisorCode,
      cattleAdvisorName: data[key].cattleAdvisorName,
      cattleQuantity: toLocaleString(data[key].cattleQuantity, 0),
      freightPrice: toLocaleString(data[key].freightPrice, 2),
      purchasePrice: toLocaleString(data[key].purchasePrice, 2),
      commissionPrice: toLocaleString(data[key].commissionPrice, 2),
      totalValue: toLocaleString(data[key].totalValue, 2),
    });
  }

  return response
    .sort(
      (a, b) =>
        new Date(a.slaughterDate).getTime() -
        new Date(b.slaughterDate).getTime()
    )
    .map((i) => ({ ...i, slaughterDate: formatToDate(i.slaughterDate) }));
};

const getColumns =
  (): Column<GetCattlePurchaseAggregatedAnalyticalDataItem>[] => {
    return [
      {
        headerName: "Dt. Abate",
        maxWidth: "100px",
        type: "string",
        value: {
          first: {
            value: "slaughterDate",
          },
        },
      },
      {
        headerName: "Cod. OC",
        // maxWidth: '80px',
        type: "string",
        value: {
          first: {
            value: "purchaseCattleOrderId",
          },
        },
      },
      {
        headerName: "Pecuarista",
        maxWidth: "40px",
        type: "string",
        value: {
          first: {
            value: "cattleOwnerName",
          },
        },
      },
      {
        headerName: "Assessor",
        maxWidth: "40px",
        type: "string",
        value: {
          first: {
            value: "cattleAdvisorName",
          },
        },
      },
      {
        headerName: "Cbs",
        type: "string",
        value: {
          first: {
            value: "cattleQuantity",
          },
        },
      },

      {
        headerName: "R$ Frete",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "freightPrice",
          },
        },
      },
      {
        headerName: "R$ Comissão",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "commissionPrice",
          },
        },
      },
      {
        headerName: "R$ Compra",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "purchasePrice",
          },
        },
      },
      {
        headerName: "R$ Total",
        maxWidth: "50px",
        type: "string",
        value: {
          first: {
            value: "totalValue",
          },
        },
      },
    ];
  };
