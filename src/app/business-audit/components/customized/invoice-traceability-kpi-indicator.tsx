import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface BusinessAuditInvoiceTraceabilityKpiIndicatorProps {
  label: string;
  value?: string | number;
}
export function BusinessAuditInvoiceTraceabilityKpiIndicator({
  label,
  value = "N/D",
}: BusinessAuditInvoiceTraceabilityKpiIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: indigo["50"],
        borderRadius: 0.5,
        py: 0.2,
        px: 0.5,
        width: "150px",
      }}
    >
      <Typography
        sx={{ fontSize: 10, fontWeight: 400, color: indigo["A400"] }}
        color={indigo["A400"]}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: indigo["A400"] }}>
        {value}
      </Typography>
    </Box>
  );
}
