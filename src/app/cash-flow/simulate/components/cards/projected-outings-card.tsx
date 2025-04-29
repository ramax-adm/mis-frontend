import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import {
  ProductionValuesResponse,
  ProjectOutingsResponse,
  ProjectProductionResponse,
} from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface ProjectedOutingsCardProps {
  data: ProjectOutingsResponse
}
export function ProjectedOutingsCard({ data }: ProjectedOutingsCardProps) {
  return (
    <>
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          border: 1,
          borderColor: COLORS.CARDS.PRODUCAO_SAIDAS_BORDA,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
          width: { xs: '100%', md: '320px' },
        }}
      >
        <Typography variant='h6' fontSize={'12px'} textAlign={'center'}>
          Compra (R$)
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <DisplayItem
            title='Compra Animais'
            content={`${data.compra.valorTotalCompraCabecas}`}
            contentFontSize='16px'
          />
          <DisplayItem
            title='Frete Animais'
            content={`${data.compra.valorTotalFrete}`}
            contentFontSize='16px'
          />
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          border: 1,
          borderColor: COLORS.CARDS.PRODUCAO_SAIDAS_BORDA,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
          width: { xs: '100%', md: '320px' },
        }}
      >
        <Typography variant='h6' fontSize={'12px'} textAlign={'center'}>
          Operação (R$)
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <DisplayItem title='Arrend.' content={`${data.operacao.arred}`} contentFontSize='16px' />
          <DisplayItem
            title='Embalagem'
            content={`${data.operacao.embalagem}`}
            contentFontSize='16px'
          />
          <DisplayItem
            title='Mão de Obra'
            content={`${data.operacao.mod}`}
            contentFontSize='16px'
          />
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          border: 1,
          borderColor: COLORS.CARDS.PRODUCAO_SAIDAS_BORDA,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
          width: { xs: '100%', md: '320px' },
        }}
      >
        <Typography variant='h6' fontSize={'12px'} textAlign={'center'}>
          Vendas MI (R$)
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <DisplayItem
            title='Frete Venda'
            content={`${data.vendas.mi.frete}`}
            contentFontSize='16px'
          />
          <DisplayItem
            title='Comissão'
            content={`${data.vendas.mi.comissao}`}
            contentFontSize='16px'
          />
          <DisplayItem
            title='Imposto'
            content={`${data.vendas.mi.imposto}`}
            contentFontSize='16px'
          />
        </Box>
      </Box>

      <Box
        sx={{
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 0, 0, 0.7)',
          border: 1,
          borderColor: COLORS.CARDS.PRODUCAO_SAIDAS_BORDA,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
          width: { xs: '100%', md: '320px' },
        }}
      >
        <Typography variant='h6' fontSize={'12px'} textAlign={'center'}>
          Vendas ME (R$)
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <DisplayItem title='Rodov.' content={`${data.vendas.me.rodov}`} contentFontSize='16px' />
          <DisplayItem title='Porto' content={`${data.vendas.me.porto}`} contentFontSize='16px' />
          <DisplayItem title='Marit' content={`${data.vendas.me.marit}`} contentFontSize='16px' />
          <DisplayItem
            title='Financ.'
            content={`${data.vendas.me.financ}`}
            contentFontSize='16px'
          />
        </Box>
      </Box>
    </>
  )
}
