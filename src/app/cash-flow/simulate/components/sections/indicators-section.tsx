import { PostSimulateDataResponse } from '@/types/api/cash-flow'
import { Grid } from '@mui/material'
import { CostByKgMiIndicator } from '../indicators/cost-by-kg-mi-indicator'
import { SallesByKgMiIndicator } from '../indicators/salles-by-kg-mi-indicator'
import { CostByKgMeIndicator } from '../indicators/cost-by-kg-me-indicator'
import { SallesByKgMeIndicator } from '../indicators/salles-by-kg-me-indicator'
import { CostByKgFinalIndicator } from '../indicators/cost-by-kg-final-indicator'
import { SallesByKgFinalIndicator } from '../indicators/salles-by-kg-final-indicator'
import { GrossMarginMiIndicator } from '../indicators/gross-margin-mi-indicator'
import { GrossMarginMeIndicator } from '../indicators/gross-margin-me-indicator'
import { LiquidMarginMiIndicator } from '../indicators/liquid-margin-mi-indicator'
import { LiquidMarginMeIndicator } from '../indicators/liquid-margin-me-indicator'
import { LiquidMarginFinalIndicator } from '../indicators/liquid-margin-final-indicator'
import { GrossMarginFinalIndicator } from '../indicators/gross-margin-final-indicator'

interface IndicatorsSectionProps {
  simulationResults: PostSimulateDataResponse
}
export function IndicatorsSection({ simulationResults }: IndicatorsSectionProps) {
  return (
    <Grid
      container
      direction='row'
      rowSpacing={2}
      marginTop={6}
      sx={{
        width: { xs: '350px', sm: '430px', md: '820px', xl: '95%' },
        justifyContent: 'space-between',
      }}
    >
      <Grid item xs={6} md={4} lg={2}>
        <CostByKgMiIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <SallesByKgMiIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <CostByKgMeIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <SallesByKgMeIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <CostByKgFinalIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <SallesByKgFinalIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>

      <Grid item xs={6} md={4} lg={2}>
        <GrossMarginMiIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <LiquidMarginMiIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <GrossMarginMeIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <LiquidMarginMeIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <GrossMarginFinalIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
      <Grid item xs={6} md={4} lg={2}>
        <LiquidMarginFinalIndicator data={simulationResults.parsedData.costsByKgProjection.kpis} />
      </Grid>
    </Grid>
  )
}
