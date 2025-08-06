import { GetCattlePurchaseResumedTotalsItem } from "@/types/api/purchase";
import { GetAnalyticalInvoicesResponse } from "@/types/api/sales";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface AnalyticalInvoicesTotalsProps {
  data?: GetAnalyticalInvoicesResponse["totals"];
}
export function AnalyticalInvoicesTotals({
  data,
}: AnalyticalInvoicesTotalsProps) {
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
            <Typography fontSize={"9px"}>Qtd. NFs</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.quantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Qtd. Produtos</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.productQuantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Caixas</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.boxAmount ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>Σ Peso KG</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.weightInKg ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography fontSize={"9px"}>R$ Total</Typography>
            <Typography fontSize={"14px"} fontWeight={700}>
              {toLocaleString(data?.totalPrice ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
