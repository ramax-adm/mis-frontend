import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Alert, Box, Typography } from '@mui/material'
import { toLocaleString } from '@/utils/string.utils'
import { formatDateToDDMMYYYY, formatToDate } from '@/utils/formatToDate'

interface ExtraHoursByDayGraphProps {
  data: Record<
    string,
    {
      quantity: string
      quantityInSeconds: number
    }
  >
}
export function ExtraHoursByDayGraph({ data }: ExtraHoursByDayGraphProps) {
  const dataTransposed = getData({ data })
  const haveSomeData = dataTransposed.some((item) => item.quantityInSeconds > 0)

  return (
    <ResponsiveContainer width={'100%'} height='100%'>
      <AreaChart data={dataTransposed} margin={{ top: 10, right: 5, left: -30 }}>
        <XAxis
          dataKey='date'
          axisLine={false}
          tickLine={false}
          fontFamily='roboto'
          width={50}
          fontSize={'8px'}
          tickFormatter={(value) => {
            const result = formatToDate(value)
            const splittedResult = result.split('/')

            return `${splittedResult[0]}/${splittedResult[1]}`
          }}
        />
        <YAxis
          dataKey='quantityInSeconds'
          axisLine={false}
          tickLine={false}
          fontFamily='roboto'
          fontSize={8}
          fontWeight={500}
          tickFormatter={(value) => {
            const hours = Math.floor(value / 3600)
            const minutes = Math.floor((value % 3600) / 60)
            const seconds = value % 60

            const formatted = `${String(hours).padStart(2, '0')}h`
            return formatted
          }}
        />

        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid horizontal={false} />

        <defs>
          <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#0B2B5E' stopOpacity={0.9} />
            <stop offset='95%' stopColor='#0B2B5E' stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {/* <YAxis dataKey='cattleQuantity' /> */}
        <Tooltip content={<CustomTooltip />} />

        <Area
          type='monotone'
          dataKey='quantityInSeconds'
          dot={{ r: 1 }}
          activeDot={{ r: 4 }}
          stroke={'#0B2B5E'}
          fill='url(#fillDesktop)'
          fillOpacity={0.4}
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const getData = ({ data }: ExtraHoursByDayGraphProps) => {
  const keys = Object.keys(data)

  const response: { date: string; quantity: string; quantityInSeconds: number }[] = []
  for (const key of keys) {
    response.push({
      date: key,
      quantity: data[key].quantity,
      quantityInSeconds: data[key].quantityInSeconds,
    })
  }

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
        <Typography variant='caption'>{`${formatToDate(new Date(label))}`}</Typography>
        {payload.map((item: any, index: number) => {
          return (
            <Typography
              variant='body2'
              key={`tooltip-${index}`}
            >{`Horas: ${item.payload.quantity.split(':').slice(0, 2).join(':')}`}</Typography>
          )
        })}
      </Box>
    )
  }

  return null
}
