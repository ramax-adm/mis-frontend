import { GetStockBalanceAggregatedAnalyticalDataResponse } from "@/types/api/stock-balance";
import { Box, Grid, Typography } from "@mui/material";
import { StockBalanceAnalyticalAggregatedTable } from "../tables/analytical-aggregated-table";
import { COLORS } from "@/constants/styles/colors";
import { StockBalanceTotalIndicator } from "../indicators/total-indicator";

interface StockBalanceAnalyticalAggregatedCardProps {
  data?: GetStockBalanceAggregatedAnalyticalDataResponse;
}
export function StockBalanceAnalyticalAggregatedCard({
  data,
}: StockBalanceAnalyticalAggregatedCardProps) {
  if (!data) {
    return null;
  }
  const dataKeys = Object.keys(data.items);

  return dataKeys.map((key) => (
    <Grid
      item
      xs={5.9}
      container
      sx={{
        borderRadius: "6px",
        border: `1px solid ${COLORS.BORDAS}`,
        backgroundColor: "white",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: 0.5,
      }}
    >
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 700, color: COLORS.TEXTO }}>
          {key}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <StockBalanceAnalyticalAggregatedTable data={data.items[key].data} />
      </Grid>
      <Grid
        xs={12}
        flexDirection={"row"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        flexWrap={"wrap"}
        marginTop={1}
      >
        <StockBalanceTotalIndicator
          title='Cx. Estoque: '
          value={data.items[key].total.quantity}
        />
        <StockBalanceTotalIndicator
          title='Kg. Estoque: '
          value={data.items[key].total.weightInKg}
        />
        <StockBalanceTotalIndicator
          title='Cx. Pedido: '
          value={data.items[key].total.reservedQuantity}
        />
        <StockBalanceTotalIndicator
          title='Kg. Pedido: '
          value={data.items[key].total.reservedWeightInKg}
        />
        <StockBalanceTotalIndicator
          title='Cx. Disp: '
          value={data.items[key].total.availableQuantity}
        />
        <StockBalanceTotalIndicator
          title='Kg. Disp: '
          value={data.items[key].total.availableWeightInKg}
        />
      </Grid>
    </Grid>
  ));
}
