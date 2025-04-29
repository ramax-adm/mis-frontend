import { Card } from '@/components/Card'
import { COLORS } from '@/constants/styles/colors'
import { useAppContext } from '@/contexts/app'
import { ProjectDailyFlowResponse } from '@/types/cash-flow'
import { getChartWidth } from '@/utils/chart.utils'
import { formatToCurrency } from '@/utils/formatToCurrency'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface DailyFlowGraphProps {
  data: Pick<ProjectDailyFlowResponse, 'dailyFlow'>
}
export function DailyFlowGraph({ data }: DailyFlowGraphProps) {
  const { width } = useAppContext()
  return (
    <Card.Root sx={{ width: '100', height: '300px' }}>
      <Card.Title>Fluxo Diário</Card.Title>
      <Card.Content>{renderChart(data, width)}</Card.Content>
    </Card.Root>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          height: '70px',
          backgroundColor: '#EEEEEE',
          borderRadius: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        className='custom-tooltip'
      >
        <Typography variant='caption'>{`Dia: ${label}`}</Typography>
        {payload.map((item: any) => (
          <Typography variant='body2'>{`${capitalizeFirstLetter(item?.name)}:${formatToCurrency(item.value)}`}</Typography>
        ))}
      </Box>
    )
  }

  return null
}

const renderChart = (data: Pick<ProjectDailyFlowResponse, 'dailyFlow'>, width: number) => {
  const values = data.dailyFlow.map((item) => ({
    dia: item.dia,
    entrada: item.recTotal,
    saida: (item.saidas as any) * -1,
  }))
  return (
    <LineChart
      width={getChartWidth(width)}
      height={240}
      data={values}
      margin={{ top: 5, left: -10, right: 20, bottom: 1 }}
    >
      <XAxis dataKey='dia' fontSize={'10px'} />
      <YAxis fontSize={'10px'} tickFormatter={(value: number) => `R$ ${value / 1000000} M`} />
      <Tooltip content={<CustomTooltip />} />
      <Legend
        formatter={(value: string, entry: any) => (
          <span style={{ color: entry.color, fontWeight: 700 }}>
            <Typography variant='subtitle2'> {capitalizeFirstLetter(value)} </Typography>
          </span>
        )}
      />
      <Line
        type='monotone'
        dataKey='entrada'
        dot={{ r: 1 }}
        activeDot={{ r: 4 }}
        stroke={COLORS.GRAFICOS.ENTRADAS_LINHA}
        strokeWidth={1.5}
      />
      <Line
        type='monotone'
        dataKey='saida'
        dot={{ r: 1 }}
        activeDot={{ r: 4 }}
        stroke={COLORS.GRAFICOS.SAIDAS_LINHA}
        strokeWidth={1.5}
      />
    </LineChart>
  )
}
