import { useGetHumanResourceHoursAnalysesData } from '@/services/react-query/queries/human-resources-hours'
import { Box, Grid, Typography } from '@mui/material'
import { AnalysesHoursRelationCard } from '../cards/analyses-hours-relation-card'
import { AnalysesHoursRelationByMonthCard } from '../cards/analyses-hours-relation-by-month-card'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { useState } from 'react'
import dayjs from 'dayjs'
import { DateInputControlled } from '@/components/Inputs/DateInput/controlled'
import { HumanResourceHoursIndicator, HumanResourceIndicator } from '../indicators'
import { AnalysesMoreThanTwoExtraHoursTable } from '../tables/analyses-more-than-two-extra-hours-table'
import { AnalysesMoreThanTwoExtraHoursCard } from '../cards/analyses-more-than-two-extra-hours-card'
import { AnalysesMoreThanTwoExtraHoursByEmployeeCard } from '../cards/analyses-more-than-two-extra-hours-by-employee-card'
import { AnalysesIrregularExtraHoursCard } from '../cards/analyses-irregular-extra-hours-card'
import { HumanResourcesHoursCustomizedCard } from '../customized/card'
import { AnalysesIrregularExtraHoursByEmployeeCard } from '../cards/analyses-irregular-extra-hours-by-employee-card'
import { AnalysesMoreThanTwoExtraHoursByDepartmentCard } from '../cards/analyses-more-than-two-extra-hours-by-department-card'
import { AnalysesIrregularExtraHoursByDepartmentCard } from '../cards/analyses-irregular-extra-hours-by-department-card copy'

interface HumanResourcesHoursAnalysesSectionProps {
  selectedCompany: string
  selectedDepartment: string
  selectedEmployee: string
  isCompanySelected: boolean
}
export function HumanResourcesHoursAnalysesSection({
  selectedCompany,
  isCompanySelected,
  selectedDepartment,
  selectedEmployee,
}: HumanResourcesHoursAnalysesSectionProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined)
  const handleSelectStartDate = (value: Date) => setSelectedStartDate(value)
  const handleSelectEndDate = (value: Date) => setSelectedEndDate(value)

  const { data: analysesData, isFetching: isFetchingAnalysesData } =
    useGetHumanResourceHoursAnalysesData({
      companyCode: selectedCompany,
      department: selectedDepartment,
      employeeName: selectedEmployee,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    })

  if (isFetchingAnalysesData) {
    return <LoadingOverlay />
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={'12px'} fontWeight={700}>
            Comparativo
          </Typography>
        </Grid>
      </Grid>
      <Grid container columnSpacing={1} marginTop={0.5}>
        <Grid item xs={12} sm={5}>
          <AnalysesHoursRelationCard data={analysesData?.comparative.hoursRelation} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <AnalysesHoursRelationByMonthCard data={analysesData?.comparative.hoursRelationByMonth} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={'12px'} fontWeight={700}>
            Outliers
          </Typography>
        </Grid>
        {/** */}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={2.5}>
          <DateInputControlled
            disabled={!isCompanySelected}
            label='Dt. Inicio'
            size='small'
            value={selectedStartDate ? dayjs(selectedStartDate) : null}
            setValue={handleSelectStartDate}
          />
        </Grid>
        <Grid item xs={2.5}>
          <DateInputControlled
            disabled={!isCompanySelected}
            label='Dt. Fim'
            size='small'
            value={selectedEndDate ? dayjs(selectedEndDate) : null}
            setValue={handleSelectEndDate}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Typography fontSize={'10px'} color={'#3E63DD'} fontWeight={700}>
            Totais Hs. Extras
          </Typography>
          <HumanResourceHoursIndicator
            title='Σ Hs'
            value={analysesData?.outliers.totals.extraHours}
          />
          {/** */}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'10px'} color={'#3E63DD'} fontWeight={700}>
              Totais acima de 2hs extras
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 1 }}>
              <HumanResourceIndicator
                title='Qtd. Registros:'
                value={
                  analysesData?.outliers.totals.moreThanTwoExtraHoursByEmployeeRegistriesAmount ?? 0
                }
              />
              <HumanResourceHoursIndicator
                title='Σ Hs'
                value={analysesData?.outliers.totals.moreThanTwoExtraHoursByEmployee}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', marginTop: 0.5 }}>
            <AnalysesMoreThanTwoExtraHoursCard
              data={analysesData?.outliers.moreThanTwoExtraHoursRegistries}
            />
            <AnalysesMoreThanTwoExtraHoursByEmployeeCard
              data={analysesData?.outliers.moreThanTwoExtraHoursByEmployee}
            />
            <AnalysesMoreThanTwoExtraHoursByDepartmentCard
              data={analysesData?.outliers.moreThanTwoExtraHoursByDepartment}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} rowGap={1}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'10px'} color={'#3E63DD'} fontWeight={700}>
              Totais hs. extras irregulares
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 1 }}>
              <HumanResourceIndicator
                title='Qtd. Registros:'
                value={
                  analysesData?.outliers.totals.irregularExtraHoursByEmployeeRegistriesAmount ?? 0
                }
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', marginTop: 0.5 }}>
            <AnalysesIrregularExtraHoursCard
              data={analysesData?.outliers.irregularExtraHoursRegistries}
            />
            <AnalysesIrregularExtraHoursByEmployeeCard
              data={analysesData?.outliers.irregularExtraHoursByEmployee}
            />
            <AnalysesIrregularExtraHoursByDepartmentCard
              data={analysesData?.outliers.irregularExtraHoursByDepartment}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
