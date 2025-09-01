"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { Tab, Typography } from "@mui/material";
import { useQueryState, parseAsString } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { IntranetSettingsSection } from "./components/sections/intranet-settings-section";
import { UserSettingsSection } from "./components/sections/user-settings-section";

enum TabSectionsEnum {
  INTRANET = "intranet",
  USERS = "users",
}

export default function SettingsPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(TabSectionsEnum.INTRANET)
  );

  const handleSelectTab = (value: string) => setSelectedTab(value);

  return (
    <PageContainer>
      <PageContainerHeader title='Configurações' />
      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Intranet' value={TabSectionsEnum.INTRANET} />
          <Tab label='Usuarios' value={TabSectionsEnum.USERS} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.INTRANET} ref={tabPanelRef}>
            <IntranetSettingsSection />
          </Tabs.Panel>
          <Tabs.Panel tabName={TabSectionsEnum.USERS} ref={tabPanelRef}>
            <UserSettingsSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
