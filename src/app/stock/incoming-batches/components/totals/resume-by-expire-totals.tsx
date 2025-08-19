import CustomTable from "@/components/Table/custom-table";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { GetStockInconingBatchesResumeResponse } from "@/types/api/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Grid, TableCell, Typography } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";

interface StockIncomingBatchesByExpireTotalsProps {
  data?: GetStockInconingBatchesResumeResponse["totals"];
}
export function StockIncomingBatchesByExpireTotals({
  data,
}: StockIncomingBatchesByExpireTotalsProps) {
  const parsedData = getData({ data });
  const byExpireKeyColors = [
    "#121212",
    red["900"],
    orange["900"],
    green["900"],
  ];
  const haveSomeData = parsedData.length > 1;

  if (!haveSomeData) {
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        borderRadius: 1,
        paddingX: 0.5,
        paddingY: 0.2,
      }}
    >
      <Typography fontSize={"12px"} fontWeight={700}>
        Totais p/ vencimento (KG)
      </Typography>
      <Grid container gap={0.5}>
        {parsedData.map((i, idx) => (
          <Grid
            item
            key={idx}
            sx={{
              backgroundColor: byExpireKeyColors[idx],
              paddingX: 0.5,
              paddingY: 0.1,
              borderRadius: 0.5,
            }}
          >
            <Typography
              fontSize={"8px"}
              color={byExpireKeyColors[idx] ? "white" : "black"}
            >
              {i.expireRange}
            </Typography>
            <Typography
              fontSize={"12px"}
              fontWeight={700}
              color={byExpireKeyColors[idx] ? "white" : "black"}
            >
              {i.weightInKg}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const getData = ({ data }: StockIncomingBatchesByExpireTotalsProps) => {
  return [
    {
      expireRange: "Vencido",
      weightInKg: toLocaleString(data?.expiredWeightInKg ?? 0),
    },
    ...Object.entries(data?.byExpireRange ?? {}).map(([key, value]) => ({
      expireRange: key,
      weightInKg: toLocaleString(value ?? 0),
    })),
  ];
};
