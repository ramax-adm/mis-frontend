import { COLORS } from "@/constants/styles/colors";
import {
  InventoryGetAnalitycalDataResponse,
  InventoryGetResumeDataResponse,
} from "@/types/api/inventory";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";

interface InventoryResumeTotalsProps {
  data?: InventoryGetResumeDataResponse["totals"];
}
export function InventoryResumeTotals({ data }: InventoryResumeTotalsProps) {
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
          <Typography fontSize={"9.5px"}>Inventario Qtd.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.inventoryQuantity ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Inventario KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.inventoryWeightInKg ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Estoque Qtd.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.stockQuantity ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Estoque KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.stockWeightInKg ?? 0)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Dif Qtd</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.quantityDif ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Dif KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.weightInKgDif ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
