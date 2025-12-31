import {
  useGetCattlePurchaseAggregatedAnalyticalData,
  useGetCattlePurchaseAnalyticalData,
  useGetCattlePurchaseCattleAdvisor,
  useGetCattlePurchaseCattleClassification,
  useGetCattlePurchaseCattleOwner,
} from "@/services/react-query/queries/purchase";
import { Grid, Typography } from "@mui/material";
import { CattlePurchaseTotalsIndicator } from "../customized/totals-indicator";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { AnalyticalCattlePurchasesTable } from "../tables/analytical-cattle-purchases-table";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { forwardRef, useImperativeHandle, useState } from "react";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { AnalyticalAggregatedCattlePurchasesTable } from "../tables/analytical-aggregated-cattle-purchases-table";
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";

const DATA_VISUALIZATION_OPTIONS = [
  {
    label: "Agregado",
    value: "aggregated-analytical",
    key: "aggregated-analytical",
  },
  {
    label: "Analitico",
    value: "analytical",
    key: "analytical",
  },
];

interface CattlePurchaseAnalyticalSectionProps {}

export interface CattlePurchaseAnalyticalSectionRef {
  getFilterOptions: () => {
    selectedCattleOwner: string;
    selectedCattleClassification: string;
    selectedCattleAdvisor: string;
  };
}

export const CattlePurchaseAnalyticalSection = forwardRef<
  CattlePurchaseAnalyticalSectionRef,
  CattlePurchaseAnalyticalSectionProps
>(({}, ref) => {
  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    cattleOwner: parseAsString.withDefault(""),
    cattleAdvisor: parseAsString.withDefault(""),
    cattleClassification: parseAsString.withDefault(""),
  });

  const [sectionStates, setSectionStates] = useQueryStates({
    dataVisualization: parseAsStringEnum([
      "aggregated-analytical",
      "analytical",
    ]).withDefault("aggregated-analytical"),
    purchaseCattleOrderId: parseAsString.withDefault(""),
  });

  const handleSelectPurchaseCattleOrderId = (value: string | null) =>
    setSectionStates({ purchaseCattleOrderId: value });

  const handleSelectDataVisualization = (value: string) =>
    setSectionStates({
      dataVisualization: value as "aggregated-analytical" | "analytical",
    });

  const { data: cattlePurchases, isFetching } =
    useGetCattlePurchaseAnalyticalData({
      dataVisualization: sectionStates.dataVisualization,
      companyCodes: globalStates.companyCodes.join(","),
      cattleOwnerName: globalStates.cattleOwner,
      cattleAdvisorName: globalStates.cattleAdvisor,
      cattleClassification: globalStates.cattleClassification,
      purchaseCattleOrderId: sectionStates.purchaseCattleOrderId,
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
    });

  const {
    data: cattlePurchasesAggregated,
    isFetching: isFetchingCattlePurchasesAggregated,
  } = useGetCattlePurchaseAggregatedAnalyticalData({
    dataVisualization: sectionStates.dataVisualization,
    companyCodes: globalStates.companyCodes.join(","),
    cattleOwnerName: globalStates.cattleOwner,
    cattleAdvisorName: globalStates.cattleAdvisor,
    cattleClassification: globalStates.cattleClassification,
    purchaseCattleOrderId: sectionStates.purchaseCattleOrderId,
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
  });

  const purchaseTotals =
    sectionStates.dataVisualization === "aggregated-analytical"
      ? cattlePurchasesAggregated?.totals
      : cattlePurchases?.totals;

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getFilterOptions: () => ({
        selectedCattleOwner: globalStates.cattleOwner,
        selectedCattleAdvisor: globalStates.cattleAdvisor,
        selectedCattleClassification: globalStates.cattleClassification,
      }),
    }),
    [
      globalStates.cattleOwner,
      globalStates.cattleAdvisor,
      globalStates.cattleClassification,
    ]
  );

  return (
    <>
      {(isFetching || isFetchingCattlePurchasesAggregated) && (
        <LoadingOverlay />
      )}
      <Grid container spacing={1}>
        <Grid item xs={12} />

        <Grid item xs={12} sm={2} marginTop={{ xs: 0, sm: -1 }} marginLeft={1}>
          <RadioInputControlled
            row
            name='dataVisualization'
            label='Visualização'
            emptyMessage='Sem Opções'
            value={sectionStates.dataVisualization}
            onChange={
              handleSelectDataVisualization as (
                value: string | number | Date
              ) => void
            }
            options={DATA_VISUALIZATION_OPTIONS}
          />
        </Grid>
        <Grid item marginTop={1}>
          <TextInputControlled
            label='Cod OC'
            value={sectionStates.purchaseCattleOrderId}
            setValue={handleSelectPurchaseCattleOrderId}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <CattlePurchaseTotalsIndicator data={purchaseTotals} />
        </Grid>
      </Grid>
      <Grid container marginTop={1}>
        <Grid item xs={12}>
          {sectionStates.dataVisualization === "aggregated-analytical" && (
            <AnalyticalAggregatedCattlePurchasesTable
              data={cattlePurchasesAggregated?.data}
            />
          )}

          {sectionStates.dataVisualization === "analytical" &&
            cattlePurchases?.parsedData && (
              <AnalyticalCattlePurchasesTable
                data={cattlePurchases?.parsedData}
              />
            )}
        </Grid>
      </Grid>
    </>
  );
});
