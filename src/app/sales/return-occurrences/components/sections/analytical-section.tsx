import { Grid, Typography } from "@mui/material";
import { AnalyticalReturnOccurrencesTable } from "../tables/return-occurrences-table";
import { useGetAnalyticalReturnOccurrences } from "@/services/react-query/queries/sales";
import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { ReturnOccurrencesTotals } from "../totals/return-occurrences-totals";
import { useCallback } from "react";

export function ReturnOccurrencesAnalyticalSection() {
  const [filterStates] = useQueryStates({
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0],
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    returnType: parseAsString.withDefault(""),
    occurrenceCauses: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const [sectionStates, setSectionStates] = useQueryStates({
    occurrenceNumber: parseAsString.withDefault(""),
  });

  const { data: returnOccurences, isFetching } =
    useGetAnalyticalReturnOccurrences({
      companyCodes: filterStates.companyCodes.join(","),
      startDate: filterStates.startDate,
      endDate: filterStates.endDate,
      occurrenceCauses: filterStates.occurrenceCauses.join(","),
      returnType: filterStates.returnType,
      occurrenceNumber: sectionStates.occurrenceNumber,
    });

  const handleSetOccurrenceNumber = (value: string | null) =>
    setSectionStates({ occurrenceNumber: value });

  const getTotals = useCallback(() => {
    const totals = {
      count: 0,
      quantity: 0,
      value: 0,
      totalSalesFatValue: 0,
      percentFatValue: 0,
      weightInKg: 0,
      invoiceValue: 0,
    };

    if (returnOccurences?.totals) {
      totals.count = returnOccurences?.totals.count;
      totals.quantity = returnOccurences?.totals.returnQuantity;
      totals.value = returnOccurences?.totals.returnValue;
      totals.weightInKg = returnOccurences?.totals.returnWeightInKg;
      // totals.invoiceValue = returnOccurences?.totals.;
    }

    return totals;
  }, [returnOccurences]);

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12} marginTop={0.1}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros analitico
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextInputControlled
            label='N° B.O'
            value={sectionStates.occurrenceNumber}
            setValue={handleSetOccurrenceNumber}
          />
        </Grid>
      </Grid>
      <Grid container spacing={0.5} marginTop={1}>
        <Grid xs={12}>
          <ReturnOccurrencesTotals data={getTotals()} />
        </Grid>
        <Grid item xs={12}>
          <AnalyticalReturnOccurrencesTable
            data={returnOccurences?.data}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </>
  );
}
