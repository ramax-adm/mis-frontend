import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import { ProductionValuesResponse } from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface MiProductionCardProps {
  data: Pick<ProductionValuesResponse, 'mi' | 'total'>
}
export function MiProductionCard({ data }: MiProductionCardProps) {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_MI_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_MI_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { xs: '100%', md: '320px' },
      }}
    >
      <Typography variant='h6' fontSize={'14px'} sx={{ color: COLORS.CARDS.PRODUCAO_MI_TEXTO }}>
        Produção MI
      </Typography>

      <Grid container>
        {/**DT */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_MI_TEXTO }}>
            DT
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.mi.dt.entradaDt}`} />
          <DisplayItem title='KG Produzido' content={`${data.mi.dt.kgRendimentoDt}`} />
          <DisplayItem title='% Rendimento' content={`${data.mi.dt.pRendimentoDt}`} />
        </Grid>
        {/**PA */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_MI_TEXTO }}>
            PA
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.mi.pa.entradaPa}`} />
          <DisplayItem title='KG Produzido' content={`${data.mi.pa.kgRendimentoPa}`} />
          <DisplayItem title='% Rendimento' content={`${data.mi.pa.pRendimentoPa}`} />
        </Grid>
        {/**TR */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_MI_TEXTO }}>
            TR
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.mi.tr.entradaTr}`} />
          <DisplayItem title='KG Produzido' content={`${data.mi.tr.kgRendimentoTr}`} />
          <DisplayItem title='% Rendimento' content={`${data.mi.tr.pRendimentoTr}`} />
        </Grid>
        {/**TOTAL */}
        <Grid
          item
          lg={3}
          sx={{
            backgroundColor: COLORS.CARDS.PRODUCAO_MI_DESTAQUE,
            color: COLORS.CARDS.PRODUCAO_MI_TEXTO,
            paddingX: '6px',
            paddingY: '2px',
            borderRadius: 1,
          }}
        >
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_MI_TEXTO }}>
            Total
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.total.kgEntradaMi}`} />
          <DisplayItem title='KG Produzido' content={`${data.total.kgProduzidoMi}`} />
          <DisplayItem title='% Rendimento' content={`${data.total.pRendimentoMi}`} />
        </Grid>
      </Grid>
    </Box>
  )
}
