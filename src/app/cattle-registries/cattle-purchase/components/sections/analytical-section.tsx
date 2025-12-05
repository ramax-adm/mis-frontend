import {
  useGetCattlePurchaseAggregatedAnalyticalData,
  useGetCattlePurchaseAnalyticalData,
  useGetCattlePurchaseCattleAdvisor,
  useGetCattlePurchaseCattleClassification,
  useGetCattlePurchaseCattleOwner,
} from "@/services/react-query/queries/purchase";
import { Grid, Typography } from "@mui/material";
import { CattlePurchaseAnalyticalTotalsIndicator } from "../customized/analytical-totals-indicator";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { AnalyticalCattlePurchasesTable } from "../tables/analytical-cattle-purchases-table";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { forwardRef, useImperativeHandle, useState } from "react";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { AnalyticalAggregatedCattlePurchasesTable } from "../tables/analytical-aggregated-cattle-purchases-table";

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

interface CattlePurchaseAnalyticalSectionProps {
  companyCode: string;
  startDate: Date | null;
  endDate: Date | null;
}

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
>(({ companyCode, endDate, startDate }, ref) => {
  const [selectedDataVisualization, setSelectedDataVisualization] = useState<
    "aggregated-analytical" | "analytical"
  >("aggregated-analytical");

  const [selectedCattleOwner, setSelectedCattleOwner] = useState<string>("");
  const [selectedCattleClassification, setSelectedCattleClassification] =
    useState<string>("");
  const [selectedCattleAdvisor, setSelectedCattleAdvisor] =
    useState<string>("");

  const handleSelectCattleOwner = (value: string) =>
    setSelectedCattleOwner(value);
  const handleSelectCattleClassification = (value: string) =>
    setSelectedCattleClassification(value);
  const handleSelectCattleAdvisor = (value: string) =>
    setSelectedCattleAdvisor(value);
  const handleSelectDataVisualization = (value: string) =>
    setSelectedDataVisualization(
      value as "aggregated-analytical" | "analytical"
    );

  const { data: cattlePurchases, isFetching } =
    useGetCattlePurchaseAnalyticalData({
      dataVisualization: selectedDataVisualization,
      companyCode,
      cattleOwnerName: selectedCattleOwner,
      cattleAdvisorName: selectedCattleAdvisor,
      cattleClassification: selectedCattleClassification,
      startDate,
      endDate,
    });

  const {
    data: cattlePurchasesAggregated,
    isFetching: isFetchingCattlePurchasesAggregated,
  } = useGetCattlePurchaseAggregatedAnalyticalData({
    dataVisualization: selectedDataVisualization,
    companyCode,
    cattleOwnerName: selectedCattleOwner,
    cattleAdvisorName: selectedCattleAdvisor,
    cattleClassification: selectedCattleClassification,
    startDate,
    endDate,
  });

  const { data: cattleOwners } = useGetCattlePurchaseCattleOwner({
    companyCode,
    startDate,
    endDate,
  });
  const { data: cattleClassifications } =
    useGetCattlePurchaseCattleClassification({
      companyCode,
      startDate,
      endDate,
    });
  const { data: cattleAdvisors } = useGetCattlePurchaseCattleAdvisor({
    companyCode,
    startDate,
    endDate,
  });

  const purchaseTotals =
    selectedDataVisualization === "aggregated-analytical"
      ? cattlePurchasesAggregated?.totals
      : cattlePurchases?.totals;

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getFilterOptions: () => ({
        selectedCattleOwner,
        selectedCattleAdvisor,
        selectedCattleClassification,
      }),
    }),
    [selectedCattleOwner, selectedCattleAdvisor, selectedCattleClassification]
  );

  return (
    <>
      {(isFetching || isFetchingCattlePurchasesAggregated) && (
        <LoadingOverlay />
      )}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={700}>
            Filtros Analitico
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleOwnerName'
            label='Pecuarista'
            name='cattleOwnerName'
            value={selectedCattleOwner}
            onChange={handleSelectCattleOwner}
            options={cattleOwners?.map((i) => ({
              label: i.cattleOwnerName,
              value: i.cattleOwnerName,
              key: i.cattleOwnerName,
            }))}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleAdvisorName'
            label='Assessor'
            name='cattleAdvisorName'
            value={selectedCattleAdvisor}
            onChange={handleSelectCattleAdvisor}
            options={cattleAdvisors?.map((i) => ({
              label: i.cattleAdvisorName,
              value: i.cattleAdvisorName,
              key: i.cattleAdvisorName,
            }))}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleClassification'
            label='Classificação do gado'
            name='cattleClassification'
            value={selectedCattleClassification}
            onChange={handleSelectCattleClassification}
            options={cattleClassifications?.map((i) => ({
              label: i.cattleClassification,
              value: i.cattleClassification,
              key: i.cattleClassification,
            }))}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={{ xs: 0, sm: -2 }} marginLeft={1}>
          <RadioInputControlled
            row
            name='dataVisualization'
            label='Visualização'
            emptyMessage='Sem Opções'
            value={selectedDataVisualization}
            onChange={
              handleSelectDataVisualization as (
                value: string | number | Date
              ) => void
            }
            options={DATA_VISUALIZATION_OPTIONS}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <CattlePurchaseAnalyticalTotalsIndicator data={purchaseTotals} />
        </Grid>
      </Grid>
      <Grid container marginTop={1}>
        <Grid item xs={12}>
          {selectedDataVisualization === "aggregated-analytical" && (
            <AnalyticalAggregatedCattlePurchasesTable
              data={cattlePurchasesAggregated?.data}
            />
          )}

          {selectedDataVisualization === "analytical" &&
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
