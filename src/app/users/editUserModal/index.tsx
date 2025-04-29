/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import InputMask from 'react-input-mask'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { UpdateUser } from '@/services/webApi/user-api'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { queryKeys } from '@/services/react-query/query-keys'
import { User } from '@/types/user'

type Props = {
  onClose: () => void
  userData?: User
  currentUserRole: string
}

const EditUserModal = (props: Props) => {
  const { userData, currentUserRole, onClose } = props
  const [load, setLoad] = useState(false)
  const [roleSelected, setRoleSelected] = useState<string>('admin')
  const [isActiveSelected, setIsActiveSelected] = useState<string>('ativo')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (userData) {
      setRoleSelected(userData.role)
      setIsActiveSelected(userData.isActive ? 'ativo' : 'inativo')
    }
  }, [userData])

  const handleSubmit = async () => {
    if (currentUserRole !== 'admin') {
      setErrorMessage('Apenas administradores podem editar a função do usuário')
      return
    }

    try {
      setLoad(true)

      await UpdateUser(userData!.id, {
        role: roleSelected,
        isActive: isActiveSelected === 'ativo',
      })

      setError(false)

      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS.FIND_ALL] })
      onClose()
    } catch (error) {
      setError(true)
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      } else {
        setErrorMessage('Ocorreu um erro ao tentar atualizar o usuário')
      }
    } finally {
      setLoad(false)
    }
  }

  const roleHandler = (value: string) => {
    setRoleSelected(value)
  }
  const isActiveHandler = (value: string) => {
    setIsActiveSelected(value)
  }

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '8px 8px 0 0',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant='h6' component='h2'>
          Editar Função do Usuário
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '16px',
          marginBottom: '16px',
          maxHeight: '80%',
          height: '90%',
          backgroundColor: '#fff',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              id={`name`}
              label='Nome'
              size='small'
              value={userData?.name || ''}
              disabled
            />
          </FormControl>

          <FormControl fullWidth>
            <InputMask mask={'999.999.999-99'} value={userData?.cpf || ''} disabled>
              <TextField id={`CPF`} label='CPF' size='small' />
            </InputMask>
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <TextField
            id={`email`}
            label='E-mail'
            size='small'
            value={userData?.email || ''}
            disabled
          />
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              id={`role`}
              label='Função'
              size='small'
              value={userData?.role || ''}
              disabled
            />
          </FormControl>
        </Box>

        {error && (
          <Typography variant='h6' color='red' component='h2'>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              id={`isActive`}
              label='Status do usuário'
              size='small'
              value={userData?.isActive ? 'Ativo' : 'Inativo'}
              disabled
            />
          </FormControl>
          <FormControl fullWidth>
            <ControlledSelect
              id='isActive-select'
              name='isActive-select'
              value={isActiveSelected}
              label='Desativar/Ativar Usuário'
              size='small'
              onChange={isActiveHandler}
              options={[
                { label: 'Ativo', value: 'ativo', key: 'ativo' },
                { label: 'Inativo', value: 'inativo', key: 'inativo' },
              ]}
            />
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          padding: 2,
          borderRadius: '0 0 8px 8px',
          backgroundColor: '#fff',
        }}
      >
        <Button disabled={load} variant='contained' color={'success'} onClick={handleSubmit}>
          {load ? <CircularProgress color='success' size={24} /> : 'Salvar'}
        </Button>
        <Button variant='outlined' color='warning' onClick={onClose}>
          <Typography>Fechar</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default EditUserModal
