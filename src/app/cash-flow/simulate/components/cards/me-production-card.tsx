import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import { ProductionValuesResponse } from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface MeProductionCardProps {
  data: Pick<ProductionValuesResponse, 'me' | 'total'>
}
export function MeProductionCard({ data }: MeProductionCardProps) {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_ME_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_ME_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { xs: '100%', md: '320px' },
      }}
    >
      <Typography variant='h6' fontSize={'14px'} sx={{ color: COLORS.CARDS.PRODUCAO_ME_TEXTO }}>
        Produção ME
      </Typography>

      <Grid container>
        {/**DT */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_ME_TEXTO }}>
            DT
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.me.dt.entradaDt}`} />
          <DisplayItem title='KG Produzido' content={`${data.me.dt.kgRendimentoDt}`} />
          <DisplayItem title='% Rendimento' content={`${data.me.dt.pRendimentoDt}`} />
        </Grid>
        {/**PA */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_ME_TEXTO }}>
            PA
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.me.pa.entradaPa}`} />
          <DisplayItem title='KG Produzido' content={`${data.me.pa.kgRendimentoPa}`} />
          <DisplayItem title='% Rendimento' content={`${data.me.pa.pRendimentoPa}`} />
        </Grid>
        {/**TR */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_ME_TEXTO }}>
            TR
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.me.tr.entradaTr}`} />
          <DisplayItem title='KG Produzido' content={`${data.me.tr.kgRendimentoTr}`} />
          <DisplayItem title='% Rendimento' content={`${data.me.tr.pRendimentoTr}`} />
        </Grid>
        {/**TOTAL */}
        <Grid
          item
          lg={3}
          sx={{
            backgroundColor: COLORS.CARDS.PRODUCAO_ME_DESTAQUE,
            color: COLORS.CARDS.PRODUCAO_ME_TEXTO,
            paddingX: '6px',
            paddingY: '2px',
            borderRadius: 1,
          }}
        >
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_ME_TEXTO }}>
            Total
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.total.kgEntradaMe}`} />
          <DisplayItem title='KG Produzido' content={`${data.total.kgProduzidoMe}`} />
          <DisplayItem title='% Rendimento' content={`${data.total.pRendimentoMe}`} />
        </Grid>
      </Grid>
    </Box>
  )
}
