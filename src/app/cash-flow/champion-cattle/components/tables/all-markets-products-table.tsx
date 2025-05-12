import { Table } from '@/components/Table'
import { Column, CustomizedTable } from '@/components/Table/body'
import { COLORS } from '@/constants/styles/colors'
import {
  PostSimulateCashFlowChampionCattleResponse,
  SimulateCashFlowChampionCattleItem,
} from '@/types/api/cash-flow-champion-cattle'
import { fromLocaleStringToNumber } from '@/utils/number.utils'
import { Box, Typography } from '@mui/material'

interface AllMarketsProductsTableProps {
  dailyProducts?: Pick<PostSimulateCashFlowChampionCattleResponse['day'], 'bothMarketProducts'>
  projectedProducts?: Pick<
    PostSimulateCashFlowChampionCattleResponse['projected'],
    'bothMarketProducts'
  >
}
export function AllMarketsProductsTable({
  dailyProducts,
  projectedProducts,
}: AllMarketsProductsTableProps) {
  const columns = getColumns()
  return (
    <Box
      sx={{
        width: '100%',
        height: '350px',
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
        Produtos ME/MI
      </Typography>
      {/** TODO */}
      <CustomizedTable<any>
        data={dailyProducts?.bothMarketProducts ?? []}
        columns={columns}
        tableStyles={{}}
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
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
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
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
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
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'incomeMe',
        },
      },
    },
    {
      headerName: '% Rend MI',
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'incomeMi',
        },
      },
    },
    {
      headerName: 'R$ ME',
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'productPriceMe',
        },
      },
    },
    {
      headerName: 'R$ MI',
      conditionalColor: () => COLORS.TABELAS.FLUXO_CINZA,
      headerColor: COLORS.TABELAS.FLUXO_CINZA_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'productPriceMi',
        },
      },
    },
    {
      headerName: 'KG Prod. ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_AZUL,
      headerColor: COLORS.TABELAS.FUNDO_AZUL_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'meProduction',
        },
      },
    },
    {
      headerName: 'KG Prod. MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_AZUL,
      headerColor: COLORS.TABELAS.FUNDO_AZUL_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'miProduction',
        },
      },
    },
    {
      headerName: 'Receitas ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      headerColor: COLORS.TABELAS.FUNDO_VERDE_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'meTotalInbound',
        },
      },
    },
    {
      headerName: 'Receitas MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERDE,
      headerColor: COLORS.TABELAS.FUNDO_VERDE_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'miTotalInbound',
        },
      },
    },
    {
      headerName: 'Compra Gado ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'meBuyCosts',
        },
      },
    },
    {
      headerName: 'Compra Gado MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'miBuyCosts',
        },
      },
    },
    {
      headerName: 'Operação ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'meOperationCosts',
        },
      },
    },
    {
      headerName: 'Operação MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'miOperationCosts',
        },
      },
    },
    {
      headerName: 'Vendas ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'totalMeSalles',
        },
      },
    },
    {
      headerName: 'Vendas MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'totalMiSalles',
        },
      },
    },
    {
      headerName: 'Custo Total ME',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
      type: 'string',
      value: {
        first: {
          value: 'meTotalCosts',
        },
      },
    },
    {
      headerName: 'Custo Total MI',
      conditionalColor: () => COLORS.TABELAS.FUNDO_VERMELHO,
      headerColor: COLORS.TABELAS.FUNDO_VERMELHO_HEADER,
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
      conditionalColor: (row: SimulateCashFlowChampionCattleItem) => {
        const meResultKg = fromLocaleStringToNumber(
          row.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
        )
        const miResultKg = fromLocaleStringToNumber(
          row.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
        )

        return meResultKg > miResultKg ? 'rgba(0, 146, 13, 0.5)' : ''
      },
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
      conditionalColor: (row: SimulateCashFlowChampionCattleItem) => {
        const meResultKg = fromLocaleStringToNumber(
          row.finalResultMeKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
        )
        const miResultKg = fromLocaleStringToNumber(
          row.finalResultMiKg.replace(/-?\s*R\$\s?/, (match) => (match.includes('-') ? '-' : '')),
        )

        return miResultKg > meResultKg ? 'rgba(0, 146, 13, 0.5)' : ''
      },
      type: 'string',
      value: {
        first: {
          value: 'finalResultMiKg',
        },
      },
    },
  ]
}
