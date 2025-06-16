'use client'
import { useGetHumanResourceHoursResumeData } from '@/services/react-query/queries/human-resources-hours'
import { Box, Grid, Typography } from '@mui/material'
import { ExtraHoursByDepartmentCard } from '../cards/extra-hours-by-department-card'
import { ExtraHoursByDayCard } from '../cards/extra-houts-by-day-card'
import { HistoryExtraHoursByEmployeeCard } from '../cards/history-extra-hours-card'
import { HistoryAbsenceHoursByEmployeeCard } from '../cards/history-absence-hours-card'
import { HistoryHoursRelationByDepartmentCard } from '../cards/history-hours-relation-by-department-card'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { HumanResourceHoursIndicator } from '../indicators'

interface HumanResourcesHoursResumeSectionProps {
  selectedCompany: string
  selectedStartDate: Date | null
  selectedEndDate: Date | null
  selectedDepartment: string
  selectedEmployee: string
  isCompanySelected: boolean
}
export function HumanResourcesHoursResumeSection({
  selectedCompany,
  selectedDepartment,
  selectedEmployee,
  selectedEndDate,
  selectedStartDate,
  isCompanySelected,
}: HumanResourcesHoursResumeSectionProps) {
  const { data: resumeData, isFetching: isFetchingResumeData } = useGetHumanResourceHoursResumeData(
    {
      companyCode: selectedCompany,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      department: selectedDepartment,
      employeeName: selectedEmployee,
    },
  )

  if (isFetchingResumeData) {
    return <LoadingOverlay />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
      {/** Totals */}
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
                title='Hs. Extras: '
                value={resumeData?.totals.extraHours}
              />
              <HumanResourceHoursIndicator
                title='Hs. Faltas: '
                value={resumeData?.totals.absenceHours}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={'12px'}>
        <Grid item xs={12} sm={6}>
          <ExtraHoursByDepartmentCard data={resumeData?.day.extraHoursByDepartment} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ExtraHoursByDayCard data={resumeData?.history.extraHoursByDay} />
        </Grid>
        {/* <Grid item xs={12} sm={3}>
              <ExtraHoursByEmployeeCard data={resumeData.day.extraHoursByEmployee} />
            </Grid> */}
      </Grid>

      {/** By History */}
      <Grid container spacing={'12px'}>
        <Grid item xs={12} sm={3}>
          <HistoryExtraHoursByEmployeeCard data={resumeData?.history.extraHoursByEmployee} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <HistoryAbsenceHoursByEmployeeCard data={resumeData?.history.absenceHoursByEmployee} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HistoryHoursRelationByDepartmentCard
            data={resumeData?.history.historyHoursRelationByDepartment}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
