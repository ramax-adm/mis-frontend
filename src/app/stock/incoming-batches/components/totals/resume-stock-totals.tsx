import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Grid, TableCell, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";

interface StockIncomingBatchesTotalsProps {
  data?: GetStockInconingBatchesResumeResponse["totals"];
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
        backgroundColor: "#E9F2FB",
        borderRadius: 1,
        paddingX: 0.5,
        paddingY: 0.2,
      }}
    >
      <Typography fontSize={"12px"} fontWeight={700} color={"#097cf0ff"}>
        Total (KG)
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
      </Grid>
    </Box>
  );
}
