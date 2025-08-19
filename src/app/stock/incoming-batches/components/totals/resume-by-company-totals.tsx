import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Grid, TableCell, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";

interface StockIncomingBatchesByCompanyTotalsProps {
  data?: GetStockInconingBatchesResumeResponse["totals"];
}
export function StockIncomingBatchesByCompanyTotals({
  data,
}: StockIncomingBatchesByCompanyTotalsProps) {
  const parsedData = getData({ data });
  const haveSomeData = parsedData.length > 0;

  if (!haveSomeData) {
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: "#BFBFBF",
        borderRadius: 1,
        paddingX: 0.5,
        paddingY: 0.2,
      }}
    >
      <Typography fontSize={"12px"} fontWeight={700}>
        Totais p/ empresa (KG)
      </Typography>
      <Grid container gap={1}>
        {parsedData.map((i, idx) => (
          <Grid item key={idx}>
            <Typography fontSize={"8px"}>{i.companyName}</Typography>
            <Typography fontSize={"12px"} fontWeight={700}>
              {i.weightInKg}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const getData = ({ data }: StockIncomingBatchesByCompanyTotalsProps) => {
  return Object.entries(data?.byCompany ?? {}).map(([key, value]) => ({
    companyName: key,
    weightInKg: toLocaleString(value ?? 0),
  }));
};
