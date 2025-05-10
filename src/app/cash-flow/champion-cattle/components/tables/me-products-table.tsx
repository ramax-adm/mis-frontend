import { Column, CustomizedTable } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import {
  PostSimulateCashFlowChampionCattleResponse,
  SimulateCashFlowChampionCattleItem,
} from '@/types/api/cash-flow-champion-cattle'
import { Box, Typography } from '@mui/material'

interface MeProductsTableProps {
  dailyProducts?: Pick<PostSimulateCashFlowChampionCattleResponse['day'], 'meProducts'>
  projectedProducts?: Pick<
    PostSimulateCashFlowChampionCattleResponse['projected'],
    'bothMarketProducts'
  >
}
export function MeProductsTable({ dailyProducts, projectedProducts }: MeProductsTableProps) {
  const columns = getColumns()
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        backgroundColor: 'white',
        border: `1px solid ${COLORS.BORDAS}`,
        borderRadius: 3,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        paddingY: 1,
        paddingX: 0.5,
        gap: 1,
      }}
    >
      <Typography variant='body2' fontWeight={700} color={'#3E63DD'}>
        Produtos ME
      </Typography>
      {/** TODO */}
      <CustomizedTable<any>
        data={dailyProducts?.meProducts ?? []}
        columns={columns}
        cellStyles={{
          paddingX: 1,
          fontSize: '9.5px',
          paddingY: 0.5,
        }}
        headCellStyles={{
          paddingX: 1,
          fontSize: '10px',
        }}
      />
    </Box>
  )
}

const getColumns = (): Column<SimulateCashFlowChampionCattleItem>[] => {
  return [
    {
      headerName: 'Produto',
      maxWidth: '50px',
      type: 'string',
      value: {
        first: {
          value: 'productName',
        },
      },
    },
    {
      headerName: 'Quarteio',
      maxWidth: '30px',
      type: 'string',
      value: {
        first: {
          value: 'productQuarter',
        },
      },
    },
    {
      headerName: '% Rend ME',
      type: 'string',
      value: {
        first: {
          value: 'incomeMe',
        },
      },
    },
    {
      headerName: '% Rend MI',
      type: 'string',
      value: {
        first: {
          value: 'incomeMi',
        },
      },
    },
    {
      headerName: 'R$ ME',
      type: 'string',
      value: {
        first: {
          value: 'productPriceMe',
        },
      },
    },
    {
      headerName: 'R$ MI',
      type: 'string',
      value: {
        first: {
          value: 'productPriceMi',
        },
      },
    },
    {
      headerName: 'KG Prod. ME',
      type: 'string',
      value: {
        first: {
          value: 'meProduction',
        },
      },
    },
    {
      headerName: 'KG Prod. MI',
      type: 'string',
      value: {
        first: {
          value: 'miProduction',
        },
      },
    },
    {
      headerName: 'Receitas ME',
      // conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      type: 'string',
      value: {
        first: {
          value: 'meTotalInbound',
        },
      },
    },
    {
      headerName: 'Receitas MI',
      // conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      type: 'string',
      value: {
        first: {
          value: 'miTotalInbound',
        },
      },
    },
    {
      headerName: 'Compra Gado ME',
      type: 'string',
      value: {
        first: {
          value: 'meBuyCosts',
        },
      },
    },
    {
      headerName: 'Compra Gado MI',
      type: 'string',
      value: {
        first: {
          value: 'miBuyCosts',
        },
      },
    },
    {
      headerName: 'Operação ME',
      type: 'string',
      value: {
        first: {
          value: 'meOperationCosts',
        },
      },
    },
    {
      headerName: 'Operação MI',
      type: 'string',
      value: {
        first: {
          value: 'miOperationCosts',
        },
      },
    },
    {
      headerName: 'Vendas ME',
      type: 'string',
      value: {
        first: {
          value: 'totalMeSalles',
        },
      },
    },
    {
      headerName: 'Vendas MI',
      type: 'string',
      value: {
        first: {
          value: 'totalMiSalles',
        },
      },
    },
    {
      headerName: 'Custo Total ME',
      type: 'string',
      value: {
        first: {
          value: 'meTotalCosts',
        },
      },
    },
    {
      headerName: 'Custo Total MI',
      type: 'string',
      value: {
        first: {
          value: 'miTotalCosts',
        },
      },
    },
    {
      headerName: 'Resultado ME',
      type: 'string',
      value: {
        first: {
          value: 'finalResultMe',
        },
      },
    },
    {
      headerName: 'Resultado ME/KG',
      type: 'string',
      value: {
        first: {
          value: 'finalResultMeKg',
        },
      },
    },
    {
      headerName: 'Resultado MI',
      type: 'string',
      value: {
        first: {
          value: 'finalResultMi',
        },
      },
    },
    {
      headerName: 'Resultado MI/KG',
      type: 'string',
      value: {
        first: {
          value: 'finalResultMiKg',
        },
      },
    },
  ]
}
