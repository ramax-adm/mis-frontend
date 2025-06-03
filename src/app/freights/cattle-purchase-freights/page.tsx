'use client'
import { DateInput } from '@/components/Inputs/DateInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { PageContainer } from '@/components/PageContainer'
import { useGetCattleFreightsStatuses } from '@/services/react-query/queries/freights'
import { useGetCompanies, useGetFreightCompanies } from '@/services/react-query/queries/sensatta'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CattleFreightsTable } from './components/table/cattle-freights-table'
import { RadioInput } from '@/components/Inputs/RadioInput'
import { z } from 'zod'
import { CattleFreightsHeader } from './components/header/cattle-freights-header'

const getCattlePurchaseFreightsFormSchema = z.object({
  companyCode: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
  freightCompany: z.string(),
})
type GetCattlePurchaseFreightsFormSchema = z.infer<typeof getCattlePurchaseFreightsFormSchema>
export default function CattlePurchaseFreightsPage() {
  const { control, watch } = useForm<GetCattlePurchaseFreightsFormSchema>({
    resolver: zodResolver(getCattlePurchaseFreightsFormSchema),
    defaultValues: {
      companyCode: '',
      startDate: new Date(),
      endDate: new Date(),
      status: '',
      freightCompany: '',
    },
  })

  const companyCode = watch('companyCode')
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const status = watch('status')
  const freightCompany = watch('freightCompany')

  const { data: statuses } = useGetCattleFreightsStatuses()
  const { data: companies } = useGetCompanies()
  const { data: freightCompanies } = useGetFreightCompanies()

  return (
    <PageContainer>
      <CattleFreightsHeader
        companyCode={companyCode}
        endDate={endDate}
        freightCompany={freightCompany}
        startDate={startDate}
        status={status}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 1,
          marginTop: 1,
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

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <RadioInput
          control={control}
          emptyMessage='Sem Opções'
          label='Status'
          name='status'
          options={statuses}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
          <Typography fontSize={'12px'} fontWeight={700}>
            Transportadora
          </Typography>
          <UncontroledSelect
            size='small'
            control={control}
            id='freight-company'
            name='freightCompany'
            label='Transportadora'
            options={freightCompanies?.map((item) => ({
              label: item.sensattaname,
              value: item.sensattacode,
              key: item.sensattacode,
            }))}
          />
        </Box>
      </Box>

      <CattleFreightsTable
        companyCode={companyCode}
        startDate={startDate}
        endDate={endDate}
        status={status}
        freightCompany={freightCompany}
      />
    </PageContainer>
  )
}
