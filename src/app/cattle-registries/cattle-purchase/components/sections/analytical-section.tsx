import {
  useGetCattlePurchaseAnalyticalData,
  useGetCattlePurchaseCattleAdvisor,
  useGetCattlePurchaseCattleClassification,
  useGetCattlePurchaseCattleOwner,
} from '@/services/react-query/queries/purchase'
import { Box, Grid, Typography } from '@mui/material'
import { CattlePurchaseAnalyticalTotalsIndicator } from '../customized/analytical-totals-indicator'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { AnalyticalCattlePurchasesTable } from '../tables/analytical-cattle-purchases-table'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface CattlePurchaseAnalyticalSectionProps {
  companyCode: string
  startDate: Date | null
  endDate: Date | null
}

export interface CattlePurchaseAnalyticalSectionRef {
  getFilterOptions: () => {
    selectedCattleOwner: string
    selectedCattleClassification: string
    selectedCattleAdvisor: string
  }
}

export const CattlePurchaseAnalyticalSection = forwardRef<
  CattlePurchaseAnalyticalSectionRef,
  CattlePurchaseAnalyticalSectionProps
>(({ companyCode, endDate, startDate }, ref) => {
  const [selectedCattleOwner, setSelectedCattleOwner] = useState<string>('')
  const [selectedCattleClassification, setSelectedCattleClassification] = useState<string>('')
  const [selectedCattleAdvisor, setSelectedCattleAdvisor] = useState<string>('')

  const handleSelectCattleOwner = (value: string) => setSelectedCattleOwner(value)
  const handleSelectCattleClassification = (value: string) => setSelectedCattleClassification(value)
  const handleSelectCattleAdvisor = (value: string) => setSelectedCattleAdvisor(value)

  const { data: cattlePurchases, isFetching } = useGetCattlePurchaseAnalyticalData({
    companyCode,
    cattleOwnerName: selectedCattleOwner,
    cattleAdvisorName: selectedCattleAdvisor,
    cattleClassification: selectedCattleClassification,
    startDate,
    endDate,
  })

  const { data: cattleOwners } = useGetCattlePurchaseCattleOwner({
    companyCode,
    startDate,
    endDate,
  })
  const { data: cattleClassifications } = useGetCattlePurchaseCattleClassification({
    companyCode,
    startDate,
    endDate,
  })
  const { data: cattleAdvisors } = useGetCattlePurchaseCattleAdvisor({
    companyCode,
    startDate,
    endDate,
  })

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getFilterOptions: () => ({
        selectedCattleOwner,
        selectedCattleAdvisor,
        selectedCattleClassification,
      }),
    }),
    [selectedCattleOwner, selectedCattleAdvisor, selectedCattleClassification],
  )

  return (
    <>
      {isFetching && <LoadingOverlay />}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={'12px'} fontWeight={700}>
            Filtros Analitico
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleOwnerName'
            label='Pecuarista'
            name='cattleOwnerName'
            value={selectedCattleOwner}
            onChange={handleSelectCattleOwner}
            options={cattleOwners?.map((i) => ({
              label: i.cattleOwnerName,
              value: i.cattleOwnerName,
              key: i.cattleOwnerName,
            }))}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleAdvisorName'
            label='Assessor'
            name='cattleAdvisorName'
            value={selectedCattleAdvisor}
            onChange={handleSelectCattleAdvisor}
            options={cattleAdvisors?.map((i) => ({
              label: i.cattleAdvisorName,
              value: i.cattleAdvisorName,
              key: i.cattleAdvisorName,
            }))}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <ControlledSelect
            id='cattleClassification'
            label='Classificação do gado'
            name='cattleClassification'
            value={selectedCattleClassification}
            onChange={handleSelectCattleClassification}
            options={cattleClassifications?.map((i) => ({
              label: i.cattleClassification,
              value: i.cattleClassification,
              key: i.cattleClassification,
            }))}
            size='small'
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <CattlePurchaseAnalyticalTotalsIndicator data={cattlePurchases?.totals} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {cattlePurchases?.parsedData && cattlePurchases.parsedData.length > 0 && (
            <AnalyticalCattlePurchasesTable data={cattlePurchases?.parsedData} />
          )}
        </Grid>
      </Grid>
    </>
  )
})
