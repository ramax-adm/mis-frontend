"use client";
import { DateInput } from "@/components/Inputs/DateInput";
import {
  ControlledSelect,
  UncontroledSelect,
} from "@/components/Inputs/Select/Customized";
import { PageContainer } from "@/components/PageContainer";
import { Grid, Tab, Typography } from "@mui/material";
import { useRef } from "react";
import { Tabs } from "@/components/Tabs";
import { CattleFreightsHeader } from "./components/header/cattle-freights-header";
import {
  CattlePurchaseFreightsAnalyticalSection,
  CattlePurchaseFreightsAnalyticalSectionRef,
} from "./components/sections/analytical-section";
import { CattlePurchaseFreightsResumeSection } from "./components/sections/resume-section";
import { useExportCattlePurchaseFreightsXlsx } from "@/services/react-query/mutations/freights";
import { useSyncFreightsWithSensatta } from "@/services/react-query/mutations/sensatta";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useQueryStates, parseAsString, parseAsIsoDate } from "nuqs";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import dayjs from "dayjs";

export default function CattlePurchaseFreightsPage() {
  const { data: companies } = useGetUserCompanies({
    isConsideredOnFreight: true,
  });

  // --- nuqs states ---
  const [filters, setFilters] = useQueryStates({
    selectedTab: parseAsString.withDefault("resume"),
    companyCode: parseAsString.withDefault(""),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
  });

  // refs
  const tabPanelRef = useRef<TabsPanelRef>(null);
  const analyticalSectionRef =
    useRef<CattlePurchaseFreightsAnalyticalSectionRef>(null);

  // mutations
  const {
    mutateAsync: syncFreightsWithSensatta,
    isPending: isSyncFreightsWithSensatta,
  } = useSyncFreightsWithSensatta();
  const {
    mutateAsync: exportFreightsReport,
    isPending: isExportingFreightsReport,
  } = useExportCattlePurchaseFreightsXlsx();

  // handlers
  const syncFreights = async () => await syncFreightsWithSensatta();
  const handleSelectTab = (value: string) => setFilters({ selectedTab: value });

  const exportFreights = async () => {
    if (!tabPanelRef.current) {
      console.log("no tab selected");
      return;
    }
    const selectedTab = tabPanelRef.current.getCurrentTabName() as
      | "resume"
      | "analytical";
    const analyticalFilterOptions =
      analyticalSectionRef.current?.getFilterOptions();

    switch (selectedTab) {
      case "resume": {
        console.log("resume");
        return;
      }
      case "analytical": {
        return await exportFreightsReport({
          selectedCompany: filters.companyCode,
          startDate: new Date(filters.startDate),
          endDate: new Date(filters.endDate),
          freightCompany: analyticalFilterOptions?.freightCompany,
          status: analyticalFilterOptions?.status,
        });
      }
      default: {
        console.log("error");
        break;
      }
    }
  };

  const handleSelectStartDate = (value: Date) => {
    const rawString = value.toISOString().split("T")[0];
    setFilters({ startDate: rawString });
  };
  const handleSelectEndDate = (value: Date) => {
    const rawString = value.toISOString().split("T")[0];
    setFilters({ endDate: rawString });
  };
  return (
    <PageContainer>
      <CattleFreightsHeader
        exportFreights={exportFreights}
        syncFreights={syncFreights}
        isExportingFreightsReport={isExportingFreightsReport}
        isSyncFreightsWithSensatta={isSyncFreightsWithSensatta}
      />

      {/* Filtros Globais */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>

        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='company'
            label='Empresa'
            name='companyCode'
            size='small'
            value={filters.companyCode}
            onChange={(val) => setFilters({ companyCode: val })}
            options={companies?.map((item) => ({
              key: item.sensattaCode,
              label: `${item.sensattaCode} - ${item.name}`,
              value: item.sensattaCode,
            }))}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Inicio'
            size='small'
            value={dayjs(filters.startDate)}
            setValue={handleSelectStartDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Fim'
            size='small'
            value={dayjs(filters.endDate)}
            setValue={handleSelectEndDate}
          />
        </Grid>
      </Grid>

      {/* Conteúdo */}
      <Tabs.Root defaultTab={filters.selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Resumo' value={"resume"} />
          <Tab label='Analitico' value={"analytical"} />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <CattlePurchaseFreightsResumeSection
              companyCode={filters.companyCode}
              startDate={new Date(filters.startDate)}
              endDate={new Date(filters.endDate)}
            />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <CattlePurchaseFreightsAnalyticalSection
              ref={analyticalSectionRef}
              companyCode={filters.companyCode}
              startDate={new Date(filters.startDate)}
              endDate={new Date(filters.endDate)}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
