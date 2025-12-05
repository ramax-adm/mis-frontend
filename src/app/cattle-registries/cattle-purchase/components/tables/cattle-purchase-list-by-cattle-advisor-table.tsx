import { CustomizedTable } from "@/components/Table/normal-table/body";
import { GetCattlePurchaseResumedDataResponse } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box } from "@mui/material";

interface CattlePurchaseListByCattleAdvisorTableProps {
  data: GetCattlePurchaseResumedDataResponse["cattlePurchaseByCattleAdvisorList"];
}
export function CattlePurchaseListByCattleAdvisorTable({
  data,
}: CattlePurchaseListByCattleAdvisorTableProps) {
  const parsedData = getData({ data });
  const columns = getColumns();

  return (
    <Box sx={{ marginTop: 1 }}>
      <CustomizedTable<any>
        tableStyles={{
          height: "calc(100vh - 530px);",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "9px",
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "9.5px",
        }}
        columns={columns}
        data={parsedData}
      />
    </Box>
  );
}

const getData = ({ data }: CattlePurchaseListByCattleAdvisorTableProps) => {
  return data
    .sort((a, b) => b.totalValue - a.totalValue)
    .map((i) => ({
      ...i,
      freightPrice: toLocaleString(i.freightPrice),
      purchasePrice: toLocaleString(i.purchasePrice),
      commissionPrice: toLocaleString(i.commissionPrice),
      totalValue: toLocaleString(i.totalValue),
    }));
};

const getColumns = () => {
  return [
    {
      headerName: "Assessor",
      //   maxWidth: "80px",
      type: "string",
      value: {
        first: {
          value: "cattleAdvisorName",
        },
      },
    },
    {
      headerName: "Cbs",
      // maxWidth: '80px',
      type: "string",
      value: {
        first: {
          value: "cattleQuantity",
        },
      },
    },
    {
      headerName: "R$ Compra",
      //   maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "purchasePrice",
        },
      },
    },
    {
      headerName: "R$ Frete",
      //   maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "freightPrice",
        },
      },
    },
    {
      headerName: "R$ Comissão",
      type: "string",
      value: {
        first: {
          value: "commissionPrice",
        },
      },
    },

    {
      headerName: "R$ Total",
      //   maxWidth: "50px",
      type: "string",
      value: {
        first: {
          value: "totalValue",
        },
      },
    },
  ];
};
