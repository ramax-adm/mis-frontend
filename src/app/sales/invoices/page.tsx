"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useAuthContext } from "@/contexts/auth";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { useRef } from "react";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { useGetCompanies } from "@/services/react-query/queries/sensatta";
import {
  InvoicesAnalyticalSection,
  InvoicesAnalyticalSectionRef,
} from "./components/sections/analytical-section";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import dayjs from "dayjs";
import { useGetSalesInvoicesLastUpdatedAt } from "@/services/react-query/queries/sales";
import {
  useExportSalesInvoicesXlsx,
  useSyncSalesInvoicesWithSensatta,
} from "@/services/react-query/mutations/sales";
import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { InvoicesNfTypesEnum } from "@/types/sales";
import { getIso8601DateString } from "@/utils/date.utils";

export default function InvoicesPage() {
  const { user } = useAuthContext();

  const tabPanelRef = useRef<TabsPanelRef>(null);
  // const resumeSectionRef = useRef<CattlePurchaseResumeSectionRef>(null);
  const analyticalSectionRef = useRef<InvoicesAnalyticalSectionRef>(null);

  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault("analytical")
  );

  const [globalStates, setGlobalStates] = useQueryStates({
    companyCode: parseAsString.withDefault(""),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });

  const [sectionStates] = useQueryStates({
    clientCode: parseAsString.withDefault(""),
    cfopCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    nfType: parseAsString.withDefault(""),
    nfNumber: parseAsString.withDefault(""),
    nfSituation: parseAsString.withDefault(""),
  });

  const handleSelectStartDate = (value: Date) => {
    const rawString = getIso8601DateString(value);
    setGlobalStates({ startDate: rawString });
  };
  const handleSelectEndDate = (value: Date) => {
    const rawString = getIso8601DateString(value);
    setGlobalStates({ endDate: rawString });
  };
  const handleSelectCompany = (value: string) =>
    setGlobalStates({ companyCode: value });
  const handleSelectTab = (value: string) => setSelectedTab(value);

  const { data: companies } = useGetCompanies({});
  const { data: lastUpdate } = useGetSalesInvoicesLastUpdatedAt();
  const { mutateAsync: syncInvoices, isPending: isSyncInvoices } =
    useSyncSalesInvoicesWithSensatta();
  const { mutateAsync: exportInvoices, isPending: isExportingInvoices } =
    useExportSalesInvoicesXlsx();

  // const exportCattlePurchases = async () => {
  //   if (!tabPanelRef.current) {
  //     console.log("no tab selected");
  //     return;
  //   }

  //   const selectedTab = tabPanelRef.current.getCurrentTabName() as
  //     | "resume"
  //     | "analytical";

  //   switch (selectedTab) {
  //     case "resume": {
  //       return;
  //     }
  //     case "analytical": {
  //       const filters = analyticalSectionRef.current?.getFilterOptions();
  //       return await exportCattlePurchasesXlsx({
  //         companyCode: selectedCompany,
  //         startDate: selectedStartDate,
  //         endDate: selectedEndDate,
  //         cattleAdvisorName: filters?.selectedCattleAdvisor,
  //         cattleClassification: filters?.selectedCattleClassification,
  //         cattleOwnerName: filters?.selectedCattleOwner,
  //       });
  //     }
  //     default: {
  //       console.log("error");
  //       break;
  //     }
  //   }
  // };

  return (
    <PageContainer>
      {(isSyncInvoices || isExportingInvoices) && <LoadingOverlay />}
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
          title='Vendas - Notas Fiscais'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização:{lastUpdate?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncInvoices}
            onClick={async () => await syncInvoices()}
          >
            Atualizar c/ SENSATTA
          </Button>

          <Button
            variant='contained'
            size='small'
            disabled={isExportingInvoices}
            onClick={async () =>
              await exportInvoices({
                filters: {
                  companyCode: globalStates.companyCode,
                  startDate: globalStates.startDate,
                  endDate: globalStates.endDate,
                  cfopCodes: sectionStates.cfopCodes.join(","),
                  clientCode: sectionStates.clientCode,
                  nfNumber: sectionStates.nfNumber,
                  nfSituation: sectionStates.nfSituation,
                  nfType: sectionStates.nfType as InvoicesNfTypesEnum,
                },
              })
            }
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
          <ControlledSelect
            id='companyCode'
            label='Empresa'
            name='companyCode'
            size='small'
            value={globalStates.companyCode}
            onChange={handleSelectCompany}
            options={companies?.map((item) => ({
              label: item.name,
              value: item.sensattaCode,
              key: item.sensattaCode,
            }))}
          />
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
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab='analytical'>
        <Tabs.Select sx={{ width: "250px" }} customHandler={handleSelectTab}>
          {/* <Tab label='Resumo' value={"resume"} /> */}
          <Tab label='Analitico' value={"analytical"} />
        </Tabs.Select>

        <Tabs.Content>
          {/* <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <Typography>Resumo</Typography>
          </Tabs.Panel> */}
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <InvoicesAnalyticalSection
              ref={analyticalSectionRef}
              companyCode={globalStates.companyCode}
              startDate={globalStates.startDate}
              endDate={globalStates.endDate}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
