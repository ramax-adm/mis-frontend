"use client";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { COLORS } from "@/constants/styles/colors";
import {
  Alert,
  Box,
  Button,
  Grid,
  switchClasses,
  Tab,
  Typography,
} from "@mui/material";
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
import { StorageKeysEnum } from "@/constants/app/storage";
import { usePersistedFilters } from "@/hooks/use-persisted-filters";
import {
  FiltersProvider,
  useAllFilters,
  useFilter,
} from "@/contexts/persisted-filters";
import { BusinessAuditReturnOccurrencesSection } from "./components/sections/return-occurrences-section";
import { SalesSectionFilters } from "./components/filters/sales-section-filters";
import { ReturnOccurrencesSectionFilters } from "./components/filters/return-occurrences-filters";
import { BusinessAuditTabSectionsEnum } from "./constants/business-audit-tab-sections.enum";

export default function BusinessAudit() {
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const [globalStates, setGlobalStates] = useQueryStates({
    selectedTab: parseAsString.withDefault(
      BusinessAuditTabSectionsEnum.OVERVIEW_SECTION
    ),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const {
    // sales
    [StorageKeysEnum.MONITORING_SALES_COMPANIES_FILTER]: {
      filters: salesCompanyCodes,
    },
    [StorageKeysEnum.MONITORING_SALES_MARKET_FILTER]: { filters: salesMarket },
    [StorageKeysEnum.MONITORING_SALES_PRICE_CONSIDERATION_FILTER]: {
      filters: salesPriceConsideration,
    },
    [StorageKeysEnum.MONITORING_SALES_CLIENT_FILTER]: {
      filters: salesClientCodes,
    },
    [StorageKeysEnum.MONITORING_SALES_REPRESENTATIVE_FILTER]: {
      filters: salesRepresentativeCodes,
    },
    // return occurrences
    [StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_COMPANIES_FILTER]: {
      filters: returnOccurrencesCompanyCodes,
    },
  } = useAllFilters();

  const {
    mutateAsync: exportBusinessAuditReport,
    isPending: isExportingBusinessAuditReport,
  } = useExportBusinessAuditXlsx(
    globalStates.selectedTab as BusinessAuditTabSectionsEnum
  );

  const handleSelectStartDate = (value: Date) =>
    setGlobalStates({ startDate: getIso8601DateString(value) });
  const handleSelectEndDate = (value: Date) =>
    setGlobalStates({ endDate: getIso8601DateString(value) });
  const handleSelectTab = (value: string) =>
    setGlobalStates({ selectedTab: value });

  const getExportReportFiltersPayload = () => {
    const payload = {
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
    };

    switch (globalStates.selectedTab) {
      case BusinessAuditTabSectionsEnum.SALES_SECTION: {
        Object.assign(payload, {
          companyCodes: salesCompanyCodes.join(","),
          market: salesMarket as MarketEnum,
          priceConsideration:
            salesPriceConsideration as OrderPriceConsiderationEnum,
          clientCodes: salesClientCodes.join(","),
          salesRepresentativeCodes: salesRepresentativeCodes.join(","),
        });
        break;
      }
      case BusinessAuditTabSectionsEnum.RETURN_OCCURRENCES_SECTION: {
        Object.assign(payload, {
          companyCodes: returnOccurrencesCompanyCodes.join(","),
        });
        break;
      }
    }

    return payload;
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
          title='Monitoramento (Auditoria)'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isExportingBusinessAuditReport}
            onClick={async () =>
              // Esse endpoint serve para todas as paginas, pela seção que esta ele sabe qual report deve tirar
              await exportBusinessAuditReport({
                filters: getExportReportFiltersPayload(),
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

        {globalStates.selectedTab ===
          BusinessAuditTabSectionsEnum.SALES_SECTION && <SalesSectionFilters />}

        {globalStates.selectedTab ===
          BusinessAuditTabSectionsEnum.RETURN_OCCURRENCES_SECTION && (
          <ReturnOccurrencesSectionFilters />
        )}

        {globalStates.selectedTab ===
          BusinessAuditTabSectionsEnum.OVERVIEW_SECTION && (
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
          <Tab
            label='Visão Geral'
            value={BusinessAuditTabSectionsEnum.OVERVIEW_SECTION}
          />
          <Tab
            label='Vendas'
            value={BusinessAuditTabSectionsEnum.SALES_SECTION}
          />
          <Tab
            label='Devoluções'
            value={BusinessAuditTabSectionsEnum.RETURN_OCCURRENCES_SECTION}
          />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel
            tabName={BusinessAuditTabSectionsEnum.OVERVIEW_SECTION}
            ref={tabPanelRef}
          >
            <BusinessAuditOverviewSection />
          </Tabs.Panel>
          <Tabs.Panel
            tabName={BusinessAuditTabSectionsEnum.SALES_SECTION}
            ref={tabPanelRef}
          >
            <BusinessAuditSalesSection />
          </Tabs.Panel>
          <Tabs.Panel
            tabName={BusinessAuditTabSectionsEnum.RETURN_OCCURRENCES_SECTION}
            ref={tabPanelRef}
          >
            <BusinessAuditReturnOccurrencesSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
