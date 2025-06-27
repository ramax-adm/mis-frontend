'use client'
import { DateInputControlled } from '@/components/Inputs/DateInput/controlled'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { LoadingOverlay } from '@/components/Loading/loadingSpinner'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { Column, CustomizedTable } from '@/components/Table/body'
import { useGetSyncedFileEntities, useGetSyncedFiles } from '@/services/react-query/queries/utils'
import { GetSyncedFilesResponse } from '@/types/api/utils'
import { useDownloadSyncedFile } from '@/types/mutations/utils'
import { Alert, Button, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { IoMdDownload } from 'react-icons/io'
import { SyncedFilesTable } from './components/tables/synced-files-table'

export default function StorageSyncedFilesPage() {
  const [entitySelected, setEntitySelected] = useState<string | null>(null)
  const [dateSelected, setDateSelected] = useState<Date | null>(null)
  const handleSelectDate = (value: Date) => setDateSelected(value)
  const handleSelectEntity = (value: string | null) => setEntitySelected(value)

  const { data: entities = [] } = useGetSyncedFileEntities()

  return (
    <PageContainer>
      <PageContainerHeader title='Snapshots de dados' />

      {/** HEADER */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={'12px'} fontWeight={700}>
            Filtros
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <DateInputControlled
            label='Dt. Base'
            size='small'
            value={dateSelected ? dayjs(dateSelected) : null}
            setValue={handleSelectDate}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ControlledSelect
            id='entity'
            label='Departamento'
            name='entity'
            size='small'
            value={entitySelected}
            onChange={handleSelectEntity}
            options={entities}
          />
        </Grid>
      </Grid>

      <SyncedFilesTable dateSelected={dateSelected} entitySelected={entitySelected} />
    </PageContainer>
  )
}
