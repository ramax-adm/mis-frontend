import { COLORS } from "@/constants/styles/colors";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditSalesDataTotals,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green, indigo, red } from "@mui/material/colors";
import { BusinessAuditInvoiceTraceabilityKpiIndicator } from "../customized/invoice-traceability-kpi-indicator";

interface InvoiceTraceabilityKpisTotalsProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["kpis"];
}
export function InvoiceTraceabilityKpisTotals({
  data,
}: InvoiceTraceabilityKpisTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex", // <- muda para inline-flex
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        // backgroundColor: indigo["50"],
        // color: "white",
        width: "100%", // <- garante que só ocupe o necessário
      }}
    >
      <Typography fontWeight={700} fontSize={"12px"} color={indigo["A700"]}>
        FATURAMENTO DO PERIODO
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1, flexWrap: "wrap" }}>
        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='NFs'
          value={data?.invoiceQuantity ?? 0}
        />

        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$ Fat. Inicial'
          value={`R$ ${toLocaleString(data?.initialFatValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$ Tab'
          value={`R$ ${toLocaleString(data?.initialTableValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$ Desc. tabela'
          value={`R$ ${toLocaleString(data?.initialDifValue ?? 0)}`}
          isImportant
        />
        {/* <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$ Devoluções'
          value={`R$ ${toLocaleString(data?.returnOccurrencesValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$Refat.'
          value={`R$ ${toLocaleString(data?.reInvoicingsValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityKpiIndicator
          label='$ Fat. Final'
          value={`R$ ${toLocaleString(data?.finalFatValue ?? 0)}`}
          isImportant
        /> */}
      </Box>
    </Box>
  );
}
