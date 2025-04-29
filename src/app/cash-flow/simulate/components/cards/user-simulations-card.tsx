import { Card } from '@/components/Card'
import { DateInput } from '@/components/Inputs/DateInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { UserSimulationsTable } from '../tables/user-simulations-table'
import { UseSaveUserSimulationRequest } from '@/types/mutations/cash-flow'
import {
  useDeleteManyUserSimulations,
  useSaveUserSimulation,
} from '@/services/react-query/mutations/cash-flow'
import { formatToInternationalDate } from '@/utils/formatToDate'
import { useGetUserSimulations } from '@/services/react-query/queries/cash-flow'
import { COLORS } from '@/constants/styles/colors'

const userSimulationsFilterForm = z.object({
  date: z.date().optional(),
})

type UserSimulationsFilterForm = z.infer<typeof userSimulationsFilterForm>

interface UserSimulationsCardProps {
  showTable: boolean
  data?: UseSaveUserSimulationRequest
}
export function UserSimulationsCard({ showTable, data }: UserSimulationsCardProps) {
  const {
    control,
    formState: { errors },
  } = useForm<UserSimulationsFilterForm>({
    resolver: zodResolver(userSimulationsFilterForm),
    defaultValues: {
      date: undefined,
    },
  })

  const { date } = useWatch({ control })

  const { data: simulations, isFetching: isFetchingSimulations } = useGetUserSimulations({
    date: date ? formatToInternationalDate(date) : undefined,
    fetchQuery: showTable,
  })

  const { mutateAsync: saveUserSimulation, isPending: isSavingUserSimulation } =
    useSaveUserSimulation()

  const { mutateAsync: deleteManyUserSimulations, isPending: isDeletingManySimulations } =
    useDeleteManyUserSimulations()

  const onSaveUserSimulation = async () => {
    await saveUserSimulation({ ...data })
  }

  const onDeleteManyUserSimulations = async () => {
    const newDate = date ? formatToInternationalDate(date) : undefined

    await deleteManyUserSimulations(newDate)
  }

  if (!showTable) {
    return null
  }

  return (
    <Card.Root sx={{ width: '100', height: { xs: '400px', md: '360px' } }}>
      <Card.Title>Historico de simulações do usuario p/ data</Card.Title>
      <Card.Content sx={{ height: '100%' }}>
        <Box sx={{ width: '345px', display: 'flex', gap: 2 }}>
          <DateInput label='Data' name='date' control={control} error={errors.date} size='small' />

          <Button
            title='Salva uma simulação para a data selecionada'
            variant='contained'
            disabled={!date || !data || isSavingUserSimulation || isDeletingManySimulations}
            onClick={onSaveUserSimulation}
          >
            Salvar
          </Button>
          <Button
            title='Exclui simulações da data selecionada'
            variant='contained'
            disabled={!date || !data || isSavingUserSimulation || isDeletingManySimulations}
            onClick={onDeleteManyUserSimulations}
          >
            Excluir
          </Button>
        </Box>

        <UserSimulationsTable isFetching={isFetchingSimulations} simulations={simulations} />
      </Card.Content>
      <Card.Footer sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          Total Cbs Me: {simulations?.totals.cbsMe}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          Total Cbs Me: {simulations?.totals.cbsMi}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          Total Entradas R$: {simulations?.totals.entradas}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          Total Saidas R$: {simulations?.totals.saidas}
        </Typography>
        <Typography fontWeight={700} fontSize={'12px'} sx={{ color: COLORS.TEXTO }}>
          Total Fechamento R$: {simulations?.totals.fechamento}
        </Typography>
      </Card.Footer>
    </Card.Root>
  )
}
