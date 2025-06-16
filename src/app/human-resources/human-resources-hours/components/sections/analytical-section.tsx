import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { useGetHumanResourceHoursAnalyticalData } from '@/services/react-query/queries/human-resources-hours'
import { Alert, Box, Grid, Typography } from '@mui/material'
import { AnalyticalHoursTable } from '../tables/analytical-hours-table'
import { HumanResourceHoursIndicator } from '../indicators'

interface HumanResourcesHoursAnalyticalSectionProps {
  selectedCompany: string
  selectedStartDate: Date | null
  selectedEndDate: Date | null
  selectedDepartment: string
  selectedEmployee: string
  isCompanySelected: boolean
}
export function HumanResourcesHoursAnalyticalSection({
  selectedCompany,
  isCompanySelected,
  selectedDepartment,
  selectedEmployee,
  selectedStartDate,
  selectedEndDate,
}: HumanResourcesHoursAnalyticalSectionProps) {
  const { data: analyticalData, isFetching: isFetchingAnalyticalData } =
    useGetHumanResourceHoursAnalyticalData({
      companyCode: selectedCompany,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      department: selectedDepartment,
      employeeName: selectedEmployee,
    })

  if (isFetchingAnalyticalData) {
    return <LoadingOverlay />
  }

  const haveSomeData = analyticalData?.parsedData && analyticalData.parsedData.length > 0
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '4px',
          }}
        >
          <Typography fontSize={'11px'} fontWeight={700} color={'#3E63DD'}>
            Totais
          </Typography>
          <Box sx={{ display: 'inline-flex', gap: 1 }}>
            <HumanResourceHoursIndicator
              title='Hs. Extras'
              value={analyticalData?.totals.extraHours}
            />

            <HumanResourceHoursIndicator
              title='Hs. Faltas'
              value={analyticalData?.totals.absenceHours}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {haveSomeData && <AnalyticalHoursTable data={analyticalData.parsedData} />}
        {!haveSomeData && (
          <Alert severity='info' sx={{ marginY: 'auto', marginX: 2 }}>
            Sem Dados
          </Alert>
        )}
      </Grid>
    </Grid>
  )
}
