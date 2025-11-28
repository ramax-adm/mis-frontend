import { Alert, Box } from "@mui/material";
import { ReturnOccurrencesCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByProductTable } from "../tables/return-occurrences-by-product-table";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";
import { ReturnOccurrencesTotals } from "../totals/return-occurrences-totals";

export function ReturnOccurrencesByProductCard() {
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
  const haveSomeData = businessData?.occurrencesByProduct
    ? Object.values(businessData.occurrencesByProduct).some(
        (item: any) => (item?.count ?? 0) > 0
      )
    : false;

  return (
    <ReturnOccurrencesCustomizedCard cardTitle='Devoluções p/ Produto'>
      <ReturnOccurrencesTotals
        data={businessData?.occurrencesByProduct?.totals}
      />

      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "250px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <ReturnOccurrencesByProductTable
            data={businessData?.occurrencesByProduct?.data}
            isFetching={isFetching}
          />
        </Box>
      )}
    </ReturnOccurrencesCustomizedCard>
  );
}
