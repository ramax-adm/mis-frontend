'use client'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Button, Box } from '@mui/material'
import { useRef } from 'react'
import {
  SimulateCashFlowChampionCattleForm,
  SimulateCashFlowChampionCattleFormRef,
} from './components/sections/forms-section'
import { ProductsSection } from './components/sections/products-section'
import { GraphsSection } from './components/sections/graphs-section'
import { useSimulateCashFlowChampionCattle } from '@/services/react-query/mutations/cash-flow-champion-cattle'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'

export default function ChampionCattle() {
  const {
    mutateAsync: simulateCashFlowChampionCattle,
    data: simulationResults,
    isPending: isSimulating,
  } = useSimulateCashFlowChampionCattle()

  const simulateFormRef = useRef<SimulateCashFlowChampionCattleFormRef>(null)

  console.log({ simulationResults })

  return (
    <PageContainer>
      <PageContainerHeader title='Boi Campeão'>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            variant='contained'
            size='small'
            disabled={false}
            onClick={() => {
              if (simulateFormRef.current) {
                simulateFormRef.current.onResetForm()
              }
            }}
          >
            Resetar
          </Button>

          <Button
            variant='contained'
            size='small'
            disabled={true}
            // onClick={() => {
            //   onExportSimulation()
            // }}
          >
            Exportar XLSX
          </Button>
        </Box>
      </PageContainerHeader>

      {isSimulating && <LoadingOverlay />}

      {/** DATA FORM */}
      <SimulateCashFlowChampionCattleForm
        ref={simulateFormRef}
        simulateCashFlow={simulateCashFlowChampionCattle}
        isSubmitting={isSimulating}
      />

      <ProductsSection data={simulationResults} />
      <GraphsSection />
    </PageContainer>
  )
}
