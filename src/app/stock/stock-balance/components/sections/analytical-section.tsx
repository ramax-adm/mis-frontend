import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { COLORS } from "@/constants/styles/colors";
import {
  useGetStockBalanceAggregatedAnalyticalData,
  useGetStockBalanceAnalyticalData,
} from "@/services/react-query/queries/stock-balance";
import { MarketEnum } from "@/types/sensatta";
import { Box, Grid, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { StockBalanceAnalyticalAggregatedTable } from "../tables/analytical-aggregated-table";
import { useGetCompanies } from "@/services/react-query/queries/sensatta";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { StockBalanceAnalyticalAggregatedCard } from "../cards/analytical-aggregated-card";
import { StockBalanceAnalyticalDataCard } from "../cards/analytical-data-card";

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
    label: "Mi",
    value: MarketEnum.MI,
    key: MarketEnum.MI,
  },
];

export interface StockBalanceAnalyticalSectionRef {}
export const StockBalanceAnalyticalSection =
  forwardRef<StockBalanceAnalyticalSectionRef>(() => {
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedMarket, setSelectedMarket] = useState<MarketEnum>(
      MarketEnum.BOTH
    );
    const [selectedDataVisualization, setSelectedDataVisualization] = useState<
      "aggregated-analytical" | "analytical"
    >("aggregated-analytical");

    const handleSelectCompany = (value: string) => setSelectedCompany(value);
    const handleSelectMarket = (value: string) =>
      setSelectedMarket(value as MarketEnum);
    const handleSelectDataVisualization = (value: string) =>
      setSelectedDataVisualization(
        value as "aggregated-analytical" | "analytical"
      );

    const { data: companies } = useGetCompanies({});
    const { data: stockData, isFetching: isFetchingStockData } =
      useGetStockBalanceAnalyticalData({
        dataVisualization: selectedDataVisualization,
        companyCode: selectedCompany,
        market: selectedMarket,
      });
    const {
      data: stockAggregatedData,
      isFetching: isFetchingStockAggregatedData,
    } = useGetStockBalanceAggregatedAnalyticalData({
      dataVisualization: selectedDataVisualization,
      companyCode: selectedCompany,
      market: selectedMarket,
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
                  label: c.name,
                  value: c.sensattaCode,
                  key: c.sensattaCode,
                }))}
              />
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
        <Grid container marginTop={1} gap={1}>
          {selectedDataVisualization === "aggregated-analytical" && (
            <StockBalanceAnalyticalAggregatedCard data={stockAggregatedData} />
          )}
          {selectedDataVisualization === "analytical" && (
            <StockBalanceAnalyticalDataCard data={stockData} />
          )}
        </Grid>
      </>
    );
  });

StockBalanceAnalyticalSection.displayName = "StockBalanceAnalyticalSection";
