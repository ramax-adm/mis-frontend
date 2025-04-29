import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface SallesByKgMeIndicatorProps {
  data: Pick<KpisProjected, 'me'>
}
export function SallesByKgMeIndicator({ data }: SallesByKgMeIndicatorProps) {
  return (
    <Indicator
      title='Venda R$/KG ME'
      value={data.me.vendaKgMe}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
