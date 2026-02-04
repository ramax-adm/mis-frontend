import { COLORS } from "@/constants/styles/colors";
import {
  BusinessAuditReturnOccurrencesDataTotals,
  GetBusinessAuditSalesDataTotals,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface ReturnOccurrencesTotalsProps {
  data?: BusinessAuditReturnOccurrencesDataTotals;
}
export function ReturnOccurrencesTotals({
  data,
}: ReturnOccurrencesTotalsProps) {
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
      <Box sx={{ display: "inline-flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9px"}># B.Os</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {data?.count ?? 0}
          </Typography>
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Qtd. Itens</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.quantity ?? 0)}
          </Typography>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Fat.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalSalesFatValue ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>$ Dev.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.value ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>% Dev</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toPercent(data?.percentFatValue ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Peso KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.weightInKg ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
