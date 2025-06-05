import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { useExportCattlePurchaseFreightsXlsx } from '@/services/react-query/mutations/freights'
import { useSyncFreightsWithSensatta } from '@/services/react-query/mutations/sensatta'
import { useGetFreightsLastUpdatedAt } from '@/services/react-query/queries/freights'
import { Box, Button, Typography } from '@mui/material'

interface CattleFreightsHeaderProps {
  exportFreights: () => Promise<void>
  syncFreights: () => Promise<void>
  isSyncFreightsWithSensatta: boolean
  isExportingFreightsReport: boolean
}
export function CattleFreightsHeader({
  exportFreights,
  syncFreights,
  isExportingFreightsReport,
  isSyncFreightsWithSensatta,
}: CattleFreightsHeaderProps) {
  const { data: freightsLastUpdate } = useGetFreightsLastUpdatedAt()

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'center' },
          gap: 1,
        }}
      >
        <PageContainerHeader
          title='Fretes - Compra de Gado'
          sx={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}
        >
          <Typography variant='subtitle2' fontSize={'13px'}>
            Ultima atualização: {freightsLastUpdate?.parsedUpdatedAt}
          </Typography>
        </PageContainerHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button
            variant='contained'
            size='small'
            onClick={syncFreights}
            disabled={isSyncFreightsWithSensatta}
          >
            Atualizar c/ SENSATTA
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={exportFreights}
            disabled={isExportingFreightsReport}
          >
            Exportar XLSX
          </Button>
        </Box>
      </Box>
    </>
  )
}
