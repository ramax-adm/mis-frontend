import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import {
  ProductionValuesResponse,
  ProjectIncomesResponse,
  ProjectOperationClosureResponse,
  ProjectOutingsResponse,
  ProjectProductionResponse,
} from '@/types/cash-flow'
import { removeCurrencyFormat } from '@/utils/removeCurrencyFormat'
import { Box, Grid, Typography } from '@mui/material'

interface ProjectedOperationClosureCardProps {
  data: ProjectOperationClosureResponse
}
export function ProjectedOperationClosureCard({ data }: ProjectedOperationClosureCardProps) {
  const projectedOperationClosureColor =
    removeCurrencyFormat(data.fechamento) >= 0
      ? COLORS.CARDS.PRODUCAO_ENTRADAS_TEXTO
      : COLORS.CARDS.PRODUCAO_SAIDAS_TEXTO

  const projectedOperationClosureBgColor =
    removeCurrencyFormat(data.fechamento) >= 0
      ? COLORS.CARDS.PRODUCAO_ENTRADAS_FUNDO
      : COLORS.CARDS.PRODUCAO_SAIDAS_FUNDO
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_FECHAMENTO_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_FECHAMENTO_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { xs: '100%', md: '350px' },
      }}
    >
      <Typography
        variant='h6'
        fontSize={'14px'}
        sx={{ color: COLORS.CARDS.PRODUCAO_FECHAMENTO_TEXTO }}
      >
        Fechamento da operação
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' fontSize={'12px'}>
            Fechamento R$
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Saídas'
            content={`${data.saidas}`}
            sx={{ color: COLORS.CARDS.PRODUCAO_SAIDAS_TEXTO }}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Entradas'
            content={`${data.entradas}`}
            sx={{ color: COLORS.CARDS.PRODUCAO_ENTRADAS_TEXTO }}
            contentFontSize='16px'
          />
        </Grid>

        <Grid item xs={4}>
          <DisplayItem
            title='Fechamento'
            content={`${data.fechamento}`}
            sx={{
              paddingX: 1,
              borderRadius: 2,
              color: projectedOperationClosureColor,
              backgroundColor: projectedOperationClosureBgColor,
            }}
            contentFontSize='16px'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
