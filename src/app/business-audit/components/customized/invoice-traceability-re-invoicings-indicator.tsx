import { Box, Typography } from "@mui/material";
import { indigo, orange, red } from "@mui/material/colors";

interface BusinessAuditInvoiceTraceabilityReInvoicingIndicatorProps {
  label: string;
  value?: string | number;
}
export function BusinessAuditInvoiceTraceabilityReInvoicingIndicator({
  label,
  value = "N/D",
}: BusinessAuditInvoiceTraceabilityReInvoicingIndicatorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        backgroundColor: red["50"],
        borderRadius: 0.5,
        py: 0.2,
        px: 0.5,
        width: "150px",
      }}
    >
      <Typography
        sx={{ fontSize: 10, fontWeight: 400, color: red["A400"] }}
        color={red["A400"]}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: red["A400"] }}>
        {value}
      </Typography>
    </Box>
  );
}
