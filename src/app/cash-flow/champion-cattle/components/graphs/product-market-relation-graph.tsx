import { COLORS } from '@/constants/styles/colors'
import { useAppContext } from '@/contexts/app'
import { PostSimulateCashFlowChampionCattleResponse } from '@/types/api/cash-flow-champion-cattle'
import { fromLocaleStringToNumber } from '@/utils/number.utils'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
interface ProductMarketRelationGraphProps {
  dailyProducts?: PostSimulateCashFlowChampionCattleResponse['day']
}
export function ProductMarketRelationGraph({ dailyProducts }: ProductMarketRelationGraphProps) {
  const { width } = useAppContext()
  const data = getData(dailyProducts)

  return (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        display: 'grid',
        backgroundColor: 'white',
        border: `1px solid ${COLORS.BORDAS}`,
        borderRadius: 3,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        paddingY: 1,
        paddingX: 0.5,
        gap: 1,
      }}
    >
      <Typography variant='body2' fontWeight={700} color={'#3E63DD'}>
        Relação de R$/KG ME/MI
      </Typography>
      <Box>
        <BarChart
          width={width - 300}
          height={370}
          data={data}
          margin={{
            left: -20,
            right: 10,
          }}
        >
          <XAxis dataKey='productName' tickLine={false} fontFamily='roboto' fontSize={12} />
          <YAxis tickLine={false} fontFamily='roboto' fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={renderLegend} />
          <Bar dataKey='meResultKg' fill={COLORS.GRAFICOS.FUNDO_PRIMARIO} />
          <Bar dataKey='miResultKg' fill={COLORS.GRAFICOS.FUNDO_SECUNDARIO} />
        </BarChart>
      </Box>
    </Box>
  )
}

const renderLegend = (value: string, entry: any) => {
  const map = new Map()
  map.set('meResultKg', `R$/KG ME`)
  map.set('miResultKg', `R$/KG MI`)
  return (
    <span style={{ color: entry.color, fontWeight: 700 }}>
      <Typography variant='subtitle2'> {map.get(value)} </Typography>
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    const meResultKgLabel = 'R$/KG ME'
    const miResultKgLabel = 'R$/KG MI'
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
        <Typography variant='caption'>{`${label}`}</Typography>
        {payload.map((item: any) => {
          const map = new Map()
          map.set('meResultKg', `${meResultKgLabel}: ${item.value}`)
          map.set('miResultKg', `${miResultKgLabel}: ${item.value}`)
          return <Typography variant='body2'>{map.get(item.name)}</Typography>
        })}
      </Box>
    )
  }

  return null
}

const getData = (dailyProducts?: PostSimulateCashFlowChampionCattleResponse['day']) => {
  const data = [
    ...(dailyProducts?.bothMarketProducts.map((i) => ({
      ...i,
      meResultKg: fromLocaleStringToNumber(
        i.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
      miResultKg: fromLocaleStringToNumber(
        i.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
    })) ?? []),
    ...(dailyProducts?.meProducts.map((i) => ({
      ...i,
      meResultKg: fromLocaleStringToNumber(
        i.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
      miResultKg: fromLocaleStringToNumber(
        i.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
    })) ?? []),
    ...(dailyProducts?.miProducts.map((i) => ({
      ...i,
      meResultKg: fromLocaleStringToNumber(
        i.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
      miResultKg: fromLocaleStringToNumber(
        i.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
      ),
    })) ?? []),
  ]

  return data
}
