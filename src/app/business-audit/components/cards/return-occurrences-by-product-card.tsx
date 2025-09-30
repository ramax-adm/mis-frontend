import { Alert, Box } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { useGetBusinessAuditReturnOccurrencesData } from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesByProductTable } from "../tables/return-occurrences-by-product-table";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";
import { ReturnOccurrencesTotals } from "../totals/return-occurrences-totals";

export function ReturnOccurrencesByProductCard() {
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
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CLIENT_FILTER]: {
      filters: clientCodes,
    },
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_REPRESENTATIVE_FILTER]: {
      filters: representativeCodes,
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
  const haveSomeData = businessData?.occurrencesByProduct
    ? Object.values(businessData.occurrencesByProduct).some(
        (item: any) => (item?.count ?? 0) > 0
      )
    : false;

  return (
    <BusinessAuditCustomizedCard cardTitle='Devoluções p/ Produto'>
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
    </BusinessAuditCustomizedCard>
  );
}
