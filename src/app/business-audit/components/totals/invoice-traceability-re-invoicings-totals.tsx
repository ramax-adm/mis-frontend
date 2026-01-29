import { COLORS } from "@/constants/styles/colors";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditSalesDataTotals,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green, indigo, orange, red } from "@mui/material/colors";
import { BusinessAuditInvoiceTraceabilityReInvoicingIndicator } from "../customized/invoice-traceability-re-invoicings-indicator";

interface InvoiceTraceabilityReInvoicingsTotalsProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["reInvoicingsTotals"];
}
export function InvoiceTraceabilityReInvoicingsTotals({
  data,
}: InvoiceTraceabilityReInvoicingsTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex", // <- muda para inline-flex
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        // backgroundColor: indigo["50"],
        width: "100%",
        marginTop: 1,
      }}
    >
      <Typography fontWeight={700} fontSize={"12px"} color={red["A700"]}>
        REFATURAMENTOS
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1, flexWrap: "wrap" }}>
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='Qtd.'
          value={`${toLocaleString(data?.reInvoicingQuantity ?? 0)} | ${toPercent(data?.reInvoicingQuantityPercent)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Fat. C1'
          value={`R$ ${toLocaleString(data?.invoicesValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Fat. C1 reteve'
          value={`R$ ${toLocaleString(data?.invoicesProportionalValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Refat. C2'
          value={`R$ ${toLocaleString(data?.reInvoicingsValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ REFAT. FINAL'
          value={`R$ ${toLocaleString(data?.finalValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Desc'
          value={`R$ ${toLocaleString(data?.difValue ?? 0)} | ${toPercent(data?.difPercent)}`}
        />
      </Box>
    </Box>
  );
}
