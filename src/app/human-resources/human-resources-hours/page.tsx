'use client'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Tabs } from '@/components/Tabs'
import { TabsPanelRef } from '@/components/Tabs/panel'
import {
  useGetHumanResourcesHoursDepartments,
  useGetHumanResourcesHoursEmployees,
  useGetHumanResourcesHoursLastUpdatedAt,
} from '@/services/react-query/queries/human-resources-hours'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { Box, Button, Grid, Tab, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { HumanResourcesHoursResumeSection } from './components/sections/resume-section'
import { DateInputControlled } from '@/components/Inputs/DateInput/controlled'
import dayjs from 'dayjs'
import { HumanResourcesHoursAnalyticalSection } from './components/sections/analytical-section'
import { useExportHumanResourcesHoursXlsx } from '@/services/react-query/mutations/human-resources-hours'

export default function HumanResourcesHours() {
  const tabPanelRef = useRef<TabsPanelRef>(null)
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')

  const handleSelectStartDate = (value: Date) => setSelectedStartDate(value)
  const handleSelectEndDate = (value: Date) => setSelectedEndDate(value)
  const handleSelectDepartment = (value: string) => setSelectedDepartment(value)
  const handleSelectEmployee = (value: string) => setSelectedEmployee(value)
  const handleSelectCompany = (value: string) => setSelectedCompany(value)

  const { data: extraHoursLastUpdatedAt } = useGetHumanResourcesHoursLastUpdatedAt()
  const { data: companies } = useGetCompanies()
  const { data: departments } = useGetHumanResourcesHoursDepartments({
    companyCode: selectedCompany,
  })
  const { data: employees } = useGetHumanResourcesHoursEmployees({
    companyCode: selectedCompany,
    department: selectedDepartment,
  })
  const { mutateAsync: exportHoursReport, isPending: isExportingReport } =
    useExportHumanResourcesHoursXlsx()
  const isCompanySelected = selectedCompany.length > 0

  const exportFreights = async () => {
    if (!tabPanelRef.current) {
      console.log('no tab selected')
      return
    }
    const selectedTab = tabPanelRef.current.getCurrentTabName() as 'resume' | 'analytical'

    switch (selectedTab) {
      case 'resume': {
        console.log('resume')
        return
      }
      case 'analytical': {
        return await exportHoursReport({
          companyCode: selectedCompany,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          department: selectedDepartment,
          employeeName: selectedEmployee,
        })
      }
      default: {
        console.log('error')
        break
      }
    }
  }

  return (
    <PageContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 1,
        }}
      >
        <PageContainerHeader
          title='RH - Horas Extras'
          sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={'13px'}>
            Ultima atualização: {extraHoursLastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            onClick={exportFreights}
            disabled={isExportingReport}
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      <Grid container marginTop={1} columnSpacing={2}>
        <Grid item container spacing={1} xs={6}>
          <Grid item xs={12}>
            <Typography fontSize={'12px'} fontWeight={600}>
              Filtros Globais
            </Typography>
          </Grid>
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
          <Grid item xs={12} sm={4}>
            <DateInputControlled
              label='Dt. Inicio'
              size='small'
              value={dayjs(selectedStartDate)}
              setValue={handleSelectStartDate}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateInputControlled
              label='Dt. Fim'
              size='small'
              value={dayjs(selectedEndDate)}
              setValue={handleSelectEndDate}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={1} xs={4}>
          <Grid item xs={12}>
            <Typography fontSize={'12px'} fontWeight={600}>
              Filtros Historico
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <ControlledSelect
              disabled={!isCompanySelected}
              id='department'
              label='Departamento'
              name='department'
              size='small'
              value={selectedDepartment}
              onChange={handleSelectDepartment}
              options={departments?.map((item) => ({
                label: item.department,
                value: item.department,
                key: item.department,
              }))}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ControlledSelect
              disabled={!isCompanySelected}
              id='employee'
              label='Funcionario'
              name='employee'
              size='small'
              value={selectedEmployee}
              onChange={handleSelectEmployee}
              options={employees?.map((item) => ({
                label: item.employeeName,
                value: item.employeeName,
                key: item.employeeName,
              }))}
            />
          </Grid>
        </Grid>
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab='resume'>
        <Tabs.Select sx={{ width: '200px' }}>
          <Tab label='Resumo' value={'resume'} />
          <Tab label='Analitico' value={'analytical'} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <HumanResourcesHoursResumeSection
              selectedCompany={selectedCompany}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              selectedDepartment={selectedDepartment}
              selectedEmployee={selectedEmployee}
              isCompanySelected={isCompanySelected}
            />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <HumanResourcesHoursAnalyticalSection
              selectedCompany={selectedCompany}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              selectedDepartment={selectedDepartment}
              selectedEmployee={selectedEmployee}
              isCompanySelected={isCompanySelected}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
