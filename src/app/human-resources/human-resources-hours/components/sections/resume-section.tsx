'use client'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import {
  useGetHumanResourceHoursResumeData,
  useGetHumanResourcesHoursAvailableDates,
  useGetHumanResourcesHoursDepartments,
  useGetHumanResourcesHoursEmployees,
} from '@/services/react-query/queries/human-resources-hours'
import { formatToDate } from '@/utils/formatToDate'
import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { ExtraHoursByDepartmentCard } from '../cards/extra-hours-by-department-card'
import { ExtraHoursByEmployeeCard } from '../cards/extra-hours-by-employee-card'
import { ExtraHoursByDayCard } from '../cards/extra-houts-by-day-card'
import { HistoryExtraHoursByEmployeeCard } from '../cards/history-extra-hours-card'
import { HistoryAbsenceHoursByEmployeeCard } from '../cards/history-absence-hours-card'
import { HistoryExtraHoursByDepartmentCard } from '../cards/history-extra-hours-by-department-card'
import { HistoryAbsenceHoursByDepartmentCard } from '../cards/history-absence-hours-by-department-card'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'

interface HumanResourcesHoursResumeSectionProps {
  selectedCompany: string
  isCompanySelected: boolean
}
export function HumanResourcesHoursResumeSection({
  selectedCompany,
  isCompanySelected,
}: HumanResourcesHoursResumeSectionProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedEmployee, setSelectedEmployee] = useState<string>('')

  const { data: dates } = useGetHumanResourcesHoursAvailableDates({ companyCode: selectedCompany })
  const { data: departments } = useGetHumanResourcesHoursDepartments({
    companyCode: selectedCompany,
  })
  const { data: employees } = useGetHumanResourcesHoursEmployees({
    companyCode: selectedCompany,
    department: selectedDepartment,
  })
  const { data: resumeData, isFetching: isFetchingResumeData } = useGetHumanResourceHoursResumeData(
    {
      companyCode: selectedCompany,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      department: selectedDepartment,
      employeeName: selectedEmployee,
    },
  )

  const handleSelectStartDate = (value: Date) => setSelectedStartDate(value)
  const handleSelectEndDate = (value: Date) => setSelectedEndDate(value)
  const handleSelectDepartment = (value: string) => setSelectedDepartment(value)
  const handleSelectEmployee = (value: string) => setSelectedEmployee(value)

  if (isFetchingResumeData) {
    return <LoadingOverlay />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
      {/** GLOBAL FILTERS*/}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight={600} fontSize={'10px'}>
              Dt. Inicio
            </Typography>
            <ControlledSelect
              disabled={!isCompanySelected}
              id='startDate'
              label='Dt. Inicio'
              name='startDate'
              size='small'
              value={selectedStartDate as Date}
              onChange={handleSelectStartDate}
              options={dates?.map((item, index) => ({
                label: formatToDate(item.date),
                value: item.date,
                key: index,
              }))}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight={600} fontSize={'10px'}>
              Dt. Fim
            </Typography>
            <ControlledSelect
              disabled={!isCompanySelected}
              id='endDate'
              label='Dt. Fim'
              name='endDate'
              size='small'
              value={selectedEndDate as Date}
              onChange={handleSelectEndDate}
              options={dates?.map((item, index) => ({
                label: formatToDate(item.date),
                value: item.date,
                key: index,
              }))}
            />
          </Box>
        </Grid>
      </Grid>

      {/** Totals */}
      <Grid container>
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
      </Grid>

      {/** By day */}
      {resumeData?.day && (
        <Grid container spacing={'12px'}>
          <Grid item xs={12}>
            <Typography fontWeight={700} fontSize={'12px'}>
              Relação Dia:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <ExtraHoursByDepartmentCard data={resumeData.day.extraHoursByDepartment} />
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <ExtraHoursByDayCard data={resumeData.day.extraHoursByDay} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ExtraHoursByEmployeeCard data={resumeData.day.extraHoursByEmployee} />
          </Grid>
        </Grid>
      )}

      {/** By History */}
      {resumeData?.history && (
        <>
          <Grid container spacing={'12px'} marginBottom={2}>
            <Grid item xs={12}>
              <Typography fontWeight={700} fontSize={'12px'}>
                Historico (EM CONSTRUÇÃO)
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={'12px'}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight={600} fontSize={'10px'}>
                  Departamento
                </Typography>
                <ControlledSelect
                  disabled={!isCompanySelected}
                  id='department'
                  label='Departamento'
                  name='department'
                  size='small'
                  value={selectedDepartment}
                  onChange={handleSelectDepartment}
                  options={departments?.map((item) => ({
                    label: item.department,
                    value: item.department,
                    key: item.department,
                  }))}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight={600} fontSize={'10px'}>
                  Funcionario
                </Typography>
                <ControlledSelect
                  disabled={!isCompanySelected}
                  id='employee'
                  label='Funcionario'
                  name='employee'
                  size='small'
                  value={selectedEmployee}
                  onChange={handleSelectEmployee}
                  options={employees?.map((item) => ({
                    label: item.employeeName,
                    value: item.employeeName,
                    key: item.employeeName,
                  }))}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={'12px'}>
            <Grid item xs={12} sm={3}>
              <HistoryExtraHoursByEmployeeCard data={resumeData.history.extraHoursByEmployee} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <HistoryAbsenceHoursByEmployeeCard data={resumeData.history.absenceHoursByEmployee} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <HistoryExtraHoursByDepartmentCard
                data={resumeData.history.extraHoursByDepartmentByDay}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <HistoryAbsenceHoursByDepartmentCard
                data={resumeData.history.absenceHoursByDepartmentByDay}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}
