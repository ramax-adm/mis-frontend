'use client'
import { DateInput } from '@/components/Inputs/DateInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Tab } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CattleFreightsHeader } from './components/header/cattle-freights-header'
import { TabsPanelRef } from '@/components/Tabs/panel'
import { useRef } from 'react'
import {
  CattlePurchaseFreightsAnalyticalSection,
  CattlePurchaseFreightsAnalyticalSectionRef,
} from './components/sections/analytical-section'
import { Tabs } from '@/components/Tabs'
import { CattlePurchaseFreightsResumeSection } from './components/sections/resume-section'
import { useExportCattlePurchaseFreightsXlsx } from '@/services/react-query/mutations/freights'
import { useSyncFreightsWithSensatta } from '@/services/react-query/mutations/sensatta'

const getCattlePurchaseFreightsFormSchema = z.object({
  companyCode: z.string(),
  startDate: z.date(),
  endDate: z.date(),
})
type GetCattlePurchaseFreightsFormSchema = z.infer<typeof getCattlePurchaseFreightsFormSchema>
export default function CattlePurchaseFreightsPage() {
  const { control, watch } = useForm<GetCattlePurchaseFreightsFormSchema>({
    resolver: zodResolver(getCattlePurchaseFreightsFormSchema),
    defaultValues: {
      companyCode: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  const companyCode = watch('companyCode')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  // refs
  const tabPanelRef = useRef<TabsPanelRef>(null)
  const analyticalSectionRef = useRef<CattlePurchaseFreightsAnalyticalSectionRef>(null)

  // queries
  const { data: companies } = useGetCompanies()

  // mutations
  const { mutateAsync: syncFreightsWithSensatta, isPending: isSyncFreightsWithSensatta } =
    useSyncFreightsWithSensatta()
  const { mutateAsync: exportFreightsReport, isPending: isExportingFreightsReport } =
    useExportCattlePurchaseFreightsXlsx()

  // handlers
  const syncFreights = async () => await syncFreightsWithSensatta()
  const exportFreights = async () => {
    if (!tabPanelRef.current) {
      console.log('no tab selected')
      return
    }
    const selectedTab = tabPanelRef.current.getCurrentTabName() as 'resume' | 'analytical'
    const analyticalFilterOptions = analyticalSectionRef.current?.getFilterOptions()

    switch (selectedTab) {
      case 'resume': {
        console.log('resume')
        return
      }
      case 'analytical': {
        return await exportFreightsReport({
          selectedCompany: companyCode,
          startDate,
          endDate,
          freightCompany: analyticalFilterOptions?.freightCompany,
          status: analyticalFilterOptions?.status,
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
      {/** Headers */}
      <CattleFreightsHeader
        exportFreights={exportFreights}
        syncFreights={syncFreights}
        isExportingFreightsReport={isExportingFreightsReport}
        isSyncFreightsWithSensatta={isSyncFreightsWithSensatta}
      />

      {/** Main Filters */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 2,
          marginTop: 1,
        }}
      >
        <UncontroledSelect
          id='company'
          label='Empresa'
          name='companyCode'
          size='small'
          sx={{ width: { xs: '100%', md: '200px' } }}
          control={control}
          options={companies?.map((item) => ({
            key: item.sensattaCode,
            label: item.name,
            value: item.sensattaCode,
          }))}
        />
        <DateInput
          label='Dt. Inicio'
          name='startDate'
          control={control}
          size='small'
          sx={{ width: { xs: '100%', md: '200px' } }}
        />
        <DateInput
          label='Dt. Fim'
          name='endDate'
          control={control}
          size='small'
          sx={{ width: { xs: '100%', md: '200px' } }}
        />
      </Box>

      {/** Content */}
      <Tabs.Root defaultTab='resume'>
        <Tabs.Select>
          <Tab label='Resumo' value={'resume'} />
          <Tab label='Analitico' value={'analytical'} />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName='resume' ref={tabPanelRef}>
            <CattlePurchaseFreightsResumeSection
              companyCode={companyCode}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <CattlePurchaseFreightsAnalyticalSection
              ref={analyticalSectionRef}
              companyCode={companyCode}
              startDate={startDate}
              endDate={endDate}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
