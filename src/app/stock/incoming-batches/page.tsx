"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { Box, Button, Tab, Typography } from "@mui/material";
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
import { StockIncomingBatchesResumeSection } from "./components/sections/resume-section";
import { useExportStockIncomingBatchesAllXlsx } from "@/services/react-query/mutations/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";

enum TabSectionsEnum {
  RESUME = "resumed",
  ANALYTICAL = "analytical",
}

export default function StockIncomingBatchesPage() {
  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(TabSectionsEnum.RESUME)
  );
  const [resumeSectionStates] = useQueryStates({
    market: parseAsString.withDefault(""),
    productLineCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
  });
  const handleSelectTab = (value: string) => setSelectedTab(value);

  const tabPanelRef = useRef<TabsPanelRef>(null);

  const { mutateAsync: exportStock, isPending: isExportingStock } =
    useExportStockIncomingBatchesAllXlsx();
  const { data: stockLastUpdatedAt } = useGetStockLastUpdatedAt();
  const { mutateAsync: syncStock, isPending: isSyncStock } =
    useSyncStockWithSensatta();

  return (
    <PageContainer>
      {isSyncStock && <LoadingOverlay />}
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
          title='Estoque - Etiquetas'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização: {stockLastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncStock}
            onClick={async () => await syncStock()}
          >
            Atualizar c/ SENSATTA
          </Button>
          <Button
            variant='contained'
            size='small'
            disabled={isExportingStock}
            onClick={async () =>
              await exportStock({
                exportType: selectedTab as "resumed" | "analytical",
                filters: {
                  market: resumeSectionStates.market as MarketEnum,
                  productLineCodes: resumeSectionStates.productLineCodes.map(
                    (i) => i.split("-")[0]
                  ),
                },
              })
            }
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      <Tabs.Root defaultTab={TabSectionsEnum.RESUME}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Resumo' value={TabSectionsEnum.RESUME} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.RESUME} ref={tabPanelRef}>
            <StockIncomingBatchesResumeSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
