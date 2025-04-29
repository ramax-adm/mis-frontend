import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface GrossMarginMeIndicatorProps {
  data: Pick<KpisProjected, 'me'>
}
export function GrossMarginMeIndicator({ data }: GrossMarginMeIndicatorProps) {
  return (
    <Indicator
      title='Margem Bruta ME'
      value={data.me.margemBrutaMe}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
