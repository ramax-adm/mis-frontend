import { Box, Typography } from "@mui/material";
import { indigo, orange, red } from "@mui/material/colors";

interface BusinessAuditInvoiceTraceabilityReInvoicingIndicatorProps {
  label: string;
  value?: string | number;
  isImportant?: boolean;
  py?: number;
  px?: number;
  fontSize?: number;
  cellFontSize?: number;
}
export function BusinessAuditInvoiceTraceabilityReInvoicingIndicator({
  label,
  value = "N/D",
  isImportant = false,
  py = 0.2,
  px = 0.5,
  fontSize = 9.5,
  cellFontSize = 12.5,
}: BusinessAuditInvoiceTraceabilityReInvoicingIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: isImportant ? indigo["A400"] : indigo["50"],
        borderRadius: 0.5,
        py,
        px,
        width: "120px",
      }}
    >
      <Typography
        sx={{
          fontSize,
          fontWeight: isImportant ? 700 : 400,
          color: isImportant ? indigo["50"] : indigo["A400"],
        }}
        color={indigo["A400"]}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: cellFontSize,
          fontWeight: 700,
          color: isImportant ? indigo["50"] : indigo["A400"],
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
