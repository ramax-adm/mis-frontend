import { Alert, Box } from "@mui/material";
import { ReturnOccurrencesCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByProductGraph } from "../graphs/return-occurrences-by-type-graph";
import { LoaderIcon } from "../customized/loader-icon";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";

export function ReturnOccurrencesByTypeCard() {
  const [filterStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    returnType: parseAsString.withDefault(""),
    occurrenceCauses: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const [analyticalStates, setAnalyticalStates] = useQueryStates({
    occurrenceNumber: parseAsString.withDefault(""),
  });

  const { data: businessData, isFetching } =
    useGetBusinessAuditReturnOccurrencesData({
      startDate: filterStates.startDate,
      endDate: filterStates.endDate,
      companyCodes: filterStates.companyCodes.join(","),
      occurrenceCauses: filterStates.occurrenceCauses.join(","),
      occurrenceNumber: analyticalStates.occurrenceNumber,
      // returnType,
      // clientCodes,
      // representativeCodes
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
    <ReturnOccurrencesCustomizedCard cardTitle='Devoluções p/ Tipo'>
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
    </ReturnOccurrencesCustomizedCard>
  );
}
