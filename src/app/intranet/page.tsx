"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { Modal, Tab, Typography } from "@mui/material";
import {
  useQueryState,
  parseAsString,
  useQueryStates,
  parseAsBoolean,
} from "nuqs";
import { useRef } from "react";
import { CompanyOrganizationalImageSection } from "./components/sections/company-organizational-image-section";
import { PoliciesSection } from "./components/sections/policies-section";
import { IntegrationKitSection } from "./components/sections/integration-kit-section";
import { PopsSection } from "./components/sections/pops-section";
import { DocumentViewerModal } from "./components/modals/document-viewer-modal";
import { DocumentVideoModal } from "./components/modals/document-video-modal";

enum TabSectionsEnum {
  COMPANY_ORGANIZATIONAL_CHART = "company-organizational-chart",
  INTEGRATION_KIT = "integration-kit",
  POLICIES = "policies",
  POPS = "pops",
  TRAININGS = "trainings",
}

export default function IntranetPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(TabSectionsEnum.COMPANY_ORGANIZATIONAL_CHART)
  );

  const [states, setStates] = useQueryStates({
    documentViewerModalOpen: parseAsBoolean.withDefault(false),
    videoModalOpen: parseAsBoolean.withDefault(false),

    // other states
    versionId: parseAsString.withDefault(""),
    videoUrl: parseAsString.withDefault(""),
    signedUrl: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const handleCloseDocumentViewerModal = () =>
    setStates({
      documentViewerModalOpen: false,
      status: "",
      versionId: "",
      videoUrl: "",
      signedUrl: "",
    });

  const handleCloseDocumentVideoModal = () =>
    setStates({
      status: "",
      versionId: "",
      videoModalOpen: false,
      videoUrl: "",
    });

  const handleSelectTab = (value: string) => setSelectedTab(value);

  return (
    <PageContainer>
      <PageContainerHeader title='Intranet' />

      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab
            label='Organograma'
            value={TabSectionsEnum.COMPANY_ORGANIZATIONAL_CHART}
          />
          <Tab label='Kit Integração' value={TabSectionsEnum.INTEGRATION_KIT} />
          <Tab label='Politicas' value={TabSectionsEnum.POLICIES} />
          <Tab label='POPs' value={TabSectionsEnum.POPS} />
          <Tab
            label='Treinamentos'
            value={TabSectionsEnum.TRAININGS}
            disabled
          />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel
            tabName={TabSectionsEnum.COMPANY_ORGANIZATIONAL_CHART}
            ref={tabPanelRef}
          >
            <CompanyOrganizationalImageSection />
          </Tabs.Panel>
        </Tabs.Content>
        <Tabs.Content>
          <Tabs.Panel
            tabName={TabSectionsEnum.INTEGRATION_KIT}
            ref={tabPanelRef}
          >
            <IntegrationKitSection />
          </Tabs.Panel>
        </Tabs.Content>
        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.POLICIES} ref={tabPanelRef}>
            <PoliciesSection />
          </Tabs.Panel>
        </Tabs.Content>
        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.POPS} ref={tabPanelRef}>
            <PopsSection />
          </Tabs.Panel>
        </Tabs.Content>
        <Tabs.Content>
          <Tabs.Panel tabName={TabSectionsEnum.TRAININGS} ref={tabPanelRef}>
            <Typography>Treinamentos</Typography>
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>

      <Modal
        open={states.documentViewerModalOpen}
        onClose={handleCloseDocumentViewerModal}
      >
        <DocumentViewerModal
          signedUrl={states.signedUrl}
          versionId={states.versionId}
          status={states.status}
          onClose={handleCloseDocumentViewerModal}
        />
      </Modal>

      <Modal
        open={states.videoModalOpen}
        onClose={handleCloseDocumentVideoModal}
      >
        <DocumentVideoModal
          versionId={states.versionId}
          videoUrl={states.videoUrl}
          status={states.status}
          onClose={handleCloseDocumentVideoModal}
        />
      </Modal>
    </PageContainer>
  );
}
