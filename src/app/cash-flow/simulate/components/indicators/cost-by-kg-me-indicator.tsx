import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface CostByKgMeIndicatorProps {
  data: Pick<KpisProjected, 'me'>
}
export function CostByKgMeIndicator({ data }: CostByKgMeIndicatorProps) {
  return (
    <Indicator
      title='Custo R$/KG ME'
      value={data.me.custoKgFinalMe}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
