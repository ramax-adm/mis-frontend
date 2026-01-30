import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString } from "nuqs";
import {
  useGetBusinessAuditInvoiceTraceabilityData,
  useGetBusinessAuditReturnOccurrencesData,
} from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByTypeGraph } from "../graphs/return-occurrences-by-type-graph";
import { LoaderIcon } from "../customized/loader-icon";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";
import { InvoiceTraceabilitySalesByCompanyTable } from "../tables/invoice-traceability-sales-by-company-table";
import { InvoiceTraceabilityReInvoicingTraceabilityTable } from "../tables/invoice-traceability-re-invoicing-traceability-table";

export function InvoiceTraceabilityReInvoicingTraceabilityCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0],
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const {
    // return occurrences
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_COMPANIES_FILTER]: {
      filters: companyCodes,
    },
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_CLIENT_FILTER]: {
      filters: clientCodes,
    },
    [StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_REPRESENTATIVE_FILTER]: {
      filters: representativeCodes,
    },
  } = useAllFilters();

  const { data, isFetching } = useGetBusinessAuditInvoiceTraceabilityData({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    clientCodes: clientCodes?.join(","),
    companyCodes: companyCodes?.join(","),
    representativeCodes: representativeCodes?.join(","),
  });

  const haveSomeData =
    data?.reinvoicingsTraceability && data?.reinvoicingsTraceability.length > 0;
  return (
    <BusinessAuditCustomizedCard cardTitle='Relação de refaturamentos'>
      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "430px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <InvoiceTraceabilityReInvoicingTraceabilityTable
            data={data?.reinvoicingsTraceability}
            isFetching={isFetching}
          />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
