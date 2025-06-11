import { HistoryExtraHoursByDepartmentItem } from '@/types/api/human-resources-hours'
import { formatToDate, getHHMMSSFormat } from '@/utils/formatToDate'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const COLORS = [
  '#2D5AA1', // Azul 500
  '#22c55e', // verde 500
  '#f59e0b', // amber 500
  '#6366f1', // indigo 500
  '#f43f5e', // rose 500
]

interface HistoryExtraHoursByDepartmentGraphProps {
  data: HistoryExtraHoursByDepartmentItem[]
}
export function HistoryExtraHoursByDepartmentGraph({
  data,
}: HistoryExtraHoursByDepartmentGraphProps) {
  const dataTransposed = getData({ data })
  const departments = Object.keys(dataTransposed[0] || {}).filter((key) => key !== 'date')

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={dataTransposed}
        margin={{
          top: 20,
          left: -20,
          right: 10,
        }}
      >
        <XAxis
          dataKey='date'
          fontSize={'8px'}
          fontFamily='roboto'
          fontWeight={500}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const splittedValue = value.split('/')
            return `${splittedValue[0]}/${splittedValue[1]}`
          }}
        />
        <YAxis
          fontSize={'8px'}
          fontFamily='roboto'
          fontWeight={500}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            const hours = Math.floor(value / 3600)
            const minutes = Math.floor((value % 3600) / 60)
            const seconds = value % 60

            const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            return formatted
          }}
        />
        <defs>
          {departments.map((department, index) => (
            <linearGradient key={department} id={`fill-${department}`} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={getColor(index)} stopOpacity={0.9} />
              <stop offset='95%' stopColor={getColor(index)} stopOpacity={0.2} />
            </linearGradient>
          ))}
        </defs>

        <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: -230, left: -20 }} />

        {departments.map((department, index) => (
          <Area
            key={department}
            type='monotone'
            dataKey={`${department}.extraHoursInSeconds`}
            dot={{ r: 1 }}
            activeDot={{ r: 4 }}
            stroke={getColor(index)}
            fill={`url(#fill-${department})`}
            fillOpacity={0.4}
            strokeWidth={1.5}
            name={department}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

const getColor = (index: number) => COLORS[index % COLORS.length]

const getData = ({ data }: HistoryExtraHoursByDepartmentGraphProps) => {
  const response: ({
    date: string
  } & {
    [department: string]: { extraHours: string; extraHoursInSeconds: number } | string
  })[] = []

  let currentGroup:
    | ({
        date: string
      } & {
        [department: string]: { extraHours: string; extraHoursInSeconds: number } | string
      })
    | null = null

  data.forEach((item) => {
    // Se mudou a data, cria um novo grupo
    if (!currentGroup || currentGroup.date != formatToDate(item.date)) {
      currentGroup = { date: formatToDate(item.date) }
      response.push(currentGroup)
    }

    // Adiciona o departamento no grupo atual
    currentGroup[item.department] = {
      extraHours: item.extraHours,
      extraHoursInSeconds: item.extraHoursInSeconds,
    }
  })

  console.log({ response })

  return response
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
        <Typography variant='caption'>{`${label}`}</Typography>
        {payload.map((item: any) => {
          return (
            <Typography variant='body2'>{`${item.dataKey.split('.')[0]}:${getHHMMSSFormat(item.value)}`}</Typography>
          )
        })}
      </Box>
    )
  }

  return null
}
