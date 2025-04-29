import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface LiquidMarginMeIndicatorProps {
  data: Pick<KpisProjected, 'me'>
}
export function LiquidMarginMeIndicator({ data }: LiquidMarginMeIndicatorProps) {
  return (
    <Indicator
      title='Margem liquida ME'
      value={data.me.margemLiquidaMe}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_SECUNDARIO, color: '#fff' }}
    />
  )
}
