import { useAppContext } from '@/contexts/app'
import { HumanResourcesHoursHourRelation } from '@/types/api/human-resources-hours'
import { toPercent } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { Cell, Legend, LegendProps, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = [
  '#0B2B5E', // Azul 800
  '#3E63DD',
  '#D6E1F1', // Azul 100
]

interface AnalysesHoursRelationGraphProps {
  data: HumanResourcesHoursHourRelation
}
export function AnalysesHoursRelationGraph({ data }: AnalysesHoursRelationGraphProps) {
  const { isMobile } = useAppContext()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const dataTransposed = getData({ data })

  return (
    <ResponsiveContainer width='100%' height={'100%'}>
      <PieChart style={{ fontSize: 12, fontFamily: 'roboto' }}>
        <Pie
          dataKey='value'
          data={dataTransposed}
          cx='50%'
          cy='50%'
          outerRadius={isMobile ? 70 : 80}
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
        <Legend layout='vertical' align='right' verticalAlign='top' content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

const getData = ({ data }: AnalysesHoursRelationGraphProps) => {
  const keys = Object.keys(data)

  const response: {
    name: string
    value: number
    quantity: string
    percent: number
  }[] = []

  for (const key of keys) {
    response.push({
      name: key,
      value: data[key].percent,
      quantity: data[key].quantity,
      percent: data[key].percent,
    })
  }

  return response.sort((a, b) => b.percent - a.percent)
}

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) return null

  return (
    <table
      style={{
        height: '180px',
        display: 'block', // Permite scroll na tabela
        fontFamily: 'roboto',
        fontSize: '9px',
        borderCollapse: 'collapse',
      }}
    >
      <thead style={{ position: 'sticky', top: 0 }}>
        <tr style={{ display: 'flex', gap: 2 }}>
          <th style={{ width: 15, textAlign: 'center' }}></th>
          <th style={{ width: 70, textAlign: 'left' }}>Departamento</th>
          <th style={{ width: 50, textAlign: 'left' }}>Horas.</th>
          <th style={{ width: 30, textAlign: 'left' }}>%</th>
        </tr>
      </thead>
      <tbody style={{ display: 'block', height: '90%', overflowY: 'scroll' }}>
        {payload.map((entry: any, index: number) => (
          <tr
            key={`item-${index}`}
            style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2, marginBottom: 2 }}
          >
            <td style={{ width: 15, textAlign: 'center' }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: entry.color,
                  display: 'inline-block',
                  borderRadius: '50%',
                }}
              />
            </td>
            <td style={{ width: 70 }}>{entry.payload.name}</td>
            {/** DE HH:mm:ss -> HH:mm */}
            <td style={{ width: 50 }}>{entry.payload.quantity.split(':').slice(0, 2).join(':')}</td>
            <td style={{ width: 30 }}>{toPercent(entry.payload.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
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
