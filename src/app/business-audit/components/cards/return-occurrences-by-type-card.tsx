import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByProductGraph } from "../graphs/return-occurrences-by-type-graph";
import { LoaderIcon } from "../customized/loader-icon";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";

export function ReturnOccurrencesByTypeCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const {
    // return occurrences
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_COMPANIES_FILTER]: {
      filters: companyCodes,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CAUSES_FILTER]: {
      filters: occurrenceCauses,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_RETURN_TYPES_FILTER]: {
      filters: returnType,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_OCCURRENCE_NUMBER_FILTER]: {
      filters: occurrenceNumber,
      setFilters: setOccurrenceNumber,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CLIENT_FILTER]: {
      filters: clientCodes,
      setFilters: setClientCodes,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_REPRESENTATIVE_FILTER]: {
      filters: representativeCodes,
      setFilters: setRepresentativeCodes,
    },
  } = useAllFilters();
  const { data: businessData, isFetching } =
    useGetBusinessAuditReturnOccurrencesData({
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
      companyCodes: companyCodes.join(","),
      occurrenceCauses: occurrenceCauses.join(","),
      occurrenceNumber,
      returnType,
      clientCodes: clientCodes.join(","),
      representativeCodes: representativeCodes.join(","),
    });

  const haveSomeData = businessData?.occurrencesByType
    ? Object.values(businessData.occurrencesByType).some(
        (item: any) =>
          (item?.quantity ?? 0) > 0 ||
          (item?.weightInKg ?? 0) > 0 ||
          (item?.value ?? 0) > 0
      )
    : false;
  return (
    <BusinessAuditCustomizedCard cardTitle='Devoluções p/ Tipo'>
      {/* <SalesTotals data={sales?.salesByClient.totals} /> */}

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "340px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <ReturnOccurrencesByProductGraph
            data={businessData?.occurrencesByType}
            isFetching={isFetching}
          />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
