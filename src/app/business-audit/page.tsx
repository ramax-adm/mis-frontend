"use client";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { COLORS } from "@/constants/styles/colors";
import { Alert, Box, Button, Grid, Tab, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Suspense, useRef, useState } from "react";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { BusinessAuditOverviewSection } from "./components/sections/overview-section";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { BusinessAuditSalesSection } from "./components/sections/sales-section";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { MarketEnum } from "@/types/sensatta";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { useExportBusinessAuditXlsx } from "@/services/react-query/mutations/business-audit";
import { getIso8601DateString } from "@/utils/date.utils";

enum TabSectionsEnum {
  OVERVIEW_SECTION = "overview",
  SALES_SECTION = "sales",
}
const MARKET_OPTIONS = [
  {
    label: "ME",
    key: MarketEnum.ME,
    value: MarketEnum.ME,
  },
  {
    label: "MI",
    key: MarketEnum.MI,
    value: MarketEnum.MI,
  },
];
const PRICE_CONSIDERATION_OPTIONS = [
  { label: "Todos", value: OrderPriceConsiderationEnum.NONE },
  {
    label: "Acima da tabela",
    value: OrderPriceConsiderationEnum.OVER_TABLE_PRICE,
  },
  {
    label: "Abaixo da tabela",
    value: OrderPriceConsiderationEnum.UNDER_TABLE_PRICE,
  },
];

export default function BusinessAudit() {
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const { data: companies = [] } = useGetUserCompanies({});

  const [globalStates, setGlobalStates] = useQueryStates({
    selectedTab: parseAsString.withDefault(TabSectionsEnum.OVERVIEW_SECTION),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [salesSectionStates, setSalesSectionStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    market: parseAsString.withDefault(MarketEnum.MI),
    priceConsideration: parseAsString.withDefault(
      OrderPriceConsiderationEnum.NONE
    ),
    clientCode: parseAsString.withDefault(""),
    salesRepresentativeCode: parseAsString.withDefault(""),
  });

  const {
    mutateAsync: exportBusinessAuditReport,
    isPending: isExportingBusinessAuditReport,
  } = useExportBusinessAuditXlsx(
    globalStates.selectedTab as "overview" | "sales"
  );

  const handleSelectStartDate = (value: Date) =>
    setGlobalStates({ startDate: getIso8601DateString(value) });
  const handleSelectEndDate = (value: Date) =>
    setGlobalStates({ endDate: getIso8601DateString(value) });
  const handleSelectTab = (value: string) =>
    setGlobalStates({ selectedTab: value });
  const handleSelectMarket = (value: string) =>
    setSalesSectionStates({ market: value });
  const handleSelectPriceConsideration = (value: string) =>
    setSalesSectionStates({ priceConsideration: value as string });
  const handleSelectCompanyCode = (value: string[]) =>
    setSalesSectionStates({ companyCodes: value });

  const handleToogleCompanyCodes = () => {
    const companyCodes = salesSectionStates.companyCodes;
    if (!companyCodes) return;

    const haveSomeSelectedCompanyCodes = companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setSalesSectionStates({ companyCodes: [] });
    }

    return setSalesSectionStates({
      companyCodes: companies?.map((i) => i.sensattaCode),
    });
  };

  return (
    <PageContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
          gap: 1,
        }}
      >
        <PageContainerHeader
          title='Monitoramento'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isExportingBusinessAuditReport}
            onClick={async () =>
              await exportBusinessAuditReport({
                filters: {
                  startDate: globalStates.startDate,
                  endDate: globalStates.endDate,
                  companyCodes: salesSectionStates.companyCodes.join(","),
                  market: salesSectionStates.market as MarketEnum,
                  priceConsideration:
                    salesSectionStates.priceConsideration as OrderPriceConsiderationEnum,
                  clientCode: salesSectionStates.clientCode,
                  salesRepresentativeCode:
                    salesSectionStates.salesRepresentativeCode,
                },
              })
            }
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Inicio'
            size='small'
            value={dayjs(globalStates.startDate)}
            setValue={handleSelectStartDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Fim'
            size='small'
            value={dayjs(globalStates.endDate)}
            setValue={handleSelectEndDate}
          />
        </Grid>

        {globalStates.selectedTab === TabSectionsEnum.SALES_SECTION && (
          <>
            <Grid
              item
              marginTop={{
                xs: 0,
                sm: 0,
              }}
              xs={12}
              sm={2}
            >
              <MultipleSelectInputControlled
                label='Empresas'
                size='small'
                value={salesSectionStates.companyCodes}
                onChange={handleSelectCompanyCode}
                options={companies.map((i) => ({
                  label: `${i.sensattaCode} - ${i.name}`,
                  value: i.sensattaCode,
                  key: i.sensattaCode,
                }))}
              />{" "}
              <Typography
                fontSize={"9px"}
                sx={{
                  marginX: "auto",
                  "&:hover": {
                    color: COLORS.TEXTO,
                    cursor: "pointer",
                  },
                }}
                onClick={handleToogleCompanyCodes}
              >
                Selecionar/Deselecionar tudo
              </Typography>
            </Grid>
            <Grid
              item
              marginTop={{
                xs: 0,
                sm: -2.5,
              }}
              xs={12}
              sm={1.5}
            >
              <RadioInputControlled
                row
                name='market'
                label='Mercado'
                emptyMessage='Sem Opções'
                value={salesSectionStates.market}
                onChange={
                  handleSelectMarket as (value: string | number | Date) => void
                }
                options={MARKET_OPTIONS}
              />
            </Grid>
            <Grid
              item
              marginTop={{
                xs: 0,
                sm: -2.5,
              }}
              xs={12}
              sm={4}
            >
              <RadioInputControlled
                label='Tipo consideração preço'
                emptyMessage='Sem opções'
                name='priceConsideration'
                value={salesSectionStates.priceConsideration}
                onChange={
                  handleSelectPriceConsideration as (
                    value: string | number | Date
                  ) => void
                }
                options={PRICE_CONSIDERATION_OPTIONS}
              />
            </Grid>
          </>
        )}

        {globalStates.selectedTab === TabSectionsEnum.OVERVIEW_SECTION && (
          <Grid item>
            <Alert
              severity='info'
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "0.75rem", // tamanho do texto
                padding: "2px 8px", // padding interno
                "& .MuiAlert-icon": {
                  fontSize: "1rem", // tamanho do ícone
                },
              }}
            >
              As tabelas são interativas, clique nos campos para ser
              redirecionado a pagina.{" "}
              <span style={{ fontWeight: 700 }}>
                (Só esta funcionando para FATURAMENTO - Em DESENVOLVIMENTO)
              </span>
            </Alert>
          </Grid>
        )}
      </Grid>

      <Tabs.Root defaultTab={globalStates.selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Visão Geral' value={TabSectionsEnum.OVERVIEW_SECTION} />
          <Tab label='Vendas' value={TabSectionsEnum.SALES_SECTION} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel
            tabName={TabSectionsEnum.OVERVIEW_SECTION}
            ref={tabPanelRef}
          >
            <BusinessAuditOverviewSection />
          </Tabs.Panel>
        </Tabs.Content>
        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.SALES_SECTION} ref={tabPanelRef}>
            <BusinessAuditSalesSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
