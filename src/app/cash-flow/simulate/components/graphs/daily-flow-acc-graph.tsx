import { Card } from '@/components/Card'
import { COLORS } from '@/constants/styles/colors'
import { useAppContext } from '@/contexts/app'
import { ProjectDailyFlowResponse } from '@/types/cash-flow'
import { getChartWidth } from '@/utils/chart.utils'
import { formatToCurrency } from '@/utils/formatToCurrency'
import { capitalizeFirstLetter } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'
import { Area, AreaChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface DailyFlowAccGraphProps {
  data: Pick<ProjectDailyFlowResponse, 'dailyFlow'>
  breakEvenFinal: number | null
}
export function DailyFlowAccGraph({ data, breakEvenFinal }: DailyFlowAccGraphProps) {
  const { width } = useAppContext()
  return (
    <Card.Root sx={{ width: '100', height: '300px' }}>
      <Card.Title>Fluxo Diário Acumulado</Card.Title>
      <Box
        sx={{
          paddingX: 1,
          paddingY: 0.5,
          backgroundColor: 'rgba(62, 99, 221, 0.15)',
          maxWidth: '150px',
        }}
      >
        <Typography variant='subtitle2' color={COLORS.TEXTO} fontSize={'12px'}>
          Break Even FINAL:{breakEvenFinal}
        </Typography>
      </Box>

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
          backgroundColor: '#EEEEEE',
          borderRadius: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
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
    acumulado: item.acc,
  }))

  return (
    <AreaChart
      width={getChartWidth(width)}
      height={240}
      data={values}
      margin={{ top: 5, left: -10, right: 20, bottom: 1 }}
    >
      <XAxis dataKey='dia' fontSize={'10px'} />
      <YAxis fontSize={'10px'} tickFormatter={(value: number) => `R$ ${value / 1000000} M`} />
      <Tooltip content={<CustomTooltip />} />

      <Area
        type='monotone'
        dataKey='acumulado'
        dot={{ r: 1 }}
        activeDot={{ r: 4 }}
        stroke={COLORS.GRAFICOS.FLUXO_FUNDO}
        fill={COLORS.GRAFICOS.FLUXO_FUNDO}
        strokeWidth={1.5}
      />
    </AreaChart>
  )
}
