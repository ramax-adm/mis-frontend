import { RadioInput } from '@/components/Inputs/RadioInput'
import { UncontroledSelect } from '@/components/Inputs/Select/Customized'
import { useGetCattleFreightsStatuses } from '@/services/react-query/queries/freights'
import { useGetFreightCompanies } from '@/services/react-query/queries/sensatta'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CattleFreightsTable } from '../tables/cattle-freights-table'
import { forwardRef, useImperativeHandle } from 'react'

const getAnalyticalCattlePurchaseFreightsFormSchema = z.object({
  status: z.string(),
  freightCompany: z.string(),
})
type GetAnalyticalCattlePurchaseFreightsFormSchema = z.infer<
  typeof getAnalyticalCattlePurchaseFreightsFormSchema
>

export interface CattlePurchaseFreightsAnalyticalSectionRef {
  getFilterOptions: () => {
    status: string
    freightCompany: string
  }
}
interface CattlePurchaseFreightsAnalyticalSectionProps {
  companyCode: string | null
  startDate: Date | null
  endDate: Date | null
}
export const CattlePurchaseFreightsAnalyticalSection = forwardRef<
  CattlePurchaseFreightsAnalyticalSectionRef,
  CattlePurchaseFreightsAnalyticalSectionProps
>(({ companyCode, endDate, startDate }, ref) => {
  const { control, watch } = useForm<GetAnalyticalCattlePurchaseFreightsFormSchema>({
    resolver: zodResolver(getAnalyticalCattlePurchaseFreightsFormSchema),
    defaultValues: {
      status: '',
      freightCompany: '',
    },
  })

  const status = watch('status')
  const freightCompany = watch('freightCompany')

  const { data: statuses } = useGetCattleFreightsStatuses()
  const { data: freightCompanies } = useGetFreightCompanies()

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getFilterOptions: () => ({ freightCompany, status }),
    }),
    [status, freightCompany],
  )

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, marginTop: 0.5, alignItems: 'center' }}>
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
    </>
  )
})

CattlePurchaseFreightsAnalyticalSection.displayName = 'CattlePurchaseFreightsAnalyticalSection'
