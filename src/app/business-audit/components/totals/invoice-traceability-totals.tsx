import { COLORS } from "@/constants/styles/colors";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditSalesDataTotals,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green, grey, indigo, red } from "@mui/material/colors";
import { BusinessAuditInvoiceTraceabilityTotalsIndicator } from "../customized/invoice-traceability-totals-indicator";

interface InvoiceTraceabilityTotalsProps {
  data?: GetBusinessAuditInvoiceTraceabilityDataResponse["totals"];
}
export function InvoiceTraceabilityTotals({
  data,
}: InvoiceTraceabilityTotalsProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 0,
        padding: "2px",
        borderRadius: "4px",
        // backgroundColor: indigo["A700"],
        width: "100%",
        marginTop: 1,
      }}
    >
      <Typography color={indigo["A700"]} fontWeight={700} fontSize={"12px"}>
        TOTALIZADORES
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1, flexWrap: "wrap" }}>
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='NFs Totais'
          value={data?.quantityNf ?? 0}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='$ Fat. Final'
          value={`R$ ${toLocaleString(data?.finalValue ?? 0)}`}
          isImportant
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='$ Desc. tabela total'
          value={`R$ ${toLocaleString(data?.initialDifValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='$ Desc. refaturamento'
          value={`R$ ${toLocaleString(data?.reInvoicingDifValue ?? 0)} `}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='$ Desc. total'
          value={`R$ ${toLocaleString(data?.totalDifValue ?? 0)} `}
          isImportant
        />
      </Box>
    </Box>
  );
}
