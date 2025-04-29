import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface SallesByKgMiIndicatorProps {
  data: Pick<KpisProjected, 'mi'>
}
export function SallesByKgMiIndicator({ data }: SallesByKgMiIndicatorProps) {
  return (
    <Indicator
      title='Venda R$/KG MI'
      value={data.mi.vendaKgMi}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
