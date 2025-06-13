import {
  HistoryExtraHoursByDepartmentItem,
  HistoryHoursRelationByDepartmentItem,
} from '@/types/api/human-resources-hours'
import { formatToDate, getHHMMSSFormat } from '@/utils/formatToDate'
import { toLocaleString } from '@/utils/string.utils'
import { Box, Typography } from '@mui/material'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = [
  '#2D5AA1', // Azul 500
  '#22c55e', // verde 500
  '#f59e0b', // amber 500
  '#6366f1', // indigo 500
  '#f43f5e', // rose 500
]

interface HistoryHoursRelationByDepartmentGraphProps {
  data: Record<
    string,
    {
      extraHours: string
      extraHoursInSeconds: number
      absenceHours: string
      absenceHoursInSeconds: number
    }
  >
}
export function HistoryHoursRelationByDepartmentGraph({
  data,
}: HistoryHoursRelationByDepartmentGraphProps) {
  const dataTransposed = getData({ data })
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={dataTransposed}
        margin={{
          top: 5,
          left: -30,
          right: 10,
          bottom: 10,
        }}
      >
        <XAxis
          dataKey='department'
          fontSize={'8px'}
          fontFamily='roboto'
          fontWeight={500}
          tickLine={false}
          axisLine={false}
          angle={-45}
          dx={-10}
          dy={10}
          tickFormatter={(value) =>
            value.length > 10 ? value.substring(0, 8).concat('...') : value
          }
        />
        <YAxis
          name='TESTE Y'
          fontSize={'8px'}
          fontFamily='roboto'
          fontWeight={500}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => {
            const hours = Math.floor(value / 3600)
            const minutes = Math.floor((value % 3600) / 60)
            const seconds = value % 60

            const formatted = `${String(hours).padStart(2, '0')}h`
            return formatted
          }}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign='top' content={<CustomLegend />} />

        <Bar dataKey='extraHoursInSeconds' fill='#0B2B5E' />
        <Bar dataKey='absenceHoursInSeconds' fill='#7BA0D6' />
      </BarChart>
    </ResponsiveContainer>
  )
}

const getData = ({ data }: HistoryHoursRelationByDepartmentGraphProps) => {
  const response: {
    department: string
    extraHours: string
    extraHoursInSeconds: number
    absenceHours: string
    absenceHoursInSeconds: number
  }[] = []

  const keys = Object.keys(data)

  for (const key of keys) {
    response.push({
      department: key,
      absenceHours: data[key].absenceHours,
      absenceHoursInSeconds: data[key].absenceHoursInSeconds,
      extraHours: data[key].extraHours,
      extraHoursInSeconds: data[key].extraHoursInSeconds,
    })
  }

  return response
}

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  const map = new Map<string, string>()

  map.set('extraHoursInSeconds', 'Hs. Extras')
  map.set('absenceHoursInSeconds', 'Hs. Faltas')
  if (!payload) return null

  return (
    <ul
      style={{
        display: 'block',
        listStyle: 'none',
        padding: 0,
        margin: '0 auto',
        width: 'fit-content',
        maxWidth: '400px',
        overflowWrap: 'break-word', // opcional, para quebrar palavras longas
      }}
    >
      {payload.map((entry: any, index) => (
        <li
          key={`item-${index}`}
          style={{
            marginLeft: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: entry.color,
            }}
          />
          <span
            style={{ fontFamily: 'roboto', fontSize: 12, fontWeight: 'bold', color: entry.color }}
          >
            {map.get(entry.payload.dataKey)}
          </span>
        </li>
      ))}
    </ul>
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
        <Typography variant='caption'>{`${label}`}</Typography>
        <Typography variant='body2'>{`Hs. Extras: ${getHHMMSSFormat(payload[0].value)}`}</Typography>
        <Typography variant='body2'>{`Hs. Faltas: ${getHHMMSSFormat(payload[1].value)}`}</Typography>
        {/* {payload.map((item: any) => {
          return (
            <Typography variant='body2'>{`${item.dataKey.split('.')[0]}:${getHHMMSSFormat(item.value)}`}</Typography>
          )
        })} */}
      </Box>
    )
  }

  return null
}
