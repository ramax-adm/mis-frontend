import { COLORS } from "@/constants/styles/colors";
import {
  InventoryGetAnalitycalDataResponse,
  InventoryGetResumeDataResponse,
} from "@/types/api/inventory";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface InventoryResumeBlockedTotalsProps {
  data?: InventoryGetResumeDataResponse["totals"];
}
export function InventoryResumeBlockedTotals({
  data,
}: InventoryResumeBlockedTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: grey["900"],
        color: "white",
        width: "fit-content",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Bloqueado
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Bloqueado Qtd.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.blockedQuantity ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Bloqueado KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.blockedWeightInKg ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
