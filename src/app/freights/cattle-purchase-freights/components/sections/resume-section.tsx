import { Box, Grid, Typography } from '@mui/material'
import { QuantityFreightsByStatusCard } from '../cards/quantity-freights-by-status-card'
import { useGetResumeCattlePurchaseFreights } from '@/services/react-query/queries/freights'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { QuantityFreightsClosedByFreightCompanyCard } from '../cards/quantity-freights-closed-by-freight-company-card'
import { QuantityFreightsOpenByFreightCompanyCard } from '../cards/quantity-freights-open-by-freight-company-card'
import { CattleQuantityByDayCard } from '../cards/cattle-quantity-by-day-card'
import { PriceByFreightCompanyCard } from '../cards/price-by-freight-company-card'
import { FreightsOverPriceTableCard } from '../cards/freights-over-price-table-card'
import { FreightsByFreightCompanyCard } from '../cards/freights-by-freight-company-card'
import { FreightsByCattleAdvisorCard } from '../cards/freights-by-cattle-advisor-card'
import { FreightsByFreightTypeCard } from '../cards/freights-by-freight-type-card'
import { toLocaleString } from '@/utils/string.utils'

interface CattlePurchaseFreightsResumeSectionProps {
  companyCode: string | null
  startDate: Date | null
  endDate: Date | null
}
export function CattlePurchaseFreightsResumeSection({
  companyCode,
  endDate,
  startDate,
}: CattlePurchaseFreightsResumeSectionProps) {
  const { data: resumedFreights, isFetching } = useGetResumeCattlePurchaseFreights({
    companyCode,
    endDate,
    startDate,
  })

  if (isFetching) {
    return <LoadingOverlay />
  }

  if (!resumedFreights) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 0.5 }}>
      <Grid container spacing={1}>
        {/** Totais p/ Status */}
        <Grid item xs={12} md={2.5}>
          <Box
            sx={{
              padding: '2px',
              borderRadius: '4px',
              backgroundColor: 'rgba(190, 23, 23, 0.2)',
              color: '#BE1717',
              width: '98%',
            }}
          >
            <Typography fontWeight={700} fontSize={'12px'}>
              Fretes em aberto
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Qtd.</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {resumedFreights.totals.quantityActive}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Σ Cbs</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {toLocaleString(resumedFreights.totals.cattleQuantityActiveFreights)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: 2,
              padding: '2px',
              borderRadius: '4px',
              backgroundColor: '#ffe0b2',
              color: '#e65100',
              width: '98%',
            }}
          >
            <Typography fontWeight={700} fontSize={'12px'}>
              Sem Fretes
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Qtd.</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {resumedFreights.totals.quantityNoFreight}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Σ Cbs</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {toLocaleString(resumedFreights.totals.cattleQuantityNoFreights)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              padding: '2px',
              borderRadius: '4px',
              backgroundColor: 'rgba(27, 94, 32, 0.2)',
              color: '#1B5E20',
              width: '98%',
            }}
          >
            <Typography fontWeight={700} fontSize={'12px'}>
              Fretes Fechados
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Qtd.</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {resumedFreights.totals.quantityClosed}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Σ Cbs</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {toLocaleString(resumedFreights.totals.cattleQuantityClosedFreights)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Σ R$ Tabela</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {toLocaleString(resumedFreights.totals.tablePrice)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontSize={'8px'}>Σ R$ Frete</Typography>
                <Typography fontSize={'12px'} fontWeight={700}>
                  {toLocaleString(resumedFreights.totals.negotiatedPrice)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <QuantityFreightsByStatusCard data={resumedFreights.status} />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <CattleQuantityByDayCard data={resumedFreights.day} />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <PriceByFreightCompanyCard data={resumedFreights.priceByFreightCompany} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {/** Qtd Fretes Transportadora */}
        <Grid item xs={12} md={6}>
          <QuantityFreightsClosedByFreightCompanyCard
            data={resumedFreights.quantityClosedByFreightCompany}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <QuantityFreightsOpenByFreightCompanyCard
            data={resumedFreights.quantityActiveByFreightCompany}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <FreightsOverPriceTableCard data={resumedFreights.freightsOverPriceTable} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FreightsByFreightCompanyCard data={resumedFreights.freightsByFreightCompany} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FreightsByCattleAdvisorCard data={resumedFreights.freightsByCattleAdvisor} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FreightsByFreightTypeCard data={resumedFreights.freightsByFreightType} />
        </Grid>
      </Grid>
    </Box>
  )
}
