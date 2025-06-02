'use client'
import { DateInput } from '@/components/Inputs/DateInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Column, CustomizedTable } from '@/components/Table/body'
import { useHttpState } from '@/hooks/use-http-state'
import { useSyncFreightsWithSensatta } from '@/services/react-query/mutations/sensatta'
import {
  useGetAnalyticalCattlePurchaseFreights,
  useGetFreightsLastUpdatedAt,
} from '@/services/react-query/queries/freights'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { GetAnalyticalCattlePurchaseFreightsResponse } from '@/types/api/freights'
import { formatToInternationalDate } from '@/utils/formatToDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CattleFreightsTable } from './components/table/cattle-freights-table'
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

  const { data: freightsLastUpdate } = useGetFreightsLastUpdatedAt()
  const { mutateAsync: syncFreightsWithSensatta, isPending: isSyncFreightsWithSensatta } =
    useSyncFreightsWithSensatta()

  const { data: companies } = useGetCompanies()

  //   const { setState } = useHttpState()

  //   useEffect(() => {
  //     console.log('executando useeffect', { companyCode, startDate, endDate })

  //     setState('company', companyCode)
  //     // setState('startDate', formatToInternationalDate(startDate))
  //     // setState('endDate', formatToInternationalDate(endDate))
  //   }, [companyCode, startDate, endDate])

  const syncFreights = async () => await syncFreightsWithSensatta()
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
          title='Fretes - Compra de Gado'
          sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={'13px'}>
            Ultima atualização: {freightsLastUpdate?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button variant='contained' size='small' onClick={syncFreights}>
            Atualizar c/ SENSATTA
          </Button>
        </Box>
      </Box>
      {isSyncFreightsWithSensatta && <LoadingOverlay />}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 1,
        }}
      >
        <UncontroledSelect
          id='company'
          label='Empresa'
          name='companyCode'
          size='small'
          sx={{ width: '200px' }}
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
          sx={{ width: '200px' }}
        />
        <DateInput
          label='Dt. Fim'
          name='endDate'
          control={control}
          size='small'
          sx={{ width: '200px' }}
        />
      </Box>

      <CattleFreightsTable companyCode={companyCode} startDate={startDate} endDate={endDate} />
    </PageContainer>
  )
}
