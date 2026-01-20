import { Alert, Box, Typography } from "@mui/material";
import { BusinessAuditCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import {
  useGetBusinessAuditReturnOccurrencesClients,
  useGetBusinessAuditReturnOccurrencesData,
  useGetBusinessAuditReturnOccurrencesRepresentatives,
} from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesTable } from "../tables/return-occurrences-by-item-table";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useAllFilters } from "@/contexts/persisted-filters";
import { ReturnOccurrencesTotals } from "../totals/return-occurrences-totals";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";

export function ReturnOccurrencesByItemCard() {
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
  const { data: clients } = useGetBusinessAuditReturnOccurrencesClients();
  const { data: representatives } =
    useGetBusinessAuditReturnOccurrencesRepresentatives();

  const handleOccurrenceNumber = (value: string | null) =>
    setOccurrenceNumber(value ?? "");
  const handleToogleClientCodes = () => {
    if (!clientCodes) return;

    const haveSomeSelectedClientCodes = clientCodes?.length > 0;
    if (haveSomeSelectedClientCodes) {
      return setClientCodes([]);
    }

    return setClientCodes(clients?.map((i) => i.value) ?? []);
  };

  const handleToogleRepresentativeCodes = () => {
    if (!representativeCodes) return;

    const haveSomeSelectedRepresentatives = representativeCodes?.length > 0;
    if (haveSomeSelectedRepresentatives) {
      return setRepresentativeCodes([]);
    }

    return setRepresentativeCodes(representatives?.map((i) => i.value) ?? []);
  };

  const haveSomeData = businessData?.occurrences;
  // &&    Object.values(businessData?.occurrences.data).length > 0;

  return (
    <BusinessAuditCustomizedCard cardTitle='Relação de devoluções'>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 1,
        }}
      >
        <Box sx={{ width: "400px" }}>
          <ReturnOccurrencesTotals data={businessData?.occurrences.totals} />
        </Box>
        <Box sx={{ width: "100px" }}>
          <TextInputControlled
            label='N° B.O'
            value={occurrenceNumber}
            setValue={handleOccurrenceNumber}
          />
        </Box>
        <Box sx={{ width: "150px" }}>
          <MultipleSelectInputControlled
            size='small'
            label='Cliente'
            value={clientCodes}
            onChange={(value) => setClientCodes(value)}
            options={
              clients?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleToogleClientCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Box>
        <Box sx={{ width: "150px" }}>
          <MultipleSelectInputControlled
            size='small'
            label='Representante'
            value={representativeCodes}
            onChange={(value) => setRepresentativeCodes(value)}
            options={
              representatives?.map((i) => ({
                key: i.key.toString(),
                value: i.value.toString(),
                label: i.label,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleToogleRepresentativeCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Box>
      </Box>
      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "300px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <ReturnOccurrencesTable
            data={businessData?.occurrences.data}
            isFetching={isFetching}
          />
        </Box>
      )}
    </BusinessAuditCustomizedCard>
  );
}
