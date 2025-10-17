import { COLORS } from "@/constants/styles/colors";
import {
  InventoryGetAnalitycalDataResponse,
  InventoryGetResumeDataResponse,
} from "@/types/api/inventory";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

interface InventoryResumeCancelatedTotalsProps {
  data?: InventoryGetResumeDataResponse["totals"];
}
export function InventoryResumeCancelatedTotals({
  data,
}: InventoryResumeCancelatedTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: red["200"],
        color: red["900"],
        width: "fit-content",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Cancelado
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Cancelado Qtd.</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.cancelatedQuantity ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Cancelado KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.cancelatedWeightInKg ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
