import { Card } from '@/components/Card'
import { Column, CustomizedTable } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import { CostsTransposed, ProjectCostByKgResponse } from '@/types/cash-flow'
import { Typography } from '@mui/material'

interface CostsByKgCattleCardProps {
  data: Pick<ProjectCostByKgResponse, 'costs' | 'total' | 'total'>
}
export function CostsByKgCattleCard({ data }: CostsByKgCattleCardProps) {
  const columns = getColumns()
  return (
    <Card.Root sx={{ height: '150px' }}>
      <Card.Title>Custo Animais R$/KG ME-MI</Card.Title>
      <Card.Content sx={{ height: '100%' }}>
        <CustomizedTable<{ label: string; value: number; costByKg: number }>
          tableStyles={{
            maxHeight: '120px',
          }}
          columns={columns}
          data={data.costs.custoTotalAnimais}
        />
      </Card.Content>
      <Card.Footer sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          TOTAL: {data.total.totalCustoAnimaisTotal}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          RS/KG: {data.total.totalCustoKgAnimaisTotal}
        </Typography>
      </Card.Footer>
    </Card.Root>
  )
}

const getColumns = (): Column<CostsTransposed>[] => {
  return [
    {
      headerName: 'Custo',
      type: 'string',
      value: {
        first: {
          value: 'label',
        },
      },
    },
    {
      headerName: 'Valor R$',
      type: 'string',
      value: {
        first: {
          value: 'value',
        },
      },
    },
    {
      headerName: 'R$/KG',
      type: 'string',
      value: {
        first: {
          value: 'costByKg',
        },
      },
    },
  ]
}
