'use client'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Button, Box, Typography } from '@mui/material'
import { useRef } from 'react'
import {
  SimulateCashFlowChampionCattleForm,
  SimulateCashFlowChampionCattleFormRef,
} from './components/sections/forms-section'
import { ProductsSection } from './components/sections/products-section'
import { GraphsSection } from './components/sections/graphs-section'
import { useSimulateCashFlowChampionCattle } from '@/services/react-query/mutations/cash-flow-champion-cattle'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'

export default function ChampionCattle() {
  const {
    mutateAsync: simulateCashFlowChampionCattle,
    data: simulationResults,
    isPending: isSimulating,
  } = useSimulateCashFlowChampionCattle()

  const simulateFormRef = useRef<SimulateCashFlowChampionCattleFormRef>(null)

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
      <Typography variant='h6' fontWeight={700} fontSize={'18px'}>
        Resultados
      </Typography>

      {simulationResults?.totals && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
            width: { xs: '350px', sm: '98%' },
          }}
        >
          <Typography variant='body2' fontWeight={700} color={'#3E63DD'}>
            Totais de entrada KG
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <Indicator
              title='Entrada DT'
              value={simulationResults?.totals.entries.totalDtEntriesInKg}
              sx={{
                width: '100px',
                backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO,
                border: `1px solid ${COLORS.INDICADORES.BORDA_PRIMARIO}`,
              }}
            />
            <Indicator
              title='Entrada PA'
              value={simulationResults?.totals.entries.totalPaEntriesInKg}
              sx={{
                width: '100px',
                backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO,
                border: `1px solid ${COLORS.INDICADORES.BORDA_PRIMARIO}`,
              }}
            />
            <Indicator
              title='Entrada TR'
              value={simulationResults?.totals.entries.totalTrEntriesInKg}
              sx={{
                width: '100px',
                backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO,
                border: `1px solid ${COLORS.INDICADORES.BORDA_PRIMARIO}`,
              }}
            />
            <Indicator
              title='Entrada TT'
              value={simulationResults?.totals.entries.totalEntriesInKg}
              sx={{
                width: '100px',
                backgroundColor: COLORS.INDICADORES.FUNDO_ALTERNATIVO,
                border: `1px solid ${COLORS.INDICADORES.BORDA_PRIMARIO}`,
                color: '#fff',
              }}
            />
          </Box>
        </Box>
      )}

      <ProductsSection data={simulationResults} />
      <GraphsSection data={simulationResults} />
    </PageContainer>
  )
}
