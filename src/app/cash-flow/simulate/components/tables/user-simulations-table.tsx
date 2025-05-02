import { TransitionAlert } from '@/components/Alert/transition-alert'
import { Table } from '@/components/Table'
import { Column } from '@/components/Table/body'
import { useDeleteUserSimulation, useExportXlsx } from '@/services/react-query/mutations/cash-flow'
import { GetUserSimulationsResponse, UserSimulation } from '@/types/api/cash-flow'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { FaTrashAlt } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'

interface UserSimulationsTableProps {
  simulations?: GetUserSimulationsResponse
  isFetching: boolean
}
export function UserSimulationsTable({ simulations, isFetching }: UserSimulationsTableProps) {
  const { mutateAsync: deleteUserSimulation, isPending: isDeletingSimulation } =
    useDeleteUserSimulation()
  const { mutateAsync: exportSimulation, isPending: isExportingSimulation } = useExportXlsx()

  const onDeleteSimulation = async (id: string) => {
    await deleteUserSimulation(id)
  }

  const onExportSimulation = async (id?: string) => {
    await exportSimulation({ id })
  }

  const columns = getColumns({
    onDeleteSimulation,
    onExportSimulation,
    isExportingSimulation,
    isDeletingSimulation,
  })

  const hasAnySimulations = simulations && simulations.data.length > 0

  if (isFetching) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '90%',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <CircularProgress
          color='primary'
          size={24} // Aumenta o tamanho do spinner
          thickness={5} // Aumenta a espessura do stroke
        />
      </Box>
    )
  }

  if (!hasAnySimulations) {
    return (
      <Alert severity='info' sx={{ marginTop: 1, maxWidth: '300px' }}>
        Não tem nenhuma simulação previa
      </Alert>
    )
  }

  return (
    <>
      <Table.Root>
        {/** TODO */}
        <Table.Body<any>
          data={simulations.data}
          columns={columns}
          tableStyles={{
            maxHeight: '200px',
          }}
        />
      </Table.Root>
    </>
  )
}

interface GetUserSimulationColumns {
  onDeleteSimulation: (id: string) => Promise<void>
  onExportSimulation: (id?: string) => Promise<void>
  isExportingSimulation: boolean
  isDeletingSimulation: boolean
}
const getColumns = ({
  onDeleteSimulation,
  onExportSimulation,
  isExportingSimulation,
  isDeletingSimulation,
}: GetUserSimulationColumns): Column<UserSimulation>[] => {
  return [
    {
      headerName: 'Id',
      type: 'string',
      value: {
        first: {
          value: 'publicId',
        },
      },
    },
    {
      headerName: 'Dt. Simulação',
      type: 'string',
      value: {
        first: {
          value: 'createdAt',
        },
      },
    },
    {
      headerName: 'Nome',
      type: 'string',
      value: {
        first: {
          value: 'name',
        },
      },
    },
    {
      headerName: 'Usuario',
      type: 'string',
      value: {
        first: {
          value: 'createdBy',
        },
      },
    },
    {
      headerName: 'Dias projetados',
      type: 'number',
      value: {
        first: {
          value: 'diasProjecao',
        },
      },
    },
    {
      headerName: 'Cbs ME',
      type: 'number',
      value: {
        first: {
          value: 'cbsMe',
        },
      },
    },
    {
      headerName: 'Cbs MI',
      type: 'number',
      value: {
        first: {
          value: 'cbsMi',
        },
      },
    },
    {
      headerName: 'Peso @',
      type: 'number',
      value: {
        first: {
          value: 'pesoArroba',
        },
      },
    },
    {
      headerName: 'R$/@ ME',
      type: 'number',
      value: {
        first: {
          value: 'precoArrobaMe',
        },
      },
    },
    {
      headerName: 'R$/@ MI',
      type: 'number',
      value: {
        first: {
          value: 'precoArrobaMi',
        },
      },
    },
    {
      headerName: 'Entradas R$',
      type: 'number',
      value: {
        first: {
          value: 'entradas',
        },
      },
    },
    {
      headerName: 'Saidas R$',
      type: 'number',
      value: {
        first: {
          value: 'saidas',
        },
      },
    },
    {
      headerName: 'Fechamento R$',
      type: 'string',
      value: {
        first: {
          value: 'fechamento',
        },
      },
    },
    {
      headerName: 'Exportar',
      type: 'action',
      value: {
        first: {
          value: (row: UserSimulation) => (
            <Button
              variant='outlined'
              disabled={isExportingSimulation || isDeletingSimulation}
              onClick={() => {
                onExportSimulation(row.id)
              }}
            >
              <IoMdDownload />
            </Button>
          ),
        },
      },
    },
    {
      headerName: 'Remover',
      type: 'action',
      value: {
        first: {
          value: (row: UserSimulation) => (
            <Button
              variant='outlined'
              disabled={isExportingSimulation || isDeletingSimulation}
              onClick={() => {
                onDeleteSimulation(row.id)
              }}
            >
              <FaTrashAlt />
            </Button>
          ),
        },
      },
    },
  ]
}
