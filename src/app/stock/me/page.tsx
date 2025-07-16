"use client";

import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useSyncStockWithSensatta } from "@/services/react-query/mutations/sensatta";
import { useExportStockXlsx } from "@/services/react-query/mutations/stock";
import { useGetStockLastUpdatedAt } from "@/services/react-query/queries/stock";
import { Typography, Button, Tab, Box } from "@mui/material";
import { useState, useRef } from "react";
import { Tabs } from "@/components/Tabs";
import {
  AnalyticalSection,
  AnalyticalSectionRef,
} from "./components/sections/analytical-section";
import {
  ResumeSection,
  ResumeSectionRef,
} from "./components/sections/resume-section";

export default function StockPage() {
  // states
  const [selectCompanyInputError, setSelectCompanyInputError] = useState(false);

  // queries and mutations
  const { data: stockLastUpdate } = useGetStockLastUpdatedAt();
  const {
    mutateAsync: syncStockWithSensatta,
    isPending: isSyncStockWithSensatta,
  } = useSyncStockWithSensatta();
  const { mutateAsync: exportStockReport, isPending: isExportingStockReport } =
    useExportStockXlsx();

  // refs
  const resumedSectionRef = useRef<ResumeSectionRef>(null);
  const analyticalSectionRef = useRef<AnalyticalSectionRef>(null);
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const handleExportStockReport = async () => {
    if (!tabPanelRef.current) {
      console.log("no tab selected");
      return;
    }

    const selectedTab = tabPanelRef.current.getCurrentTabName() as
      | "resumed"
      | "analytical";
    let selectedCompany: string = "";
    let selectedProductLineAcronyms: any = {};

    switch (selectedTab) {
      case "analytical": {
        selectedCompany =
          analyticalSectionRef.current?.getSelectedCompany() as string;
        if (!selectedCompany || selectedCompany.length === 0) {
          return setSelectCompanyInputError(true);
        }

        selectedProductLineAcronyms =
          analyticalSectionRef.current?.getSelectedProductLines();
        break;
      }

      case "resumed": {
        selectedCompany = "";
        selectedProductLineAcronyms =
          resumedSectionRef.current?.getSelectedProductLines();
        break;
      }

      default: {
        console.log("error");
        break;
      }
    }

    await exportStockReport({
      stockSelectedTab: selectedTab,
      selectedProductLineAcronyms,
      selectedCompany,
    });
    setSelectCompanyInputError(false);
  };

  const syncStock = async () => await syncStockWithSensatta();
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
          title='Estoque - Mercado Externo'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização: {stockLastUpdate?.parsedUpdatedAt}
          </Typography>
          {/* <Typography variant='subtitle2' fontSize={'13px'}>
            Ultima atualização DATAVALE: {stockLastUpdate?.parsedExternalUpdatedAt}
          </Typography> */}
        </PageContainerHeader>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button variant='contained' size='small' onClick={syncStock}>
            Atualizar c/ SENSATTA
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={handleExportStockReport}
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      {/**
       * TODO:
       *
       * Mudar TABS.OPTIONS => TABS.SELECT [OK]
       * Deixar cada Tab => Tab.Option
       *
       * Estilização da tab
       */}
      {(isSyncStockWithSensatta || isExportingStockReport) && (
        <LoadingOverlay />
      )}
      <Tabs.Root defaultTab='resumed' sx={{ marginTop: -1 }}>
        <Tabs.Select>
          <Tab label='Resumo' value={"resumed"} />
          <Tab label='Analitico' value={"analytical"} />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName='resumed' ref={tabPanelRef}>
            <ResumeSection ref={resumedSectionRef} />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <AnalyticalSection
              ref={analyticalSectionRef}
              selectCompanyInputError={selectCompanyInputError}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
