import { GetCattlePurchaseResumedTotalsItem } from "@/types/api/purchase";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface CattlePurchaseResumedTotalsIndicatorProps {
  data?: GetCattlePurchaseResumedTotalsItem;
}
export function CattlePurchaseResumedTotalsIndicator({
  data,
}: CattlePurchaseResumedTotalsIndicatorProps) {
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
            <Typography fontSize={"9px"}>Σ Cbs</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.cattleQuantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Peso @</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.weightInArroba ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Σ R$ Frete</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.freightPrice ?? 0, 2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Σ R$ Comissão</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.commissionPrice ?? 0, 2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Σ R$ Compra</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.purchasePrice ?? 0, 2)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>R$ Total</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.totalValue ?? 0, 2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
