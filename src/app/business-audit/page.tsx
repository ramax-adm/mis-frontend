"use client";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { COLORS } from "@/constants/styles/colors";
import { useGetBusinessAuditOverviewData } from "@/services/react-query/queries/business-audit";
import { Alert, Box, Grid, Tab, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Suspense, useRef, useState } from "react";
import { ManuallyEnteredInvoicesTable } from "./components/tables/manually-entered-invoices-table";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { ManuallyEnteredInvoicesTotals } from "./components/totals/manually-entered-invoices-totals";
import { CattlePurchaseFreightsDuplicatedTable } from "./components/tables/cattle-purchase-freights-duplicated-table";
import { CattlePurchaseFreightsOverTablePriceTable } from "./components/tables/cattle-purchase-freights-over-table-price-table";
import { OpenCattlePurchaseFreightsTable } from "./components/tables/open-cattle-purchase-freights-table";
import { CattlePurchaseFreightsDuplicatedTotals } from "./components/totals/cattle-purchase-freights-duplicated-totals";
import { CattlePurchaseFreightsOverTablePriceTotals } from "./components/totals/cattle-purchase-freights-over-table-price-totals";
import { StockToExpiresTotals } from "./components/totals/stock-to-expires-totals";
import { StockToExpiresTable } from "./components/tables/stock-to-expires-table";
import { OpenCattlePurchaseFreightsTotals } from "./components/totals/open-cattle-purchase-freights-totals";
import { InvoicesWithSamePriceTable } from "./components/tables/invoices-with-same-price-table";
import { InvoicesWithSamePriceTotals } from "./components/totals/invoices-with-same-price-totals";
import {
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
import { OrderPriceConsiderationEnum } from "@/types/sales";

enum TabSectionsEnum {
  OVERVIEW_SECTION = "overview",
  SALES_SECTION = "sales",
}

export default function BusinessAudit() {
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const [globalStates, setGlobalStates] = useQueryStates({
    selectedTab: parseAsString.withDefault(TabSectionsEnum.OVERVIEW_SECTION),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  const [salesSectionStates, setSalesSectionStates] = useQueryStates({
    priceConsideration: parseAsString.withDefault(
      OrderPriceConsiderationEnum.NONE
    ),
  });

  const handleSelectStartDate = (value: Date) => {
    const rawString = value.toISOString().split("T")[0];
    setGlobalStates({ startDate: rawString });
  };
  const handleSelectEndDate = (value: Date) => {
    const rawString = value.toISOString().split("T")[0];
    setGlobalStates({ endDate: rawString });
  };
  const handleSelectTab = (value: string) =>
    setGlobalStates({ selectedTab: value });

  return (
    <PageContainer>
      <PageContainerHeader title='Monitoramento' />
      <Grid container spacing={1}>
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
          <Grid item marginTop={-2} xs={12} sm={4}>
            <RadioInputControlled
              label='Tipo consideração preço'
              emptyMessage='Sem opções'
              name='priceConsideration'
              value={salesSectionStates.priceConsideration}
              options={[
                { label: "Todos", value: OrderPriceConsiderationEnum.NONE },
                {
                  label: "Acima da tabela",
                  value: OrderPriceConsiderationEnum.OVER_TABLE_PRICE,
                },
                {
                  label: "Abaixo da tabela",
                  value: OrderPriceConsiderationEnum.UNDER_TABLE_PRICE,
                },
              ]}
              onChange={(value) =>
                setSalesSectionStates({ priceConsideration: value as string })
              }
            />
          </Grid>
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
