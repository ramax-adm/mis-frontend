"use client";

import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { getIso8601DateString } from "@/utils/date.utils";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import dayjs from "dayjs";
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useRef } from "react";
import { AccountsReceivableAnalyticalSection } from "./components/sections/accounts-receivable-analytical-section";
import { useAccountsReceivableGetLastUpdatedAt } from "@/services/react-query/queries/finance";
import { FinanceAccountsTabSectionsEnum } from "./constants/finance-accounts-tab-sections.enum";
import {
  PopoverTrigger,
  PopoverContent,
  PopoverTypography,
  PopoverRoot,
} from "@/components/Button/PopoverButton";
import { IoMdDownload } from "react-icons/io";
import { useExportFinanceXlsx } from "@/services/react-query/mutations/finance";
import {
  AccountReceivableStatusEnum,
  AccountReceivableVisualizationEnum,
} from "@/types/finance";
import { FinanceReportTypeEnum } from "../_constants/finance-report-type";
import { useSyncFinanceWithSensatta } from "@/services/react-query/mutations/sensatta";

export default function FinanceAccountsPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);
  // const resumeSectionRef = useRef<CattlePurchaseResumeSectionRef>(null);

  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(
      FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_RECEIVABLE_SECTION
    )
  );

  const [globalStates, setGlobalStates] = useQueryStates({
    companyCode: parseAsString.withDefault(""),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });
  const [sectionStates] = useQueryStates({
    clientCode: parseAsString.withDefault(""),
    key: parseAsString.withDefault(""),
    status: parseAsString.withDefault(AccountReceivableStatusEnum.TODOS),
    visualizationType: parseAsString.withDefault(
      AccountReceivableVisualizationEnum.TODOS
    ),
    bucketSituations: parseAsArrayOf(parseAsString).withDefault([]),
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

  const { data: companies } = useGetUserCompanies({});
  const { data: receivablesLastUpdatedAt } =
    useAccountsReceivableGetLastUpdatedAt();

  const { mutateAsync: syncFinance, isPending: isSyncFinance } =
    useSyncFinanceWithSensatta();
  const { mutateAsync: exportReport, isPending: isExportingReport } =
    useExportFinanceXlsx();

  const onExportReport = async (type: FinanceReportTypeEnum) => {
    const filtersPayload = {
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
      companyCode: globalStates.companyCode,
      clientCode: sectionStates.clientCode,
      status: sectionStates.status as AccountReceivableStatusEnum,
      key: sectionStates.key,
      visualizationType:
        sectionStates.visualizationType as AccountReceivableVisualizationEnum,
      bucketSituations: sectionStates.bucketSituations.join(","),
    };
    await exportReport({
      type,
      filters: filtersPayload,
    });
  };

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
          title='Contabilidade - Titulos Financeiros'
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={"13px"}>
            Ultima atualização: {receivablesLastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncFinance}
            onClick={async () => await syncFinance()}
          >
            Atualizar c/ SENSATTA
          </Button>

          <PopoverRoot>
            <PopoverTrigger
              startIcon={<IoMdDownload size={15} />}
              disabled={isExportingReport}
            >
              Exportar XLSX
            </PopoverTrigger>
            <PopoverContent>
              <PopoverTypography
                onClick={() =>
                  onExportReport(
                    FinanceReportTypeEnum.ACCOUNT_RECEIVABLE_ANALYTICAL
                  )
                }
              >
                Exportar Analitico
              </PopoverTypography>
            </PopoverContent>
          </PopoverRoot>
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
              label: `${item.sensattaCode} - ${item.name}`,
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
      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select sx={{ width: "250px" }} customHandler={handleSelectTab}>
          {/* <Tab label='Resumo' value={"resume"} /> */}
          <Tab
            label='Titulos a Receber - Analitico'
            value={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_RECEIVABLE_SECTION
            }
          />
        </Tabs.Select>

        <Tabs.Content>
          {/* <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <Typography>Resumo</Typography>
          </Tabs.Panel> */}
          <Tabs.Panel
            tabName={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_RECEIVABLE_SECTION
            }
            ref={tabPanelRef}
          >
            <AccountsReceivableAnalyticalSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
