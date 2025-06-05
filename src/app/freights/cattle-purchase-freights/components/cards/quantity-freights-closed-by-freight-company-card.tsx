import { Card } from '@/components/Card'
import { FreightsCustomizedCard } from '../customized/card'
import { ResumeFreightStatus } from '@/types/api/freights'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Alert, Box, Typography } from '@mui/material'
import { generateRandomColors } from '@/utils/chart.utils'
import { useState } from 'react'
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

interface QuantityFreightsClosedByFreightCompanyCardProps {
  data: Record<string, number>
}
export function QuantityFreightsClosedByFreightCompanyCard({
  data,
}: QuantityFreightsClosedByFreightCompanyCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dataTransposed = getData({ data })

  const haveSomeData = dataTransposed.some((item) => item.value > 0)

  return (
    <FreightsCustomizedCard
      cardTitle='Fretes FECHADOS p/ Transportadora'
      sx={{ height: '270px', paddingX: 1 }}
    >
      {haveSomeData && (
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart style={{ fontSize: 12, fontFamily: 'roboto' }}>
            <Pie
              dataKey='value'
              data={dataTransposed}
              cx='50%'
              cy='50%'
              outerRadius={100}
              strokeWidth={1.5}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                // Calculo de radiano para saber a posição das legendas
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  // Legenda
                  <text
                    x={x}
                    y={y}
                    style={{
                      fontSize: '9px',
                      fontFamily: 'roboto',
                      fontWeight: 500,
                    }}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline='central'
                  >
                    ({value})
                  </text>
                )
              }}
            >
              {dataTransposed.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={hoveredIndex === index ? 0.8 : 1} // Só a fatia com hover recebe 0.8
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend formatter={renderLegend} /> */}
          </PieChart>
        </ResponsiveContainer>
      )}

      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </FreightsCustomizedCard>
  )
}

const getData = ({ data }: QuantityFreightsClosedByFreightCompanyCardProps) => {
  const keys = Object.keys(data)

  const response: { name: string; value: number }[] = []
  for (const key of keys) {
    response.push({ name: key, value: data[key] })
  }

  return response
}

const renderLegend = (value: string, entry: any) => {
  return (
    <span style={{ color: entry.color, fontWeight: 700, fontSize: 9 }}>
      <Typography> {value} </Typography>
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    console.log(payload)
    return (
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          backgroundColor: '#EEEEEE',
          borderRadius: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        className='custom-tooltip'
      >
        {payload.map((item: any) => {
          return <Typography variant='body2'>{`${item.name}: ${item.value}`}</Typography>
        })}
      </Box>
    )
  }

  return null
}
