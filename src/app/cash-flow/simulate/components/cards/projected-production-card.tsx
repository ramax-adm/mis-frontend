import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import { ProjectProductionResponse } from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface ProductionProjectedCardProps {
  data: ProjectProductionResponse
}
export function ProjectedProductionCard({ data }: ProductionProjectedCardProps) {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_PROJETADA_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_PROJETADA_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { md: '320px' },
      }}
    >
      <Typography
        variant='h6'
        fontSize={'14px'}
        sx={{ color: COLORS.CARDS.PRODUCAO_PROJETADA_TEXTO }}
      >
        Cenario da operação
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <DisplayItem
            title='Peso Entrada'
            content={`${data.total.kgEntradaTotal}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='KG Produzido'
            content={`${data.total.kgProduzidoTotal}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='KG Produzido MI'
            content={`${data.mi.kgProduzidoTotal}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='% Rendimento MI'
            content={`${data.mi.pProduzido}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='KG Produzido ME'
            content={`${data.me.kgProduzidoTotal}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='% Rendimento ME'
            content={`${data.me.pProduzido}`}
            contentFontSize='16px'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
