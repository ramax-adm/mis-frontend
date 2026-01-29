import { COLORS } from "@/constants/styles/colors";
import {
  GetBusinessAuditInvoiceTraceabilityDataResponse,
  GetBusinessAuditSalesDataTotals,
} from "@/types/api/business-audit";
import { toLocaleString, toPercent } from "@/utils/string.utils";
import { Box, Typography } from "@mui/material";
import { green, indigo, red } from "@mui/material/colors";
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
      <Typography color={indigo["A400"]} fontWeight={700} fontSize={"12px"}>
        TOTAIS
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1, flexWrap: "wrap" }}>
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='NFs'
          value={data?.quantityNf ?? 0}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='$ Fat. Final'
          value={`R$ ${toLocaleString(data?.finalValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='Desc. inicial'
          value={`R$ ${toLocaleString(data?.initialDifValue ?? 0)}`}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='Desc. refat'
          value={`R$ ${toLocaleString(data?.reInvoicingDifValue ?? 0)} `}
        />
        <BusinessAuditInvoiceTraceabilityTotalsIndicator
          label='Desc. total'
          value={`R$ ${toLocaleString(data?.totalDifValue ?? 0)} `}
        />
      </Box>
    </Box>
  );
}
