import { COLORS } from "@/constants/styles/colors";
import {
  InventoryGetAnalitycalDataResponse,
  InventoryGetResumeDataResponse,
} from "@/types/api/inventory";
import { toLocaleString } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

interface InventoryResumeDispatchedTotalsProps {
  data?: InventoryGetResumeDataResponse["totals"];
}
export function InventoryResumeDispatchedTotals({
  data,
}: InventoryResumeDispatchedTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: green["200"],
        color: green["900"],
        width: "fit-content",
      }}
    >
      <Typography fontWeight={700} fontSize={"10px"}>
        Expedido
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Expedido Qtd</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.dispatchedQuantity ?? 0)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography fontSize={"9.5px"}>Expedido KG</Typography>
          <Typography fontSize={"11px"} fontWeight={700}>
            {toLocaleString(data?.dispatchedWeightInKg ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
