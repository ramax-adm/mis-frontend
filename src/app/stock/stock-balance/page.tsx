"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { Box, Button, Tab, Typography } from "@mui/material";
import { useRef, useState } from "react";
import {
  StockBalanceAnalyticalSection,
  StockBalanceAnalyticalSectionRef,
} from "./components/sections/analytical-section";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { useExportStockBalanceAllXlsx } from "@/services/react-query/mutations/stock-balance";
import { useGetStockBalanceLastUpdatedAt } from "@/services/react-query/queries/stock-balance";
import { useSyncStockBalanceWithSensatta } from "@/services/react-query/mutations/sensatta";

export default function StockBalancePage() {
  const [, setSelectedTab] = useState<"analytical">("analytical");

  const handleSelectTab = (value: string) =>
    setSelectedTab(value as "analytical");

  const tabPanelRef = useRef<TabsPanelRef>(null);
  const analyticalSectionRef = useRef<StockBalanceAnalyticalSectionRef>(null);

  const { mutateAsync: exportStockBalance, isPending: isExportStockBalance } =
    useExportStockBalanceAllXlsx();
  const { mutateAsync: syncStockBalance, isPending: isSyncStockBalance } =
    useSyncStockBalanceWithSensatta();
  const { data: stockLastUpdatedAt } = useGetStockBalanceLastUpdatedAt();

  return (
    <PageContainer>
      {isSyncStockBalance && <LoadingOverlay />}
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
          title='Estoque - Saldo Estoque'
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
            disabled={isSyncStockBalance}
            onClick={async () => await syncStockBalance()}
          >
            Atualizar c/ SENSATTA
          </Button>
          <Button
            variant='contained'
            size='small'
            disabled={isExportStockBalance}
            onClick={async () => await exportStockBalance()}
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      <Tabs.Root defaultTab='analytical'>
        <Tabs.Select sx={{ width: "150px" }} customHandler={handleSelectTab}>
          <Tab label='Analitico' value={"analytical"} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <StockBalanceAnalyticalSection ref={analyticalSectionRef} />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
