'use client'
import dayjs from 'dayjs'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Tabs } from '@/components/Tabs'
import { TabsPanelRef } from '@/components/Tabs/panel'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { Box, Button, Grid, Tab, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { DateInputControlled } from '@/components/Inputs/DateInput/controlled'
import { useAuthContext } from '@/contexts/auth'
import { useGetPurchaseLastUpdatedAt } from '@/services/react-query/queries/purchase'
import {
  CattlePurchaseAnalyticalSection,
  CattlePurchaseAnalyticalSectionRef,
} from './components/sections/analytical-section'
import { useSyncPurchaseWithSensatta } from '@/services/react-query/mutations/sensatta'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { useExportCattlePurchaseXlsx } from '@/services/react-query/mutations/purchase'

export default function CattlePurchase() {
  const { user } = useAuthContext()

  const tabPanelRef = useRef<TabsPanelRef>(null)
  const analyticalSectionRef = useRef<CattlePurchaseAnalyticalSectionRef>(null)

  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(new Date())
  const [selectedTab, setSelectedTab] = useState<'analytical'>('analytical')

  const handleSelectStartDate = (value: Date) => setSelectedStartDate(value)
  const handleSelectEndDate = (value: Date) => setSelectedEndDate(value)
  const handleSelectCompany = (value: string) => setSelectedCompany(value)
  const handleSelectTab = (value: string) => setSelectedTab(value as 'analytical')

  const { data: purchaseLastUpdatedAt } = useGetPurchaseLastUpdatedAt()
  const { data: companies } = useGetCompanies({ token: user.name })

  const { mutateAsync: syncPurchase, isPending: isSyncPurchase } = useSyncPurchaseWithSensatta()
  const { mutateAsync: exportCattlePurchasesXlsx, isPending: isExportingCattlePurchases } =
    useExportCattlePurchaseXlsx()

  const exportCattlePurchases = async () => {
    if (!tabPanelRef.current) {
      console.log('no tab selected')
      return
    }

    const selectedTab = tabPanelRef.current.getCurrentTabName() as 'resume' | 'analytical'

    switch (selectedTab) {
      case 'resume': {
        return
      }
      case 'analytical': {
        const filters = analyticalSectionRef.current?.getFilterOptions()
        return await exportCattlePurchasesXlsx({
          companyCode: selectedCompany,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          cattleAdvisorName: filters?.selectedCattleAdvisor,
          cattleClassification: filters?.selectedCattleClassification,
          cattleOwnerName: filters?.selectedCattleOwner,
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
      {(isSyncPurchase || isExportingCattlePurchases) && <LoadingOverlay />}
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
          title='Registros gado - Compra de gado'
          sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={'13px'}>
            Ultima atualização: {purchaseLastUpdatedAt?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isSyncPurchase}
            onClick={async () => await syncPurchase()}
          >
            Atualizar c/ SENSATTA
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
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
          <Typography fontSize={'12px'} fontWeight={600}>
            Filtros Globais
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
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
        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Inicio'
            size='small'
            value={dayjs(selectedStartDate)}
            setValue={handleSelectStartDate}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <DateInputControlled
            label='Dt. Fim'
            size='small'
            value={dayjs(selectedEndDate)}
            setValue={handleSelectEndDate}
          />
        </Grid>
      </Grid>

      {/** Content */}
      <Tabs.Root defaultTab='analytical'>
        <Tabs.Select sx={{ width: '150px' }} customHandler={handleSelectTab}>
          <Tab label='Analitico' value={'analytical'} />
        </Tabs.Select>

        <Tabs.Content>
          <Tabs.Panel tabName='analytical' ref={tabPanelRef}>
            <CattlePurchaseAnalyticalSection
              ref={analyticalSectionRef}
              companyCode={selectedCompany}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
            />
          </Tabs.Panel>
        </Tabs.Content>
      </Tabs.Root>
    </PageContainer>
  )
}
