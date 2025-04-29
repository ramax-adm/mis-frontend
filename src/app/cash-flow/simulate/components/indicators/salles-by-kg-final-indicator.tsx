import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface SallesByKgFinalIndicatorProps {
  data: Pick<KpisProjected, 'total'>
}
export function SallesByKgFinalIndicator({ data }: SallesByKgFinalIndicatorProps) {
  return (
    <Indicator
      title='Venda R$/KG FINAL'
      value={data.total.vendaKg}
      sx={{ backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO }}
    />
  )
}
