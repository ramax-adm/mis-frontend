import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Grid, TableCell, Typography } from "@mui/material";
import { indigo, orange, red } from "@mui/material/colors";

interface StockIncomingBatchesTotalsProps {
  data?: {
    weightInKg: number;
    totalPrice: number;
  };
}
export function StockIncomingBatchesTotals({
  data,
}: StockIncomingBatchesTotalsProps) {
  const haveSomeData = data?.weightInKg !== 0;

  if (!haveSomeData) {
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: indigo["50"],
        borderRadius: 1,
        paddingX: 0.5,
        paddingY: 0.2,
      }}
    >
      <Typography fontSize={"12px"} fontWeight={700} color={"#097cf0ff"}>
        Totais
      </Typography>
      <Grid container gap={1}>
        <Grid item>
          <Typography fontSize={"8px"} color={"#097cf0ff"}>
            Total KG
          </Typography>
          <Typography fontSize={"12px"} fontWeight={700} color={"#097cf0ff"}>
            {toLocaleString(data?.weightInKg ?? 0)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontSize={"8px"} color={"#097cf0ff"}>
            Total $
          </Typography>
          <Typography fontSize={"12px"} fontWeight={700} color={"#097cf0ff"}>
            {toLocaleString(data?.totalPrice ?? 0)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
