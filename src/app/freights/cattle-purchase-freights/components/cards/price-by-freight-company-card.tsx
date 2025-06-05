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
import { FreightsCustomizedCard } from '../customized/card'
import { Alert, Box, Typography } from '@mui/material'
import { COLORS } from '@/constants/styles/colors'
import { toLocaleString } from '@/utils/string.utils'

interface PriceByFreightCompanyCardProps {
  data: Record<string, number>
}
export function PriceByFreightCompanyCard({ data }: PriceByFreightCompanyCardProps) {
  const dataTransposed = getData({ data })
  const haveSomeData = dataTransposed.some((item) => item.price > 0)

  return (
    <FreightsCustomizedCard
      cardTitle='Valor R$ p/ Transportadora'
      sx={{ height: '300px', paddingX: 1 }}
    >
      {haveSomeData && (
        <ResponsiveContainer width={'100%'} height='100%'>
          <BarChart data={dataTransposed} layout='vertical' margin={{ top: 10, right: 5, left: 5 }}>
            <XAxis
              dataKey='price'
              type='number'
              tickFormatter={(value) => toLocaleString(value / 1000000, 2).concat(' MM')}
              axisLine={false}
              tickLine={false}
              fontFamily='roboto'
              fontSize={'9px'}
            />
            <YAxis
              dataKey='company'
              type='category'
              axisLine={false}
              tickLine={false}
              fontFamily='roboto'
              fontSize={'9px'}
              fontWeight={500}
              tickFormatter={(value) => value.substring(0, 10).concat('...')}
              textAnchor='end'
            />

            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid horizontal={false} />
            <Bar dataKey='price' fill='#0B2B5E' barSize={20}>
              {dataTransposed.map((d) => (
                <Cell key={d.price} fill={'#0B2B5E'} radius={4} />
              ))}
            </Bar>
          </BarChart>
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

const getData = ({ data }: PriceByFreightCompanyCardProps) => {
  const keys = Object.keys(data)

  const response: { company: string; price: number }[] = []
  for (const key of keys) {
    response.push({ company: key, price: data[key] })
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
        <Typography variant='caption'>{`${label}`}</Typography>
        {payload.map((item: any) => {
          return (
            <Typography variant='body2'>{`Valor R$: ${toLocaleString(item.value, 2)}`}</Typography>
          )
        })}
      </Box>
    )
  }

  return null
}
