import { Card } from '@/components/Card'
import { FreightsCustomizedCard } from '../customized/card'
import { ResumeFreightStatus } from '@/types/api/freights'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Alert, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { QuantityFreightsByStatusGraph } from '../graphs/quantity-freights-by-status-graph'

interface QuantityFreightsByStatusCardProps {
  data: ResumeFreightStatus
}
export function QuantityFreightsByStatusCard({ data }: QuantityFreightsByStatusCardProps) {
  const haveSomeData = data.percentActive > 0 || data.percentClosed > 0 || data.percentNoFreight > 0

  return (
    <FreightsCustomizedCard
      cardTitle='Quantidade Fretes p/ STATUS'
      sx={{ height: '200px', padding: 0.5 }}
    >
      {haveSomeData && <QuantityFreightsByStatusGraph data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
