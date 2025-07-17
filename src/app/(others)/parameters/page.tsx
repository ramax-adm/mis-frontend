"use client";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Tabs } from "@/components/Tabs";
import { TabsPanelRef } from "@/components/Tabs/panel";
import { useGetCompanies } from "@/services/react-query/queries/sensatta";
import { Button, Grid, Tab, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { SalesDeductionsParamsSection } from "./components/sections/sales-deductions-params-section";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { NewSalesDeductionParamModal } from "./components/modals/new-sales-deduction-param-modal";

export default function ParametersPage() {
  const [
    isNewSalesDeductionParamModalOpen,
    setIsNewSalesDeductionParamModalOpen,
  ] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleSelectCompany = (value: string | null) =>
    setSelectedCompany(value);

  const { data: companies } = useGetCompanies({});

  const tabPanelRef = useRef<TabsPanelRef>(null);
  const [selectedTab, setSelectedTab] =
    useState<"sales-deductions">("sales-deductions");

  const handleSelectTab = (value: string) =>
    setSelectedTab(value as "sales-deductions");

  return (
    <>
      <PageContainer>
        <PageContainerHeader title='Parametros'>
          <Button
            variant='contained'
            onClick={() => setIsNewSalesDeductionParamModalOpen(true)}
          >
            Novo
          </Button>
        </PageContainerHeader>

        {/** HEADER */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography fontSize={"12px"} fontWeight={700}>
              Filtros
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <ControlledSelect
              id='companyCode'
              label='Empresa'
              name='companyCode'
              size='small'
              value={selectedCompany}
              onChange={handleSelectCompany}
              options={companies?.map((i) => ({
                label: i.name,
                value: i.sensattaCode,
                key: i.sensattaCode,
              }))}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Tabs.Root defaultTab='sales-deductions'>
            <Tabs.Select customHandler={handleSelectTab}>
              <Tab label='Deduções sobre vendas' value={"sales-deductions"} />
            </Tabs.Select>

            <Tabs.Content>
              <Tabs.Panel tabName='sales-deductions' ref={tabPanelRef}>
                <SalesDeductionsParamsSection companyCode={selectedCompany} />
              </Tabs.Panel>
            </Tabs.Content>
          </Tabs.Root>
        </Grid>
      </PageContainer>
      <FinpecModal
        open={isNewSalesDeductionParamModalOpen}
        onClose={() => setIsNewSalesDeductionParamModalOpen(false)}
      >
        <NewSalesDeductionParamModal />
      </FinpecModal>
    </>
  );
}
