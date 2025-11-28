"use client";

import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { Box, Grid, Tab, Typography } from "@mui/material";
import { parseAsString, useQueryState } from "nuqs";
import { useRef } from "react";
import { ReturnOccurrencesTabSectionsEnum } from "./constants/tab-sections.enum";
import { ReturnOccurrencesAnalyticalSection } from "./components/sections/analytical-section";
import { ReturnOccurrencesSectionFilters } from "./components/filters/resume-filters";
import { ReturnOccurrencesResumeSection } from "./components/sections/resume-section";

export default function ReturnOccurrencesPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  // const resumeSectionRef = useRef<CattlePurchaseResumeSectionRef>(null);

  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(ReturnOccurrencesTabSectionsEnum.RESUME_SECTION)
  );

  const handleSelectTab = (value: string) => setSelectedTab(value);

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
          title='Vendas - Devoluções'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          {/* <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização:{lastUpdate?.parsedUpdatedAt}
          </Typography> */}
        </PageContainerHeader>
        {/* <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncInvoices}
            onClick={async () => await syncInvoices()}
          >
            Atualizar c/ SENSATTA
          </Button>
        </Box> */}
      </Box>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>
        <ReturnOccurrencesSectionFilters />
      </Grid>

      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab
            label='Resumo'
            value={ReturnOccurrencesTabSectionsEnum.RESUME_SECTION}
          />
          <Tab
            label='Analitico'
            value={ReturnOccurrencesTabSectionsEnum.ANALYTICAL_SECTION}
          />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel
            tabName={ReturnOccurrencesTabSectionsEnum.RESUME_SECTION}
            ref={tabPanelRef}
          >
            <ReturnOccurrencesResumeSection />
          </Tabs.Panel>
          <Tabs.Panel
            tabName={ReturnOccurrencesTabSectionsEnum.ANALYTICAL_SECTION}
            ref={tabPanelRef}
          >
            <ReturnOccurrencesAnalyticalSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
