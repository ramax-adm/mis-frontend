"use client";
import { DateInputControlled } from "@/components/Inputs/DateInput/controlled";
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
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";
import { AccountsReceivableAnalyticalSection } from "./components/sections/accounts-receivable-analytical-section";
import { AccountsReceivableResumeSection } from "./components/sections/accounts-receivable-resume-section";
import { AccountsPayableAnalyticalSection } from "./components/sections/accounts-payable-analytical-section";

export default function FinanceAccountsPage() {
  const tabPanelRef = useRef<TabsPanelRef>(null);

  const [selectedTab, setSelectedTab] = useQueryState(
    "selectedTab",
    parseAsString.withDefault(
      FinanceAccountsTabSectionsEnum.RESUME_ACCOUNTS_RECEIVABLE_SECTION
    )
  );

  const [globalStates, setGlobalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString).withDefault([]),
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

  const { data: companies } = useGetUserCompanies({});

  const { data: receivablesLastUpdatedAt } =
    useAccountsReceivableGetLastUpdatedAt();

  const { mutateAsync: syncFinance, isPending: isSyncFinance } =
    useSyncFinanceWithSensatta();

  const { mutateAsync: exportReport, isPending: isExportingReport } =
    useExportFinanceXlsx();

  const handleSelectStartDate = (value: Date) => {
    const rawString = getIso8601DateString(value);
    setGlobalStates({ startDate: rawString });
  };

  const handleSelectEndDate = (value: Date) => {
    const rawString = getIso8601DateString(value);
    setGlobalStates({ endDate: rawString });
  };

  const handleSelectCompanyCodes = (value: string[]) => {
    setGlobalStates({
      companyCodes: value,
    });
  };

  const toogleCompanyCodes = () => {
    if (!companies) return;

    const haveSomeSelectedCompanyCodes = globalStates.companyCodes?.length > 0;

    if (haveSomeSelectedCompanyCodes) {
      return setGlobalStates({ companyCodes: [] });
    }

    return setGlobalStates({
      companyCodes: companies.map((company) => company.sensattaCode),
    });
  };

  const handleSelectTab = (value: string) => setSelectedTab(value);

  const onExportReport = async (type: FinanceReportTypeEnum) => {
    const filtersPayload = {
      startDate: globalStates.startDate,
      endDate: globalStates.endDate,
      companyCodes: globalStates.companyCodes.join(","),
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
          <MultipleSelectInputControlled
            size='small'
            label='Empresas'
            value={globalStates.companyCodes}
            onChange={(value) => handleSelectCompanyCodes(value)}
            options={
              companies?.map((i) => ({
                key: i.sensattaCode,
                value: i.sensattaCode,
                label: `${i.sensattaCode} - ${i.name}`,
              })) ?? []
            }
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
            onClick={toogleCompanyCodes}
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
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab={selectedTab}>
        <Tabs.Select customHandler={handleSelectTab}>
          <Tab
            label='Titulos a Receber - Resumo'
            value={
              FinanceAccountsTabSectionsEnum.RESUME_ACCOUNTS_RECEIVABLE_SECTION
            }
          />
          <Tab
            label='Titulos a Receber - Analitico'
            value={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_RECEIVABLE_SECTION
            }
          />
          <Tab
            label='Titulos a Pagar - Analitico'
            value={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_PAYABLE_SECTION
            }
          />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel
            tabName={
              FinanceAccountsTabSectionsEnum.RESUME_ACCOUNTS_RECEIVABLE_SECTION
            }
            ref={tabPanelRef}
          >
            <AccountsReceivableResumeSection />
          </Tabs.Panel>
          <Tabs.Panel
            tabName={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_RECEIVABLE_SECTION
            }
            ref={tabPanelRef}
          >
            <AccountsReceivableAnalyticalSection />
          </Tabs.Panel>
          <Tabs.Panel
            tabName={
              FinanceAccountsTabSectionsEnum.ANALYTICAL_ACCOUNTS_PAYABLE_SECTION
            }
            ref={tabPanelRef}
          >
            <AccountsPayableAnalyticalSection />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  );
}
