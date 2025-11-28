import { Alert, Box } from "@mui/material";
import { ReturnOccurrencesCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByDayGraph } from "../graphs/return-occurrences-by-day-graph";

export function ReturnOccurrencesByDayCard() {
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
  const haveSomeData = businessData?.occurrencesByDay
    ? Object.values(businessData.occurrencesByDay).some(
        (item: any) => (item?.count ?? 0) > 0
      )
    : false;

  return (
    <ReturnOccurrencesCustomizedCard cardTitle='Devoluções p/ dia'>
      {/* <SalesTotals data={sales?.salesByClient.totals} /> */}

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "340px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <ReturnOccurrencesByDayGraph
            data={businessData?.occurrencesByDay?.data}
            isFetching={isFetching}
          />
        </Box>
      )}
    </ReturnOccurrencesCustomizedCard>
  );
}
