"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { Tab, Typography } from "@mui/material";
import { useQueryState, parseAsString } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { IntranetSettingsSection } from "./components/sections/intranet-settings-section";

enum TabSectionsEnum {
  INTRANET = "intranet",
  USERS = "users",
}

export default function SettingsPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  const [currentIp, setCurrentIp] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(TabSectionsEnum.INTRANET)
  );
  const handleSelectTab = (value: string) => setSelectedTab(value);

  useEffect(() => {
    getApiData().then((res) => setCurrentIp(res.ip));
  }, []);

  return (
    <PageContainer>
      <PageContainerHeader title='Configurações' />
      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Intranet' value={TabSectionsEnum.INTRANET} />
          <Tab label='Usuarios' value={TabSectionsEnum.USERS} disabled />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.INTRANET} ref={tabPanelRef}>
            <IntranetSettingsSection />
          </Tabs.Panel>
          <Tabs.Panel tabName={TabSectionsEnum.USERS} ref={tabPanelRef}>
            <Typography>Usuarios</Typography>
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}

const getApiData = async () => {
  const response = await fetch("/settings/api");
  return await response.json();
};
