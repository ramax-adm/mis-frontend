import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface LiquidMarginMiIndicatorProps {
  data: Pick<KpisProjected, 'mi'>
}
export function LiquidMarginMiIndicator({ data }: LiquidMarginMiIndicatorProps) {
  return (
    <Indicator
      title='Margem liquida MI'
      value={data.mi.margemLiquidaMi}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_SECUNDARIO, color: '#fff' }}
    />
  )
}
