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
        <Grid item xs={12} md={4}>
          <QuantityFreightsByStatusCard data={resumedFreights.status} />
        </Grid>

        {/** Qtd Fretes Transportadora */}
        <Grid item xs={12} md={4}>
          <QuantityFreightsClosedByFreightCompanyCard
            data={resumedFreights.quantityClosedByFreightCompany}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <QuantityFreightsOpenByFreightCompanyCard
            data={resumedFreights.quantityActiveByFreightCompany}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <CattleQuantityByDayCard data={resumedFreights.day} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <PriceByFreightCompanyCard data={resumedFreights.priceByFreightCompany} />
          </Box>
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
