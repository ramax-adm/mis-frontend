'use client'
import { ResumeSection } from '@/app/stock/me/components/sections/resume-section'
import { ControlledSelect, UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Tabs } from '@/components/Tabs'
import { TabsPanelRef } from '@/components/Tabs/panel'
import { useGetHumanResourcesHoursAvailableDates } from '@/services/react-query/queries/human-resources-hours'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { formatToDate } from '@/utils/formatToDate'
import { Grid, Tab, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { HumanResourcesHoursResumeSection } from './components/sections/resume-section'

export default function HumanResourcesHours() {
  const tabPanelRef = useRef<TabsPanelRef>(null)
  const [selectedCompany, setSelectedCompany] = useState('')

  const { data: companies } = useGetCompanies()

  const isCompanySelected = selectedCompany.length > 0
  const handleSelectCompany = (value: string) => setSelectedCompany(value)
  return (
    <PageContainer>
      <PageContainerHeader title='RH - Horas Extras' />

      <Grid container marginTop={1} spacing={1}>
        <Grid item xs={12} sm={4}>
          <ControlledSelect
            id='companyCode'
            label='Empresa'
            name='companyCode'
            size='small'
            value={selectedCompany}
            onChange={handleSelectCompany}
            options={companies?.map((item) => ({
              label: item.name,
              value: item.sensattaCode,
              key: item.sensattaCode,
            }))}
          />
        </Grid>
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab='resume'>
        <Tabs.Select>
          <Tab label='Resumo' value={'resume'} />
          <Tab label='Analitico' value={'analytical'} disabled />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <HumanResourcesHoursResumeSection
              selectedCompany={selectedCompany}
              isCompanySelected={isCompanySelected}
            />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <Typography>Analitico</Typography>
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
