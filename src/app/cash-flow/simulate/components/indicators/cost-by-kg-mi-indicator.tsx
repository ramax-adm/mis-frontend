import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface CostByKgMiIndicatorProps {
  data: Pick<KpisProjected, 'mi'>
}
export function CostByKgMiIndicator({ data }: CostByKgMiIndicatorProps) {
  return (
    <Indicator
      title='Custo R$/KG MI'
      value={data.mi.custoKgFinalMi}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
