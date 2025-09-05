import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { COLORS } from "@/constants/styles/colors";
import { useGetAnalyticalCattlePurchaseFreights } from "@/services/react-query/queries/freights";
import {
  FreightOverCapacityTableItem,
  GetAnalyticalCattlePurchaseFreightsResponse,
  ResumeFreightTotals,
} from "@/types/api/freights";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface FreightsOverCapacityTableProps {
  totals: ResumeFreightTotals;
  data: FreightOverCapacityTableItem[];
}
export function FreightsOverCapacityTable({
  data,
  totals,
}: FreightsOverCapacityTableProps) {
  const columns = getColumns();
  const parsedData = data;

  const quantityAboveTable = data.length;
  const percentageAboveTable = (
    (quantityAboveTable / totals.quantity) *
    100
  ).toFixed(2);

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
      </Box>
      <CustomizedTable<any>
        tableStyles={{
          height: "150px",
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
const getColumns = (): Column<FreightOverCapacityTableItem>[] => {
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
      headerName: "OC",
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
      headerName: "Transportadora",
      // maxWidth: '80px',
      type: "string",
      value: {
        first: {
          value: "freightCompany",
        },
      },
    },
    {
      headerName: "Tipo",
      maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "freightTransportType",
        },
      },
    },
    {
      headerName: "Capacidade Cbs",
      maxWidth: "40px",
      type: "string",
      value: {
        first: {
          value: "freightTransportCapacity",
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
      headerName: "Dif",
      type: "string",
      value: {
        first: {
          value: "dif",
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
