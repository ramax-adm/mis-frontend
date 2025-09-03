import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { useGetAnalyticalCattlePurchaseFreights } from "@/services/react-query/queries/freights";
import {
  FreightOverPriceTableItem,
  GetAnalyticalCattlePurchaseFreightsResponse,
  ResumeFreightTotals,
} from "@/types/api/freights";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface FreightsOverPriceTableProps {
  totals: ResumeFreightTotals;
  data: FreightOverPriceTableItem[];
}
export function FreightsOverPriceTable({
  data,
  totals,
}: FreightsOverPriceTableProps) {
  const columns = getColumns();
  const parsedData = data
    .sort((a, b) => b.difPrice - a.difPrice)
    .map((item) => ({
      ...item,
      basePrice: toLocaleString(item.basePrice),
      tablePrice: toLocaleString(item.tablePrice),
      difPrice: toLocaleString(item.difPrice),
    }));

  const quantityAboveTable = data.filter((item) => item.difPrice > 0).length;
  const percentageAboveTable = (
    (quantityAboveTable / totals.quantity) *
    100
  ).toFixed(2);
  const totalDifPrice = data.reduce((acc, item) => acc + item.difPrice, 0);

  return (
    <Box sx={{ marginTop: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          fontWeight={700}
          color={COLORS.TEXTO}
          fontSize={"10px"}
          marginBottom={0.5}
        >
          Qtd registros:
          {quantityAboveTable}
        </Typography>
        <Typography
          fontWeight={700}
          color={COLORS.TEXTO}
          fontSize={"10px"}
          marginBottom={0.5}
        >
          % Registros:
          {`${percentageAboveTable} %`}
        </Typography>
        <Typography
          fontWeight={700}
          color={COLORS.TEXTO}
          fontSize={"10px"}
          marginBottom={0.5}
        >
          Total R$ DIF:
          {toLocaleString(totalDifPrice)}
        </Typography>
      </Box>
      <CustomizedTable<any>
        tableStyles={{
          height: "250px",
          width: "100%",
        }}
        cellStyles={{
          paddingX: 1,
          fontSize: "9px",
          paddingY: 0.2,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: "10px",
        }}
        columns={columns}
        data={parsedData}
      />
    </Box>
  );
}
const getColumns = (): Column<FreightOverPriceTableItem>[] => {
  return [
    {
      headerName: "Data",
      maxWidth: "80px",
      type: "date",
      value: {
        first: {
          value: "slaughterDate",
        },
      },
    },
    {
      headerName: "Cod OC",
      // maxWidth: '80px',
      type: "string",
      value: {
        first: {
          value: "purchaseCattleOrderId",
        },
      },
    },
    // {
    //   headerName: 'Transportadora',
    //   // maxWidth: '80px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'freightCompany',
    //     },
    //   },
    // },
    // {
    //   headerName: 'Assessor',
    //   // maxWidth: '80px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'cattleAdvisor',
    //     },
    //   },
    // },
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
      headerName: "R$ Pago",
      maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "basePrice",
        },
      },
    },
    {
      headerName: "R$ Tabela",
      maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "tablePrice",
        },
      },
    },
    {
      headerName: "Dif. R$",
      type: "string",
      value: {
        first: {
          value: "difPrice",
        },
      },
    },
    // {
    //   headerName: 'NF Complemento',
    //   maxWidth: '50px',
    //   type: 'string',
    //   value: {
    //     first: {
    //       value: 'complementNf',
    //     },
    //   },
    // },
  ];
};
