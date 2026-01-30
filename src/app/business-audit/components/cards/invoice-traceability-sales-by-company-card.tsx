import { Alert, Box, Typography } from "@mui/material";
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
import { GetBusinessAuditInvoiceTraceabilityDataResponse } from "@/types/api/business-audit";
import { toLocaleString } from "@/utils/number.utils";
import { toPercent } from "@/utils/string.utils";

export function InvoiceTraceabilitySalesByCompanyCard() {
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
    data?.salesByCompany.data &&
    Object.values(data.salesByCompany.data).length > 0;
  return (
    <BusinessAuditCustomizedCard cardTitle='Concentração p/ empresa'>
      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "270px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <CardTotals totals={data?.salesByCompany.totals} />
          <InvoiceTraceabilitySalesByCompanyTable
            data={data?.salesByCompany.data}
            isFetching={isFetching}
          />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}

const CardTotals = ({
  totals,
}: {
  totals?: GetBusinessAuditInvoiceTraceabilityDataResponse["salesByCompany"]["totals"];
}) => {
  return (
    <Box
      sx={{
        padding: "2px",
        borderRadius: "4px",
        backgroundColor: "rgba(62, 99, 221, 0.1)",
        color: "#3E63DD",

        width: "100%",
      }}
    >
      <Typography fontWeight={800} fontSize={"10px"}>
        Totais
      </Typography>
      <Box sx={{ display: "inline-flex", gap: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>Qtd. </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(totals?.quantity ?? 0)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            // border: "1px solid red",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>Qtd % </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toPercent(totals?.quantityPercent ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>$Fat. inicial </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(totals?.invoiceValue ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>$Tab. </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(totals?.referenceTableValue ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>$Desc </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(totals?.difValue ?? 0)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Typography fontSize={"9px"}>%Desc. </Typography>
          <Typography fontSize={"11px"} fontWeight={800}>
            {"  "}
            {toLocaleString(totals?.difPercent ?? 0)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
