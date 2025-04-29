import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface GrossMarginFinalIndicatorProps {
  data: Pick<KpisProjected, 'total'>
}
export function GrossMarginFinalIndicator({ data }: GrossMarginFinalIndicatorProps) {
  return (
    <Indicator
      title='Margem Bruta FINAL'
      value={data.total.margemBruta}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
