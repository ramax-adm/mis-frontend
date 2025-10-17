import { COLORS } from "@/constants/styles/colors";
import { InventoryGetAnalitycalDataResponse } from "@/types/api/inventory";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface InventoryAnalyticalTotalsProps {
  data?: InventoryGetAnalitycalDataResponse["totals"];
}
export function InventoryAnalyticalTotals({
  data,
}: InventoryAnalyticalTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: COLORS.FUNDO_PRIMARIO,
        color: COLORS.TEXTO,
        width: "fit-content",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Qtd. Caixas</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {data?.count ?? 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Peso KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.totalWeight ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
