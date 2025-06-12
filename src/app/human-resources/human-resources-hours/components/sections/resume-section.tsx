'use client'
import { useGetHumanResourceHoursResumeData } from '@/services/react-query/queries/human-resources-hours'
import { Box, Grid, Typography } from '@mui/material'
import { ExtraHoursByDepartmentCard } from '../cards/extra-hours-by-department-card'
import { ExtraHoursByDayCard } from '../cards/extra-houts-by-day-card'
import { HistoryExtraHoursByEmployeeCard } from '../cards/history-extra-hours-card'
import { HistoryAbsenceHoursByEmployeeCard } from '../cards/history-absence-hours-card'
import { HistoryHoursRelationByDepartmentCard } from '../cards/history-hours-relation-by-department-card'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'

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

  return (
    <>
      {isFetchingResumeData && <LoadingOverlay />}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        {/** GLOBAL FILTERS*/}

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
                <Box
                  component={'span'}
                  sx={{
                    display: 'inline-flex',
                    paddingY: 0.5,
                    paddingX: 1,
                    borderRadius: '6px',
                    alignItems: 'center',
                    backgroundColor: 'rgba(62, 99, 221, 0.2)',
                  }}
                >
                  <Typography fontWeight={500} fontSize={'12px'} color={'#3E63DD'}>
                    Hs. Extras:{' '}
                  </Typography>
                  <Typography fontWeight={800} fontSize={'14px'} color={'#3E63DD'}>
                    {resumeData?.totals.extraHours
                      ? `${resumeData.totals.extraHours.split(':')[0]}h${resumeData.totals.extraHours.split(':')[1]}m`
                      : '00h00m'}
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                      Extras 50%
                    </Typography>
                    <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                      {resumeData?.totals.halfExtraHours}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                      Extras 100%
                    </Typography>
                    <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                      {resumeData?.totals.fullExtraHours}
                    </Typography>
                  </Box> */}
                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                      Hs. Folgas
                    </Typography>
                    <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                      {resumeData?.totals.hoursOff}
                    </Typography>
                  </Box> */}
                <Box
                  component={'span'}
                  sx={{
                    display: 'inline-flex',
                    paddingY: 0.5,
                    paddingX: 1,
                    borderRadius: '6px',
                    alignItems: 'center',
                    backgroundColor: 'rgba(62, 99, 221, 0.2)',
                  }}
                >
                  <Typography fontWeight={500} fontSize={'12px'} color={'#3E63DD'}>
                    Hs. Faltas:{' '}
                  </Typography>
                  <Typography fontWeight={900} fontSize={'14px'} color={'#3E63DD'}>
                    {resumeData?.totals.absenceHours
                      ? `${resumeData.totals.absenceHours.split(':')[0]}h${resumeData.totals.absenceHours.split(':')[1]}m`
                      : '00h00m'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2px',
                backgroundColor: 'rgba(62, 99, 221, 0.2)',
                borderRadius: '4px',
              }}
            >
              <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                Totais
              </Typography>
              <Box sx={{ display: 'inline-flex', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                    Hs. Extras
                  </Typography>
                  <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                    {resumeData?.totals.extraHours}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                    Extras 50%
                  </Typography>
                  <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                    {resumeData?.totals.halfExtraHours}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                    Extras 100%
                  </Typography>
                  <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                    {resumeData?.totals.fullExtraHours}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                    Hs. Folgas
                  </Typography>
                  <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                    {resumeData?.totals.hoursOff}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontWeight={700} fontSize={'12px'} color={'#3E63DD'}>
                    Hs. Faltas
                  </Typography>
                  <Typography fontWeight={800} fontSize={'16px'} color={'#3E63DD'}>
                    {resumeData?.totals.absenceHours}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid> */}

        {/** By day */}
        {resumeData?.day && (
          <Grid container spacing={'12px'}>
            {/* <Grid item xs={12}>
              <Typography fontWeight={700} fontSize={'12px'}>
                Totais
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <ExtraHoursByDepartmentCard data={resumeData.day.extraHoursByDepartment} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ExtraHoursByDayCard data={resumeData.day.extraHoursByDay} />
            </Grid>
            {/* <Grid item xs={12} sm={3}>
              <ExtraHoursByEmployeeCard data={resumeData.day.extraHoursByEmployee} />
            </Grid> */}
          </Grid>
        )}

        {/** By History */}
        {resumeData?.history && (
          <>
            {/* <Grid container spacing={'12px'} marginBottom={2}>
              <Grid item xs={12}>
                <Typography fontWeight={700} fontSize={'12px'}>
                  Historico (EM CONSTRUÇÃO)
                </Typography>
              </Grid>
            </Grid> */}

            <Grid container spacing={'12px'}>
              <Grid item xs={12} sm={3}>
                <HistoryExtraHoursByEmployeeCard data={resumeData.history.extraHoursByEmployee} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <HistoryAbsenceHoursByEmployeeCard
                  data={resumeData.history.absenceHoursByEmployee}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <HistoryHoursRelationByDepartmentCard
                  data={resumeData.history.historyHoursRelationByDepartment}
                />
              </Grid>
              {/* <Grid item xs={12} sm={3}>
                <HistoryAbsenceHoursByDepartmentCard
                  data={resumeData.history.absenceHoursByDepartmentByDay}
                />
              </Grid> */}
            </Grid>
          </>
        )}
      </Box>
    </>
  )
}
