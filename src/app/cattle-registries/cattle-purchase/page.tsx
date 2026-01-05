"use client";
import dayjs from "dayjs";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useGetCompanies } from "@/services/react-query/queries/sensatta";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { useAuthContext } from "@/contexts/auth";
import {
  useGetCattlePurchaseCattleAdvisor,
  useGetCattlePurchaseCattleClassification,
  useGetCattlePurchaseCattleOwner,
  useGetPurchaseLastUpdatedAt,
} from "@/services/react-query/queries/purchase";
import {
  CattlePurchaseAnalyticalSection,
  CattlePurchaseAnalyticalSectionRef,
} from "./components/sections/analytical-section";
import { useSyncPurchaseWithSensatta } from "@/services/react-query/mutations/sensatta";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { useExportCattlePurchaseXlsx } from "@/services/react-query/mutations/purchase";
import {
  CattlePurchaseResumeSection,
  CattlePurchaseResumeSectionRef,
} from "./components/sections/resume-section";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { getIso8601DateString } from "@/utils/date.utils";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";

export default function CattlePurchase() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  const resumeSectionRef = useRef<CattlePurchaseResumeSectionRef>(null);
  const analyticalSectionRef = useRef<CattlePurchaseAnalyticalSectionRef>(null);

  const [globalStates, setGlobalStates] = useQueryStates({
    selectedTab: parseAsString.withDefault("resume"),
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(
      new Date().toISOString().split("T")[0]
    ),
    endDate: parseAsString.withDefault(new Date().toISOString().split("T")[0]),
    cattleOwner: parseAsString.withDefault(""),
    cattleAdvisor: parseAsString.withDefault(""),
    cattleClassification: parseAsString.withDefault(""),
  });

  const [analyticalSectionStates] = useQueryStates({
    purchaseCattleOrderId: parseAsString.withDefault(""),
  });

  const { data: purchaseLastUpdatedAt } = useGetPurchaseLastUpdatedAt();
  const { data: companies = [] } = useGetUserCompanies({
    isConsideredOnFreight: true,
  });
  const { data: cattleOwners } = useGetCattlePurchaseCattleOwner({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
  });
  const { data: cattleClassifications } =
    useGetCattlePurchaseCattleClassification({
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
    });
  const { data: cattleAdvisors } = useGetCattlePurchaseCattleAdvisor({
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
  });

  const handleSelectCompany = (value: string[]) =>
    setGlobalStates({ companyCodes: value });

  const handleSelectStartDate = (value: Date) =>
    setGlobalStates({ startDate: getIso8601DateString(value) });

  const handleSelectEndDate = (value: Date) =>
    setGlobalStates({ endDate: getIso8601DateString(value) });

  const handleSelectCattleOwner = (value: string) =>
    setGlobalStates({ cattleOwner: value });

  const handleSelectCattleAdvisor = (value: string) =>
    setGlobalStates({ cattleAdvisor: value });

  const handleSelectCattleClassification = (value: string) =>
    setGlobalStates({ cattleClassification: value });

  const handleSelectTab = (value: string) =>
    setGlobalStates({ selectedTab: value });

  const handleToogleCompanyCodes = () => {
    if (!globalStates.companyCodes) return;

    const haveSomeSelectedCompanyCodes = globalStates.companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setGlobalStates({ companyCodes: [] });
    }

    return setGlobalStates({
      companyCodes: companies?.map((i) => i.sensattaCode),
    });
  };

  const { mutateAsync: syncPurchase, isPending: isSyncPurchase } =
    useSyncPurchaseWithSensatta();
  const {
    mutateAsync: exportCattlePurchasesXlsx,
    isPending: isExportingCattlePurchases,
  } = useExportCattlePurchaseXlsx();

  const exportCattlePurchases = async () => {
    switch (globalStates.selectedTab) {
      case "resume": {
        return;
      }
      case "analytical": {
        return await exportCattlePurchasesXlsx({
          companyCodes: globalStates.companyCodes.join(","),
          startDate: globalStates.startDate,
          endDate: globalStates.endDate,
          cattleAdvisorName: globalStates?.cattleAdvisor,
          cattleClassification: globalStates?.cattleClassification,
          cattleOwnerName: globalStates?.cattleOwner,
          purchaseCattleOrderId: analyticalSectionStates.purchaseCattleOrderId,
        });
      }
      default: {
        console.log("error");
        break;
      }
    }
  };

  return (
    <PageContainer>
      {(isSyncPurchase || isExportingCattlePurchases) && <LoadingOverlay />}
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
          title='Registros gado - Compra de gado'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização: {purchaseLastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncPurchase}
            onClick={async () => await syncPurchase()}
          >
            Atualizar c/ SENSATTA
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isExportingCattlePurchases}
            onClick={exportCattlePurchases}
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      <Grid container marginTop={1} spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <MultipleSelectInputControlled
            label='Empresas'
            size='small'
            value={globalStates.companyCodes}
            onChange={handleSelectCompany}
            options={companies.map((i) => ({
              label: `${i.sensattaCode} - ${i.name}`,
              value: i.sensattaCode,
              key: i.sensattaCode,
            }))}
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleToogleCompanyCodes}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Inicio'
            size='small'
            value={dayjs(globalStates.startDate)}
            setValue={handleSelectStartDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Fim'
            size='small'
            value={dayjs(globalStates.endDate)}
            setValue={handleSelectEndDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleAdvisorName'
            label='Assessor'
            name='cattleAdvisorName'
            value={globalStates.cattleAdvisor}
            onChange={handleSelectCattleAdvisor}
            options={cattleAdvisors?.map((i) => ({
              label: i.cattleAdvisorName,
              value: i.cattleAdvisorName,
              key: i.cattleAdvisorName,
            }))}
            size='small'
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleOwnerName'
            label='Pecuarista'
            name='cattleOwnerName'
            value={globalStates.cattleOwner}
            onChange={handleSelectCattleOwner}
            options={cattleOwners?.map((i) => ({
              label: `${i.cattleOwnerName}`,
              value: i.cattleOwnerName,
              key: i.cattleOwnerName,
            }))}
            size='small'
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleClassification'
            label='Classificação do gado'
            name='cattleClassification'
            value={globalStates.cattleClassification}
            onChange={handleSelectCattleClassification}
            options={cattleClassifications?.map((i) => ({
              label: i.cattleClassification,
              value: i.cattleClassification,
              key: i.cattleClassification,
            }))}
            size='small'
          />
        </Grid>
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab={globalStates.selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab label='Resumo' value={"resume"} />
          <Tab label='Analitico' value={"analytical"} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName='resume'>
            <CattlePurchaseResumeSection ref={resumeSectionRef} />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical'>
            <CattlePurchaseAnalyticalSection ref={analyticalSectionRef} />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
