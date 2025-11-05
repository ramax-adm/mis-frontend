import { COLORS } from "@/constants/styles/colors";
import { GetBusinessAuditSalesDataTotals } from "@/types/api/business-audit";
import { AccountsReceivableGetAnalyticalDataResponseDto } from "@/types/api/finance";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface AccountsReceivableTotalsProps {
  data?: AccountsReceivableGetAnalyticalDataResponseDto["totals"];
}
export function AccountsReceivableTotals({
  data,
}: AccountsReceivableTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex", // <- muda para inline-flex
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: COLORS.FUNDO_PRIMARIO,
        color: COLORS.TEXTO,
        width: "fit-content", // <- garante que só ocupe o necessário
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Qtd. Registros</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {data?.quantity ?? 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Valor</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.value ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Aberto.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.openValue ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
