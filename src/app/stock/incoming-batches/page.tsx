"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { Box, Button, Tab, Typography } from "@mui/material";
import { useRef } from "react";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useSyncStockWithSensatta } from "@/services/react-query/mutations/sensatta";
import { useGetStockLastUpdatedAt } from "@/services/react-query/queries/stock";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { StockIncomingBatchesResumeSection } from "./components/sections/resume-section";
import { useExportStockIncomingBatchesXlsx } from "@/services/react-query/mutations/stock-incoming-batches";
import { MarketEnum } from "@/types/sensatta";
import { StockIncomingBatchesAnalyticalSection } from "./components/sections/analytical-section";
import {
  PopoverContent,
  PopoverTrigger,
  PopoverTypography,
  PopoverRoot,
} from "@/components/Button/PopoverButton";
import { IoMdDownload } from "react-icons/io";

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
    companyCode: parseAsString.withDefault(""),
    market: parseAsString.withDefault(""),
    productLineCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
  });
  const handleSelectTab = (value: string) => setSelectedTab(value);

  const tabPanelRef = useRef<TabsPanelRef>(null);

  const { mutateAsync: exportStock, isPending: isExportingStock } =
    useExportStockIncomingBatchesXlsx();
  const { data: stockLastUpdatedAt } = useGetStockLastUpdatedAt();
  const { mutateAsync: syncStock, isPending: isSyncStock } =
    useSyncStockWithSensatta();

  const onExportReport = async (selectedTab: string) =>
    await exportStock({
      exportType: selectedTab,
      filters: {
        companyCode: resumeSectionStates.companyCode,
        market: resumeSectionStates.market as MarketEnum,
        productLineCodes: resumeSectionStates.productLineCodes.map(
          (i) => i.split("-")[0]
        ),
      },
    });

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
          <PopoverRoot>
            <PopoverTrigger
              startIcon={<IoMdDownload size={15} />}
              disabled={isExportingStock}
            >
              Exportar XLSX
            </PopoverTrigger>
            <PopoverContent>
              <PopoverTypography onClick={() => onExportReport("resumed")}>
                Exportar Resumo
              </PopoverTypography>
              <PopoverTypography onClick={() => onExportReport("analytical")}>
                Exportar Analitico
              </PopoverTypography>
              <PopoverTypography
                onClick={() => onExportReport("all-analytical")}
              >
                Exportar Analitico (TODOS OS DADOS)
              </PopoverTypography>
            </PopoverContent>
          </PopoverRoot>
        </Box>
      </Box>

      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Resumo' value={TabSectionsEnum.RESUME} />
          <Tab label='Analitico' value={TabSectionsEnum.ANALYTICAL} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.RESUME} ref={tabPanelRef}>
            <StockIncomingBatchesResumeSection />
          </Tabs.Panel>
          <Tabs.Panel tabName={TabSectionsEnum.ANALYTICAL} ref={tabPanelRef}>
            <StockIncomingBatchesAnalyticalSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
