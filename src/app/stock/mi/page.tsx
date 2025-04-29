'use client'

import { PageContainer } from '@/components/PageContainer'
import { Box, Button, Tab, Typography } from '@mui/material'
import { ResumeSection, ResumeSectionRef } from './components/sections/resume-section'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Tabs } from '@/components/Tabs'
import { useGetStockLastUpdatedAt } from '@/services/react-query/queries/stock'
import { useSyncStockWithSensatta } from '@/services/react-query/mutations/sensatta'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { FeedbackAlertSection } from './components/sections/feedback-alert-section'
import { AnalyticalSection, AnalyticalSectionRef } from './components/sections/analytical-section'
import { useExportStockXlsx } from '@/services/react-query/mutations/stock'
import { useRef, useState } from 'react'
import { TabsPanelRef } from '@/components/Tabs/panel'

export default function StockPage() {
  // states
  const [selectCompanyInputError, setSelectCompanyInputError] = useState(false)

  const { data: stockLastUpdate } = useGetStockLastUpdatedAt()
  const {
    mutateAsync: syncStockWithSensatta,
    isPending: isSyncStockWithSensatta,
    isError: isSyncStockWithSensattaError,
    isSuccess: isSyncStockWithSensattaSuccess,
  } = useSyncStockWithSensatta()
  const {
    mutateAsync: exportStockReport,
    isPending: isExportingStockReport,
    isError: isExportStockError,
    isSuccess: isExportStockSuccess,
  } = useExportStockXlsx()

  // refs
  const resumedSectionRef = useRef<ResumeSectionRef>(null)
  const analyticalSectionRef = useRef<AnalyticalSectionRef>(null)
  const tabPanelRef = useRef<TabsPanelRef>(null)

  // mutations

  const handleExportStockReport = async () => {
    if (!tabPanelRef.current) {
      console.log('no tab selected')
      return
    }

    const selectedTab = tabPanelRef.current.getCurrentTabName() as 'resumed' | 'analytical'
    let selectedCompany: string = ''
    let selectedProductLineAcronyms: any = {}

    switch (selectedTab) {
      case 'analytical': {
        selectedCompany = analyticalSectionRef.current?.getSelectedCompany() as string
        if (!selectedCompany || selectedCompany.length === 0) {
          return setSelectCompanyInputError(true)
        }

        selectedProductLineAcronyms = analyticalSectionRef.current?.getSelectedProductLines()
        break
      }

      case 'resumed': {
        selectedCompany = ''
        selectedProductLineAcronyms = resumedSectionRef.current?.getSelectedProductLines()
        break
      }

      default: {
        console.log('error')
        break
      }
    }

    await exportStockReport({
      stockSelectedTab: selectedTab,
      selectedProductLineAcronyms,
      selectedCompany,
    })
    setSelectCompanyInputError(false)
  }

  const syncStock = async () => await syncStockWithSensatta()
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
          title='Estoque - Mercado Interno'
          sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <Typography variant='subtitle2'>
            Ultima atualização: {stockLastUpdate?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, marginTop: 1 }}>
          <Button variant='contained' size='small' onClick={syncStock}>
            Atualizar c/ SENSATTA
          </Button>
          <Button variant='contained' size='small' onClick={handleExportStockReport}>
            Exportar XLSX
          </Button>
        </Box>
      </Box>

      <FeedbackAlertSection
        isError={isSyncStockWithSensattaError}
        isSuccess={isSyncStockWithSensattaSuccess}
        errorMessage='Erro ao atualizar os dados!'
        successMessage='Dados atualizados com sucesso!'
      />
      <FeedbackAlertSection
        isError={isExportStockError}
        isSuccess={isExportStockSuccess}
        errorMessage='Erro ao exportar os dados!'
        successMessage='Dados exportados com sucesso!'
      />

      {/**
       * TODO:
       *
       * Mudar TABS.OPTIONS => TABS.SELECT [OK]
       * Deixar cada Tab => Tab.Option
       *
       * Estilização da tab
       */}
      {(isSyncStockWithSensatta || isExportingStockReport) && <LoadingOverlay />}
      <Tabs.Root defaultTab='resumed'>
        <Tabs.Select>
          <Tab label='Resumo' value={'resumed'} />
          <Tab label='Analitico' value={'analytical'} />
        </Tabs.Select>
        <Tabs.Content>
          <Tabs.Panel tabName='resumed' ref={tabPanelRef}>
            <ResumeSection ref={resumedSectionRef} />
          </Tabs.Panel>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <AnalyticalSection
              ref={analyticalSectionRef}
              selectCompanyInputError={selectCompanyInputError}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
