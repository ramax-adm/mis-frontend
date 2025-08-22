import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { COLORS } from "@/constants/styles/colors";
import {
  useGetStockBalanceAggregatedAnalyticalData,
  useGetStockBalanceAnalyticalData,
} from "@/services/react-query/queries/stock-balance";
import { MarketEnum } from "@/types/sensatta";
import { Box, Grid, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import {
  useGetCompanies,
  useGetProductLines,
} from "@/services/react-query/queries/sensatta";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { StockBalanceAnalyticalAggregatedCard } from "../cards/analytical-aggregated-card";
import { StockBalanceAnalyticalDataCard } from "../cards/analytical-data-card";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { StockBalanceTotals } from "../totals/stock-balance-totals";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";

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

const MARKET_OPTIONS = [
  {
    label: "Ambos",
    value: MarketEnum.BOTH,
    key: MarketEnum.BOTH,
  },
  {
    label: "ME",
    value: MarketEnum.ME,
    key: MarketEnum.ME,
  },
  {
    label: "MI",
    value: MarketEnum.MI,
    key: MarketEnum.MI,
  },
];

export interface StockBalanceAnalyticalSectionRef {}
export const StockBalanceAnalyticalSection =
  forwardRef<StockBalanceAnalyticalSectionRef>(() => {
    const [
      {
        selectedCompany,
        selectedMarket,
        selectedDataVisualization,
        selectedProductLines,
      },
      setQueryStates,
    ] = useQueryStates(
      {
        selectedCompany: parseAsString.withDefault(""),
        selectedMarket: parseAsString.withDefault(MarketEnum.BOTH),
        selectedDataVisualization: parseAsStringEnum([
          "aggregated-analytical",
          "analytical",
        ]).withDefault("aggregated-analytical"),
        selectedProductLines: parseAsArrayOf(parseAsString).withDefault([]),
      },
      {
        clearOnDefault: true,
      }
    );

    const [, setTableStates] = useQueryStates({
      page: parseAsInteger,
    });

    // vars
    const selectedProductLinesCodes = selectedProductLines.map(
      (i) => i.split("-")[0]
    );

    // handlers
    const handleSelectCompany = (value: string) =>
      setQueryStates({ selectedCompany: value });

    const handleSelectMarket = (value: string) => {
      setTableStates({ page: 0 });
      setQueryStates({ selectedMarket: value as MarketEnum });
    };

    const handleSelectDataVisualization = (
      value: "aggregated-analytical" | "analytical"
    ) => setQueryStates({ selectedDataVisualization: value });

    const handleSelectedProductLines = (values: string[]) =>
      setQueryStates({ selectedProductLines: values });

    const handleSelectAndDisselectAllProductLines = () => {
      if (!productLines) return;

      setTableStates({ page: 0 });
      const haveSomeSelectedProductLines = selectedProductLines.length > 0;
      if (haveSomeSelectedProductLines) {
        return setQueryStates({ selectedProductLines: [] });
      }

      return setQueryStates({
        selectedProductLines: productLines.map(
          (i) => `${i.sensattaCode}-${i.acronym}`
        ),
      });
    };

    // queries
    const { data: companies } = useGetUserCompanies({
      isConsideredOnStock: true,
    });
    const { data: productLines } = useGetProductLines({
      market: selectedMarket as MarketEnum,
    });
    const { data: stockData, isFetching: isFetchingStockData } =
      useGetStockBalanceAnalyticalData({
        dataVisualization: selectedDataVisualization,
        companyCode: selectedCompany,
        market: selectedMarket,
        productLineCode: selectedProductLinesCodes.join(","),
      });
    const {
      data: stockAggregatedData,
      isFetching: isFetchingStockAggregatedData,
    } = useGetStockBalanceAggregatedAnalyticalData({
      dataVisualization: selectedDataVisualization,
      companyCode: selectedCompany,
      market: selectedMarket,
      productLineCode: selectedProductLinesCodes.join(","),
    });

    if (isFetchingStockData || isFetchingStockAggregatedData) {
      return <LoadingOverlay />;
    }

    return (
      <>
        <Grid container marginTop={1} gap={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                marginTop: -0.5,
              }}
            >
              <Typography fontSize={"12px"} fontWeight={700}>
                Empresa
              </Typography>
              <ControlledSelect
                id='companyCode'
                name='companyCode'
                size='small'
                label='Empresa'
                value={selectedCompany}
                onChange={handleSelectCompany}
                options={companies?.map((c) => ({
                  label: `${c.sensattaCode} - ${c.name}`,
                  value: c.sensattaCode,
                  key: c.sensattaCode,
                }))}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                marginTop: -0.5,
              }}
            >
              <Typography fontSize={"12px"} fontWeight={700}>
                Linha
              </Typography>
              <MultipleSelectInputControlled
                size='small'
                label='Linha de produto'
                value={selectedProductLines}
                onChange={handleSelectedProductLines}
                options={
                  productLines?.map((item) => ({
                    key: `${item.sensattaCode}-${item.acronym}`,
                    label: `${item.sensattaCode} - ${item.name}`,
                  })) ?? []
                }
              />
              <Typography
                fontSize={"9px"}
                sx={{
                  marginLeft: 0.5,
                  "&:hover": {
                    color: COLORS.TEXTO,
                    cursor: "pointer",
                  },
                }}
                onClick={handleSelectAndDisselectAllProductLines}
              >
                Selecionar/Deselecionar tudo
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <RadioInputControlled
              row
              name='market'
              label='Mercado'
              emptyMessage='Sem Opções'
              value={selectedMarket}
              onChange={
                handleSelectMarket as (value: string | number | Date) => void
              }
              options={MARKET_OPTIONS}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
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
            {selectedDataVisualization === "aggregated-analytical" && (
              <StockBalanceTotals data={stockAggregatedData?.totals} />
            )}

            {selectedDataVisualization === "analytical" && (
              <StockBalanceTotals data={stockData?.totals} />
            )}
          </Grid>
        </Grid>
        <Grid container marginTop={1} gap={1}>
          {selectedDataVisualization === "aggregated-analytical" && (
            <StockBalanceAnalyticalAggregatedCard data={stockAggregatedData} />
          )}
          {selectedDataVisualization === "analytical" && (
            <StockBalanceAnalyticalDataCard data={stockData?.items} />
          )}
        </Grid>
      </>
    );
  });

StockBalanceAnalyticalSection.displayName = "StockBalanceAnalyticalSection";
