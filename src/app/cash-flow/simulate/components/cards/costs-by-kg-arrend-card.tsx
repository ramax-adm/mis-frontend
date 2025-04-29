import { Card } from '@/components/Card'
import { Column, CustomizedTable } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import { CostsTransposed, ProjectCostByKgResponse } from '@/types/cash-flow'
import { Typography } from '@mui/material'

interface CostsByKgArrendCardProps {
  data: Pick<ProjectCostByKgResponse, 'costs' | 'total' | 'total'>
}
export function CostsByKgArrendCard({ data }: CostsByKgArrendCardProps) {
  const columns = getColumns()
  return (
    <Card.Root sx={{ height: '120px' }}>
      <Card.Title>Custo Arrendamento R$/KG ME-MI</Card.Title>
      <Card.Content sx={{ height: '100%' }}>
        <CustomizedTable<{ label: string; value: number; costByKg: number }>
          tableStyles={{
            maxHeight: '100px',
          }}
          columns={columns}
          data={data.costs.custoTotalArred}
        />
      </Card.Content>
      <Card.Footer sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          TOTAL: {data.total.totalCustoArrendTotal}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          RS/KG: {data.total.totalCustoKgArrendTotal}
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
