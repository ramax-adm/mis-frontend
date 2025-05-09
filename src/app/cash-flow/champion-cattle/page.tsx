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

export default function ChampionCattle() {
  const simulateFormRef = useRef<SimulateCashFlowChampionCattleFormRef>(null)
  const isSubmitting = false
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
            // disabled={isExportingSimulation}
            // onClick={() => {
            //   onExportSimulation()
            // }}
          >
            Exportar XLSX
          </Button>
        </Box>
      </PageContainerHeader>

      {/** DATA FORM */}
      <SimulateCashFlowChampionCattleForm
        ref={simulateFormRef}
        simulateCashFlow={() => ({}) as any}
        isSubmitting={isSubmitting}
      />

      <ProductsSection />
      <GraphsSection />
    </PageContainer>
  )
}
