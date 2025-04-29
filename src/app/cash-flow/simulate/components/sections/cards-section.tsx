import { Box, Typography } from '@mui/material'
import { MiProductionCard } from '../cards/mi-production-card'
import { PostSimulateDataResponse } from '@/types/api/cash-flow'
import { MeProductionCard } from '../cards/me-production-card'
import { TotalProductionCard } from '../cards/total-production-card'
import { ProjectedProductionCard } from '../cards/projected-production-card'
import { ProjectedOutingsCard } from '../cards/projected-outings-card'
import { ProjectedEntriesCard } from '../cards/projected-entries-card'
import { ProjectedOperationClosureCard } from '../cards/projected-closure-card'
import { CostsByKgCard } from '../cards/costs-by-kg-card'
import { CostsByKgMeCard } from '../cards/costs-by-kg-me-card'
import { CostsByKgMiCard } from '../cards/costs-by-kg-mi-card'
import { CostsByKgCattleCard } from '../cards/costs-by-kg-cattle-card'
import { CostsByKgMeCattleCard } from '../cards/costs-by-kg-me-cattle-card'
import { CostsByKgMiCattleCard } from '../cards/costs-by-kg-mi-cattle-card'
import { CostsByKgArrendCard } from '../cards/costs-by-kg-arrend-card'
import { CostsByKgMeArrendCard } from '../cards/costs-by-kg-me-arrend-card'
import { CostsByKgMiArrendCard } from '../cards/costs-by-kg-mi-arrend-card'

interface SimulationCardsSectionProps {
  simulationResults: PostSimulateDataResponse
}
export function SimulationCardsSection({
  simulationResults: { parsedData },
}: SimulationCardsSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 6,
        width: { xs: '350px', sm: '430px', md: '820px', xl: '95%' },
      }}
    >
      <Typography variant='h6' fontWeight={700}>
        Resultados
      </Typography>

      <Typography variant='body2' fontWeight={500} marginTop={4}>
        Produção
      </Typography>

      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexGrow: 1,
          justifyContent: 'space-between',
          rowGap: '40px',
        }}
      >
        <MiProductionCard
          data={{
            mi: parsedData.productionValues.mi,
            total: parsedData.productionValues.total,
          }}
        />
        <MeProductionCard
          data={{
            me: parsedData.productionValues.me,
            total: parsedData.productionValues.total,
          }}
        />
        <TotalProductionCard
          data={{
            totalByQuartering: parsedData.productionValues.totalByQuartering,
            total: parsedData.productionValues.total,
          }}
        />
      </Box>

      <Typography variant='body2' fontWeight={500} marginTop={4}>
        Saídas
      </Typography>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexGrow: 1,
          justifyContent: 'space-between',
          rowGap: '40px',
        }}
      >
        <ProjectedOutingsCard data={parsedData.outingsProjection} />
      </Box>

      <Typography variant='body2' fontWeight={500} marginTop={4}>
        Entradas & Fechamento
      </Typography>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: '40px',
        }}
      >
        <ProjectedProductionCard data={parsedData.productionProjection} />
        <ProjectedEntriesCard data={parsedData.entriesProjection} />
        <ProjectedOperationClosureCard data={parsedData.operationClosureProjection} />
      </Box>

      <Typography variant='body2' fontWeight={500} marginTop={4}>
        Custo R$/KG
      </Typography>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: '40px',
        }}
      >
        <CostsByKgCard data={parsedData.costsByKgProjection} />

        <CostsByKgMeCard data={parsedData.costsByKgProjection} />

        <CostsByKgMiCard data={parsedData.costsByKgProjection} />

        <CostsByKgCattleCard data={parsedData.costsByKgProjection} />

        <CostsByKgMeCattleCard data={parsedData.costsByKgProjection} />

        <CostsByKgMiCattleCard data={parsedData.costsByKgProjection} />

        <CostsByKgArrendCard data={parsedData.costsByKgProjection} />

        <CostsByKgMeArrendCard data={parsedData.costsByKgProjection} />

        <CostsByKgMiArrendCard data={parsedData.costsByKgProjection} />
      </Box>
    </Box>
  )
}
