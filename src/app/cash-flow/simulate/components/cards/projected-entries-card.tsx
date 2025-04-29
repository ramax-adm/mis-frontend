import { DisplayItem } from '@/components/Info/display-item'
import { COLORS } from '@/constants/styles/colors'
import {
  ProductionValuesResponse,
  ProjectIncomesResponse,
  ProjectOutingsResponse,
  ProjectProductionResponse,
} from '@/types/cash-flow'
import { Box, Grid, Typography } from '@mui/material'

interface ProjectedEntriesCardProps {
  data: ProjectIncomesResponse
}
export function ProjectedEntriesCard({ data }: ProjectedEntriesCardProps) {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
        backgroundColor: COLORS.CARDS.PRODUCAO_ENTRADAS_FUNDO,
        border: 1,
        borderColor: COLORS.CARDS.PRODUCAO_ENTRADAS_BORDA,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        width: { xs: '100%', md: '300px' },
      }}
    >
      <Typography
        variant='h6'
        fontSize={'14px'}
        sx={{ color: COLORS.CARDS.PRODUCAO_ENTRADAS_TEXTO }}
      >
        Entradas da operação
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' fontSize={'12px'}>
            Receitas R$
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Receita MI'
            content={`${data.totalIncomeEntriesMi}`}
            contentFontSize='16px'
          />
        </Grid>
        <Grid item xs={4}>
          <DisplayItem
            title='Receita ME'
            content={`${data.totalIncomeEntriesMe}`}
            contentFontSize='16px'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
