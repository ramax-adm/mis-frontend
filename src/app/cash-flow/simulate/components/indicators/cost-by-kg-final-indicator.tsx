import { Indicator } from '@/components/Info/indicator'
import { COLORS } from '@/constants/styles/colors'
import { KpisProjected } from '@/types/cash-flow'

interface CostByKgFinalIndicatorProps {
  data: Pick<KpisProjected, 'total'>
}
export function CostByKgFinalIndicator({ data }: CostByKgFinalIndicatorProps) {
  return (
    <Indicator
      title='Custo R$/KG FINAL'
      value={data.total.custoKgFinal}
      sx={{
        backgroundColor: COLORS.INDICADORES.FUNDO_PRIMARIO,
        border: `1px solid ${COLORS.INDICADORES.BORDA_PRIMARIO}`,
      }}
    />
  )
}
