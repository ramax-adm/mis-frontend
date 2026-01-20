import { Alert, Box, Typography } from "@mui/material";
import { ReturnOccurrencesCustomizedCard } from "../customized/card";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import {
  useGetBusinessAuditReturnOccurrencesClients,
  useGetBusinessAuditReturnOccurrencesData,
  useGetBusinessAuditReturnOccurrencesRepresentatives,
} from "@/services/react-query/queries/business-audit";
import { ReturnOccurrencesTable } from "../tables/return-occurrences-by-item-table";
import { ReturnOccurrencesTotals } from "../totals/return-occurrences-totals";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";

export function ReturnOccurrencesByItemCard() {
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
  const { data: clients } = useGetBusinessAuditReturnOccurrencesClients();
  const { data: representatives } =
    useGetBusinessAuditReturnOccurrencesRepresentatives();

  // const handleOccurrenceNumber = (value: string | null) =>
  //   setOccurrenceNumber(value ?? "");
  // const handleToogleClientCodes = () => {
  //   if (!clientCodes) return;

  //   const haveSomeSelectedClientCodes = clientCodes?.length > 0;
  //   if (haveSomeSelectedClientCodes) {
  //     return setClientCodes([]);
  //   }

  //   return setClientCodes(clients?.map((i) => i.value) ?? []);
  // };

  // const handleToogleRepresentativeCodes = () => {
  //   if (!representativeCodes) return;

  //   const haveSomeSelectedRepresentatives = representativeCodes?.length > 0;
  //   if (haveSomeSelectedRepresentatives) {
  //     return setRepresentativeCodes([]);
  //   }

  //   return setRepresentativeCodes(representatives?.map((i) => i.value) ?? []);
  // };

  const haveSomeData = businessData?.occurrences;

  return (
    <ReturnOccurrencesCustomizedCard cardTitle='Relação de devoluções'>
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
        {/* <Box sx={{ width: "100px" }}>
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
        </Box> */}
      </Box>
      {!haveSomeData && !isFetching ? (
        <Box sx={{ display: "grid", placeContent: "center", height: "300px" }}>
          <Alert severity='info'>Sem Dados</Alert>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {/* <ReturnOccurrencesTable
            data={businessData?.occurrences.data}
            isFetching={isFetching}
          /> */}
        </Box>
      )}
    </ReturnOccurrencesCustomizedCard>
  );
}
