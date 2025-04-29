import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import { ProductionValuesResponse } from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface TotalProductionCardProps {
  data: Pick<ProductionValuesResponse, 'totalByQuartering' | 'total'>
}
export function TotalProductionCard({ data }: TotalProductionCardProps) {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_TT_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_TT_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { xs: '100%', md: '320px' },
      }}
    >
      <Typography variant='h6' fontSize={'14px'} sx={{ color: COLORS.CARDS.PRODUCAO_TT_TEXTO }}>
        Produção Total
      </Typography>

      <Grid container>
        {/**DT */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_TT_TEXTO }}>
            DT
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.totalByQuartering.dt.entradaDt}`} />
          <DisplayItem
            title='KG Produzido'
            content={`${data.totalByQuartering.dt.kgRendimentoDt}`}
          />
          <DisplayItem
            title='% Rendimento'
            content={`${data.totalByQuartering.dt.pRendimentoDt}`}
          />
        </Grid>
        {/**PA */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_TT_TEXTO }}>
            PA
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.totalByQuartering.pa.entradaPa}`} />
          <DisplayItem
            title='KG Produzido'
            content={`${data.totalByQuartering.pa.kgRendimentoPa}`}
          />
          <DisplayItem
            title='% Rendimento'
            content={`${data.totalByQuartering.pa.pRendimentoPa}`}
          />
        </Grid>
        {/**TR */}
        <Grid item lg={3}>
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_TT_TEXTO }}>
            TR
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.totalByQuartering.tr.entradaTr}`} />
          <DisplayItem
            title='KG Produzido'
            content={`${data.totalByQuartering.tr.kgRendimentoTr}`}
          />
          <DisplayItem
            title='% Rendimento'
            content={`${data.totalByQuartering.tr.pRendimentoTr}`}
          />
        </Grid>
        {/**TOTAL */}
        <Grid
          item
          lg={3}
          sx={{
            backgroundColor: COLORS.CARDS.PRODUCAO_TT_DESTAQUE,
            color: COLORS.CARDS.PRODUCAO_TT_TEXTO,
            paddingX: '6px',
            paddingY: '2px',
            borderRadius: 1,
          }}
        >
          <Typography variant='h6' fontSize={'10px'} sx={{ color: COLORS.CARDS.PRODUCAO_TT_TEXTO }}>
            Total
          </Typography>
          <DisplayItem title='KG Entrada' content={`${data.total.kgEntrada}`} />
          <DisplayItem title='KG Produzido' content={`${data.total.kgProduzido}`} />
          <DisplayItem title='% Rendimento' content={`${data.total.pRendimento}`} />
        </Grid>
      </Grid>
    </Box>
  )
}
