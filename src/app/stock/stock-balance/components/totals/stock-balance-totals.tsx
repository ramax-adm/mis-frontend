import { GetStockBalanceAnalyticalTotals } from "@/types/api/stock-balance";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface StockBalanceTotalsProps {
  data?: GetStockBalanceAnalyticalTotals;
}
export function StockBalanceTotals({ data }: StockBalanceTotalsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Box
        sx={{
          marginTop: 1,
          padding: "2px",
          borderRadius: "4px",
          backgroundColor: "rgba(62, 99, 221, 0.2)",
          color: "#3E63DD",
        }}
      >
        <Typography fontWeight={700} fontSize={"12px"}>
          Totais
        </Typography>
        <Box sx={{ display: "inline-flex", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Qtd. Estoque</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.quantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>KG Estoque</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.weightInKg ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Qtd. Pedido</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.reservedQuantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>KG Pedido</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.reservedWeightInKg ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Qtd. Disponivel</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.availableQuantity ?? 0)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>KG Disponivel</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.availableWeightInKg ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
