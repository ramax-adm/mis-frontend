import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface BusinessAuditInvoiceTraceabilityKpiIndicatorProps {
  label: string;
  value?: string | number;
  isImportant?: boolean;
}
export function BusinessAuditInvoiceTraceabilityKpiIndicator({
  label,
  value = "N/D",
  isImportant = false,
}: BusinessAuditInvoiceTraceabilityKpiIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: isImportant ? indigo["A400"] : indigo["50"],
        borderRadius: 0.5,
        py: 0.2,
        px: 0.5,
        width: "120px",
      }}
    >
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: isImportant ? 700 : 400,
          color: isImportant ? indigo["50"] : indigo["A400"],
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 700,
          color: isImportant ? indigo["50"] : indigo["A400"],
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
