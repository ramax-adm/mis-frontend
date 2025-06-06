import { Card } from '@/components/Card'
import { FreightsCustomizedCard } from '../customized/card'
import { ResumeFreightStatus } from '@/types/api/freights'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Alert, Box, Typography } from '@mui/material'
import { generateRandomColors } from '@/utils/chart.utils'
import { useState } from 'react'
import { QuantityFreightsClosedByFreightCompanyGraph } from '../graphs/quantity-freights-closed-by-freight-company-graph'

interface QuantityFreightsClosedByFreightCompanyCardProps {
  data: Record<string, { quantity: number; percent: number }>
}
export function QuantityFreightsClosedByFreightCompanyCard({
  data,
}: QuantityFreightsClosedByFreightCompanyCardProps) {
  const haveSomeData = Object.values(data).some((item) => item.quantity > 0)

  return (
    <FreightsCustomizedCard
      cardTitle='Fretes FECHADOS p/ Transportadora'
      sx={{ height: '200px', padding: 0.5 }}
    >
      {haveSomeData && <QuantityFreightsClosedByFreightCompanyGraph data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
