"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { useExportStockBalanceAllXlsx } from "@/services/react-query/mutations/stock-balance";
import { useGetStockBalanceLastUpdatedAt } from "@/services/react-query/queries/stock-balance";
import {
  useSyncStockBalanceWithSensatta,
  useSyncStockWithSensatta,
} from "@/services/react-query/mutations/sensatta";
import { useGetStockLastUpdatedAt } from "@/services/react-query/queries/stock";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { InventoryAnaliticalSection } from "./components/sections/analytical-section";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import {
  useGetInventoriesFilters,
  useGetInventoryLastUpdatedAt,
} from "@/services/react-query/queries/inventory";
import { TextInput } from "@/components/Inputs/TextInput/uncontrolled";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { InventoryResumeSection } from "./components/sections/resume-section";
import { InventoryResumeFilters } from "./components/filters/resume-filters";
import { InventoryAnalyticalFilters } from "./components/filters/analytical-filters";

enum TabSectionsEnum {
  RESUME = "resumed",
  ANALYTICAL = "analytical",
}

export default function InventoryPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(TabSectionsEnum.RESUME)
  );

  const [globalStates, setGlobalStates] = useQueryStates({
    companyCode: parseAsString.withDefault(""),
    inventoryId: parseAsString.withDefault(""),
  });

  const { data: companies } = useGetUserCompanies({
    isConsideredOnStock: true,
  });

  const { data: inventories } = useGetInventoriesFilters({
    companyCode: globalStates.companyCode,
  });

  const { data: lastUpdatedAt } = useGetInventoryLastUpdatedAt();

  const handleSelectTab = (value: string) => setSelectedTab(value);

  const handleSelectCompany = (value: string) =>
    setGlobalStates({ companyCode: value });

  const handleSelectInventory = (value: string) =>
    setGlobalStates({ inventoryId: value });

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
          title='Estoque - Inventário'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização: {lastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
      </Box>

      <Grid container spacing={1} marginTop={0.5}>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='companyCode'
            name='companyCode'
            label='Empresa'
            size='small'
            value={globalStates.companyCode}
            onChange={handleSelectCompany}
            options={companies?.map((c) => ({
              key: c.sensattaCode,
              value: c.sensattaCode,
              label: `${c.sensattaCode} - ${c.name}`,
            }))}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='inventoryId'
            name='inventoryId'
            label='ID do Inventário'
            size='small'
            value={globalStates.inventoryId}
            onChange={handleSelectInventory}
            options={inventories?.map((i) => ({
              label: i.label,
              value: i.value,
              key: i.key,
            }))}
          />
        </Grid>

        {selectedTab === TabSectionsEnum.RESUME && <InventoryResumeFilters />}
        {selectedTab === TabSectionsEnum.ANALYTICAL && (
          <InventoryAnalyticalFilters />
        )}
      </Grid>

      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Resumo' value={TabSectionsEnum.RESUME} />
          <Tab label='Analitico' value={TabSectionsEnum.ANALYTICAL} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.RESUME} ref={tabPanelRef}>
            <InventoryResumeSection />
          </Tabs.Panel>
          <Tabs.Panel tabName={TabSectionsEnum.ANALYTICAL} ref={tabPanelRef}>
            <InventoryAnaliticalSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
