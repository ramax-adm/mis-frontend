'use client'
import { ResumeSection } from '@/app/stock/me/components/sections/resume-section'
import { ControlledSelect, UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Tabs } from '@/components/Tabs'
import { TabsPanelRef } from '@/components/Tabs/panel'
import {
  useGetHumanResourceHoursResumeData,
  useGetHumanResourcesHoursAvailableDates,
  useGetHumanResourcesHoursDepartments,
  useGetHumanResourcesHoursEmployees,
} from '@/services/react-query/queries/human-resources-hours'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { formatToDate } from '@/utils/formatToDate'
import { Box, Grid, Tab, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { HumanResourcesHoursResumeSection } from './components/sections/resume-section'
import { DateInputControlled } from '@/components/Inputs/DateInput/controlled'
import dayjs from 'dayjs'

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

  const { data: companies } = useGetCompanies()
  const { data: departments } = useGetHumanResourcesHoursDepartments({
    companyCode: selectedCompany,
  })
  const { data: employees } = useGetHumanResourcesHoursEmployees({
    companyCode: selectedCompany,
    department: selectedDepartment,
  })

  const isCompanySelected = selectedCompany.length > 0

  const handleSelectCompany = (value: string) => setSelectedCompany(value)
  return (
    <PageContainer>
      <PageContainerHeader title='RH - Horas Extras' />

      <Grid container marginTop={1} columnSpacing={2}>
        <Grid item container columnSpacing={1} xs={6}>
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
              label='Dt. Fim'
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
        <Grid item container columnSpacing={1} xs={4}>
          <Grid item xs={12}>
            <Typography fontSize={'12px'} fontWeight={600}>
              Filtros Historico
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight={600} fontSize={'10px'}>
                Departamento
              </Typography> */}
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
            {/* </Box> */}
          </Grid>
          <Grid item xs={12} sm={5}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight={600} fontSize={'10px'}>
                Funcionario
              </Typography> */}
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
            {/* </Box> */}
          </Grid>
        </Grid>
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab='resume'>
        <Tabs.Select sx={{ width: '200px' }}>
          <Tab label='Resumo' value={'resume'} />
          <Tab label='Analitico' value={'analytical'} disabled />
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
            <Typography>Analitico</Typography>
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
