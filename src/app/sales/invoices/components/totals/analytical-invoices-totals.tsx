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
        <Typography fontWeight={700} fontSize={"10px"}>
          Totais
        </Typography>
        <Box sx={{ display: "inline-flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={"9.5px"}>Qtd. NFs</Typography>
            <Typography fontSize={"11px"} fontWeight={700}>
              {toLocaleString(data?.quantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={"9.5px"}>Qtd. Produtos</Typography>
            <Typography fontSize={"11px"} fontWeight={700}>
              {toLocaleString(data?.productQuantity ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={"9.5px"}>Caixas</Typography>
            <Typography fontSize={"11px"} fontWeight={700}>
              {toLocaleString(data?.boxAmount ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={"9.5px"}>Peso KG</Typography>
            <Typography fontSize={"11px"} fontWeight={700}>
              {toLocaleString(data?.weightInKg ?? 0)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={"9.5px"}>$ Total</Typography>
            <Typography fontSize={"11px"} fontWeight={700}>
              {toLocaleString(data?.totalPrice ?? 0)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
