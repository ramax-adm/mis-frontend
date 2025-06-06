import { Card } from '@/components/Card'
import { FreightsCustomizedCard } from '../customized/card'
import { ResumeFreightStatus } from '@/types/api/freights'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Alert, Box, Typography } from '@mui/material'
import { generateRandomColors } from '@/utils/chart.utils'
import { useState } from 'react'
import { QuantityFreightsOpenByFreightCompanyGraph } from '../graphs/quantity-freights-open-by-freight-company-graph'

const COLORS = [
  '#0B2B5E', // Azul 800
  '#0F3775', // Azul 700
  '#1E478D', // Azul 600
  '#2D5AA1', // Azul 500
  '#4D7FC9', // Azul 400
  '#7BA0D6', // Azul 300
  '#A9C0E4', // Azul 200
  '#D6E1F1', // Azul 100
]
interface QuantityFreightsOpenByFreightCompanyCardProps {
  data: Record<string, { quantity: number; percent: number }>
}
export function QuantityFreightsOpenByFreightCompanyCard({
  data,
}: QuantityFreightsOpenByFreightCompanyCardProps) {
  const haveSomeData = Object.values(data).some((item) => item.quantity > 0)

  return (
    <FreightsCustomizedCard
      cardTitle='Concentração de fretes ABERTOS p/ Transportadora'
      sx={{ height: '200px', padding: 0.5 }}
    >
      {haveSomeData && <QuantityFreightsOpenByFreightCompanyGraph data={data} />}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}
