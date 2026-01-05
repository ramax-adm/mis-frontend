import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface CattlePurchaseKpiIndicatorProps {
  label: string;
  value?: string | number;
}
export function CattlePurchaseKpiIndicator({
  label,
  value = "N/D",
}: CattlePurchaseKpiIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: indigo["A400"],
        borderRadius: 0.5,
        py: 0.2,
        px: 0.5,
      }}
    >
      <Typography
        sx={{ fontSize: 10, fontWeight: 400, color: "white" }}
        color={"white"}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: "white" }}>
        {value}
      </Typography>
    </Box>
  );
}
