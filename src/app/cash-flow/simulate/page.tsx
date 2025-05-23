'use client'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { useRef } from 'react'
import { SimulateCashFlowForm, SimulateCashFlowFormRef } from './components/sections/forms-section'
import { Box, Button } from '@mui/material'
import { useExportXlsx, useSimulateCashFlow } from '@/services/react-query/mutations/cash-flow'
import { SimulationCardsSection } from './components/sections/cards-section'
import { DailyFlowTable } from './components/tables/daily-flow-table'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { UserSimulationsSection } from './components/sections/user-simulation-section'
import { IndicatorsSection } from './components/sections/indicators-section'
import { GraphsSection } from './components/sections/graphs-section'
import { UseExportCashFlowSimulationRequest } from '@/types/mutations/cash-flow'

export default function SimulateCashFlowPage() {
  // mutations
  const {
    mutateAsync: simulateCashFlow,
    data: simulationResults,
    isPending: isSimulating,
  } = useSimulateCashFlow()

  const { mutateAsync: exportSimulation, isPending: isExportingSimulation } = useExportXlsx()

  const simulateFormRef = useRef<SimulateCashFlowFormRef>(null)

  const onExportSimulation = async (id?: string) => {
    const values = simulateFormRef.current?.onGetValues() as UseExportCashFlowSimulationRequest

    if (values) {
      await exportSimulation({ id, values })
    }
  }

  return (
    <PageContainer>
      <PageContainerHeader title='Simulação do Cash Flow'>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            variant='contained'
            size='small'
            disabled={isExportingSimulation}
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
            disabled={isExportingSimulation}
            onClick={() => {
              onExportSimulation()
            }}
          >
            Exportar XLSX
          </Button>
        </Box>
      </PageContainerHeader>

      {/** DATA FORM */}
      <SimulateCashFlowForm
        ref={simulateFormRef}
        simulateCashFlow={simulateCashFlow}
        isSubmitting={isSimulating}
      />

      {isSimulating && <LoadingOverlay />}

      <UserSimulationsSection data={simulateFormRef.current?.onGetValues()} />
      {/** DATA DISPLAY */}
      {simulationResults && <SimulationCardsSection simulationResults={simulationResults} />}
      {simulationResults && <IndicatorsSection simulationResults={simulationResults} />}
      {simulationResults && (
        <DailyFlowTable data={simulationResults.parsedData.dailyFlowProjection} />
      )}

      {simulationResults && <GraphsSection data={simulationResults} />}
    </PageContainer>
  )
}
