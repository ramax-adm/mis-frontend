"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Box, Grid, Tab, Typography } from "@mui/material";

import { parseAsString, useQueryStates } from "nuqs";
import { FreightCompanyConsultationTable } from "./components/tables/freight-company-consultation-table";
import { green, red } from "@mui/material/colors";
import { COLORS } from "@/constants/styles/colors";
import { AnttConsultationOverviewSection } from "./components/sections/overview-section";
import { Tabs } from "@/components/Tabs";
import { useRef } from "react";
import { TabsPanelRef } from "@/components/Tabs/panel";

enum TabSectionEnum {
  OVERVIEW = "overview",
}
export default function FreightsAnttConsultationPage() {
  const [states, setStates] = useQueryStates({
    selectedTab: parseAsString.withDefault(TabSectionEnum.OVERVIEW),
  });

  const tabPanelRef = useRef<TabsPanelRef>(null);

  const handleSelectTab = (value: string) => setStates({ selectedTab: value });

  return (
    <PageContainer>
      <PageContainerHeader
        title='Fretes - Consulta ANTT'
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
        }}
      />

      <Tabs.Root defaultTab={states.selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Visão Geral' value={TabSectionEnum.OVERVIEW} />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionEnum.OVERVIEW} ref={tabPanelRef}>
            <AnttConsultationOverviewSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
