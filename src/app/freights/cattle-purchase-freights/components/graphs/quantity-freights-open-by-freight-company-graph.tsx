import { toPercent } from '@/utils/string.utils'
import { Typography, Box } from '@mui/material'
import { useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LegendProps, Legend } from 'recharts'

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

interface QuantityFreightsOpenByFreightCompanyGraphProps {
  data: Record<string, { quantity: number; percent: number }>
}

export function QuantityFreightsOpenByFreightCompanyGraph({
  data,
}: QuantityFreightsOpenByFreightCompanyGraphProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dataTransposed = getData({ data })

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart style={{ fontSize: 12, fontFamily: 'roboto' }}>
        <Pie
          dataKey='value'
          data={dataTransposed}
          cx='50%'
          cy='50%'
          outerRadius={70}
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
                ({toPercent(value)})
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
        <Legend layout='vertical' align='right' verticalAlign='middle' content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

const getData = ({ data }: QuantityFreightsOpenByFreightCompanyGraphProps) => {
  const keys = Object.keys(data)

  const response: { name: string; value: number; quantity: number }[] = []
  for (const key of keys) {
    response.push({ name: key, value: data[key].percent, quantity: data[key].quantity })
  }

  return response
}

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) return null

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 150,
        height: 150,
        overflowY: 'scroll',
      }}
    >
      {payload.map((entry: any, index) => (
        <li
          key={`item-${index}`}
          style={{
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              backgroundColor: entry.color,
            }}
          />
          <span style={{ fontFamily: 'roboto', fontSize: '9px', width: '90px' }}>
            {entry.payload.name}: {entry.payload.quantity}
          </span>
        </li>
      ))}
    </ul>
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
          return <Typography variant='body2'>{`${item.name}: ${toPercent(item.value)}`}</Typography>
        })}
      </Box>
    )
  }

  return null
}
