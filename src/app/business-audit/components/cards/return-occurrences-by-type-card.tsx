import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByProductGraph } from "../graphs/return-occurrences-by-type-graph";

export function ReturnOccurrencesByTypeCard() {
  const [globalStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const { data: businessData, isFetching } =
    useGetBusinessAuditReturnOccurrencesData({
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
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

      {!haveSomeData ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
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
