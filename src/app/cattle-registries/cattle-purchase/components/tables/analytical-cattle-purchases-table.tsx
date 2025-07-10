import { GetCattlePurchaseAnalyticalParsedItem } from "@/types/api/purchase";
import { Column, CustomizedTable } from "@/components/Table/body";
import { Box } from "@mui/material";

interface AnalyticalCattlePurchasesTableProps {
  data?: GetCattlePurchaseAnalyticalParsedItem[];
}
export function AnalyticalCattlePurchasesTable({
  data = [],
}: AnalyticalCattlePurchasesTableProps) {
  const haveSomeData = data.length > 0;
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
        data={data}
      />
    </Box>
  );
}

const getColumns = (): Column<GetCattlePurchaseAnalyticalParsedItem>[] => {
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
      headerName: "Classif.",
      maxWidth: "50px",
      type: "string",
      value: {
        first: {
          value: "cattleClassification",
        },
      },
    },
    {
      headerName: "Peso @",
      maxWidth: "50px",
      type: "string",
      value: {
        first: {
          value: "cattleWeightInArroba",
        },
      },
    },
    {
      headerName: "Prazo",
      maxWidth: "50px",
      type: "string",
      value: {
        first: {
          value: "paymentTerm",
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
