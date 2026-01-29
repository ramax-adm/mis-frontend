import { Box, Typography } from "@mui/material";
import { indigo, orange, red } from "@mui/material/colors";

interface BusinessAuditInvoiceTraceabilityTotalsIndicatorProps {
  label: string;
  value?: string | number;
}
export function BusinessAuditInvoiceTraceabilityTotalsIndicator({
  label,
  value = "N/D",
}: BusinessAuditInvoiceTraceabilityTotalsIndicatorProps) {
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
        width: "150px",
      }}
    >
      <Typography
        sx={{ fontSize: 10, fontWeight: 400, color: indigo["50"] }}
        color={indigo["50"]}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: indigo["50"] }}>
        {value}
      </Typography>
    </Box>
  );
}
