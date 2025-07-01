import { GetCattlePurchaseAnalyticalParsedItem } from '@/types/api/purchase'
import { Alert, Box } from '@mui/material'
import { CattlePurchaseCustomizedCard } from '../customized/card'
import { AnalyticalCattlePurchasesTable } from '../tables/analytical-cattle-purchases-table'

interface AnalyticalCattlePurchasesCardProps {
  data?: GetCattlePurchaseAnalyticalParsedItem[]
}
export function AnalyticalCattlePurchasesCard({ data = [] }: AnalyticalCattlePurchasesCardProps) {
  const haveSomeData = data.length > 0

  return (
    <CattlePurchaseCustomizedCard
      cardTitle='Compras realizadas'
      sx={{ height: '600px', paddingX: 1, marginY: 1 }}
    >
      {haveSomeData && <AnalyticalCattlePurchasesTable data={data} />}
      {!haveSomeData && (
        <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
          Sem Dados
        </Alert>
      )}
    </CattlePurchaseCustomizedCard>
  )
}
