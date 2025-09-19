import { COLORS } from "@/constants/styles/colors";
import { GetBusinessAuditSalesDataTotals } from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface SalesTotalsProps {
  data?: GetBusinessAuditSalesDataTotals;
}
export function SalesTotals({ data }: SalesTotalsProps) {
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
          <Typography fontSize={"9.5px"}>NF Itens</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {data?.count ?? 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Fat.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalFatValue ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Tabela.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalTableValue ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Desc.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalDiff ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
