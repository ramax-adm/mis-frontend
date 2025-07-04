import { GetStockBalanceAnalyticalDataResponse } from "@/types/api/stock-balance";
import { StockBalanceAnalyticalTable } from "../tables/analytical-table";
import { Grid } from "@mui/material";

interface StockBalanceAnalyticalDataCardProps {
  data?: GetStockBalanceAnalyticalDataResponse[];
}
export function StockBalanceAnalyticalDataCard({
  data = [],
}: StockBalanceAnalyticalDataCardProps) {
  return (
    <Grid item xs={12}>
      <StockBalanceAnalyticalTable data={data} />
    </Grid>
  );
}
