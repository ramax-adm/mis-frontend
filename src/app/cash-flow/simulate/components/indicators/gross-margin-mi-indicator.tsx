import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface GrossMarginMiIndicatorProps {
  data: Pick<KpisProjected, 'mi'>
}
export function GrossMarginMiIndicator({ data }: GrossMarginMiIndicatorProps) {
  return (
    <Indicator
      title='Margem Bruta MI'
      value={data.mi.margemBrutaMi}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
