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
        justifyContent: "center",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        // backgroundColor: indigo["50"],
        width: "100%",
        marginTop: 1,
      }}
    >
      <Typography fontWeight={700} fontSize={"12px"} color={indigo["A700"]}>
        DEVOLUÇÕES C/ REFATURAMENTOS
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          marginTop: -1,
        }}
      >
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='Qtd.'
          value={`${toLocaleString(data?.reInvoicingQuantity ?? 0)} | ${toPercent(data?.reInvoicingQuantityPercent)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Fat.'
          value={`R$ ${toLocaleString(data?.invoicesValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Tab.'
          value={`R$ ${toLocaleString(data?.tableValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Desc. tabela'
          value={`R$ ${toLocaleString(data?.tableDifValue ?? 0)}`}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.1 }}>
          <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
            label='$ Fat. C1 reteve'
            value={`R$ ${toLocaleString(data?.invoicesProportionalValue ?? 0)}`}
            py={0}
            fontSize={8}
            cellFontSize={10.5}
          />
          <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
            label='$ Refat. C2'
            value={`R$ ${toLocaleString(data?.reInvoicingsValue ?? 0)}`}
            py={0}
            fontSize={8}
            cellFontSize={10.5}
          />
        </Box>
        <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ REFAT. FINAL'
          value={`R$ ${toLocaleString(data?.finalValue ?? 0)}`}
          isImportant
        />
        {/* <BusinessAuditInvoiceTraceabilityReInvoicingIndicator
          label='$ Desc'
          // value={`R$ ${toLocaleString(data?.difValue ?? 0)} | ${toPercent(data?.difPercent)}`}
          value={`R$ ${toLocaleString(data?.difValue ?? 0)}`}
          isImportant
        /> */}
      </Box>
    </Box>
  );
}
