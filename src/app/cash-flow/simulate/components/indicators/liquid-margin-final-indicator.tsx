import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface LiquidMarginFinalIndicatorProps {
  data: Pick<KpisProjected, 'total'>
}
export function LiquidMarginFinalIndicator({ data }: LiquidMarginFinalIndicatorProps) {
  return (
    <Indicator
      title='Margem liquida ME'
      value={data.total.margemLiquida}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_SECUNDARIO, color: '#fff' }}
    />
  )
}
