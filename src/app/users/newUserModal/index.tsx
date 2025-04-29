/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import InputMask from 'react-input-mask'
import { removeCpfMask } from '@/utils/functions'
import { AxiosError } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { PostCreateUser } from '@/services/webApi/user-api'
import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { queryKeys } from '@/services/react-query/query-keys'
import { userRoles } from '@/contexts/auth'

type Props = { onClose: () => void }
const NewUserModal = (props: Props) => {
  const [load, setLoad] = useState(false)
  const [newCad, setNewCad] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    role: '',
  })

  const [validation, setValidation] = useState<boolean>(true)
  const [roleSelected, setRoleSelected] = useState<string>('admin')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [cpf, setCpf] = useState('')

  const handleCpf = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCpf(e.target.value)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.id
    const value = e.target.value
    setNewCad({ ...newCad, [key]: value })
  }

  const queryClient = useQueryClient()
  const handleSubmit = async () => {
    try {
      setLoad(true)
      newCad.cpf = removeCpfMask(cpf)
      newCad.role = roleSelected

      const payload = {
        name: newCad.name,
        email: newCad.email,
        cpf: newCad.cpf,
        password: newCad.password,
        role: newCad.role,
      }

      await PostCreateUser(payload)
      setError(false)

      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS.FIND_ALL] })
      props.onClose()
    } catch (error) {
      setError(true)

      if (error instanceof AxiosError) {
        setErrorMessage(error?.response?.data.message)
      } else {
        setErrorMessage('Ocorreu um erro ao realizar login')
      }
    } finally {
      setLoad(false)
    }
  }

  const roleHandler = (value: string) => {
    setRoleSelected(value)
  }

  useEffect(() => {
    function validateForm() {
      if (
        newCad?.name.length <= 0 ||
        newCad?.email.length <= 0 ||
        cpf.length <= 0 ||
        newCad?.password.length <= 0 ||
        roleSelected === null
      ) {
        return true
      }

      return false
    }
    setValidation(validateForm())
  }, [newCad, cpf, roleSelected])

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '8px 8px 0 0',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant='h6' component='h2'>
          Cadastrar novo Usuario
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: '16px',
          maxHeight: '80%',
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
              onChange={(event) => {
                handleOnChange(event)
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputMask mask={'999.999.999-99'} value={cpf} onChange={(event) => handleCpf(event)}>
              <TextField id={`CPF`} label='CPF' size='small' />
            </InputMask>
          </FormControl>
        </Box>

        <ControlledSelect
          id='role-select'
          name='role-select'
          value={roleSelected}
          label='Função'
          onChange={roleHandler}
          size='small'
          options={[
            { label: 'Administrador', value: userRoles.admin, key: userRoles.admin },
            { label: 'Diretoria', value: userRoles.directory, key: userRoles.directory },
            { label: 'Comercial', value: userRoles.commercial, key: userRoles.commercial },
          ]}
        />

        <FormControl fullWidth>
          <TextField
            id={`email`}
            label='E-mail'
            size='small'
            onChange={(event) => {
              handleOnChange(event)
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id={`password`}
            label='Senha'
            type='password'
            size='small'
            onChange={(event) => {
              handleOnChange(event)
            }}
          />
        </FormControl>
        {error && (
          <Typography variant='h6' color='red' component='h2'>
            {errorMessage}
          </Typography>
        )}
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
        <Button disabled={validation || load} variant='contained' color={'success'}>
          <Typography color={'#fff'} onClick={() => handleSubmit()}>
            {load ? <CircularProgress color='success' /> : 'Cadastrar'}
          </Typography>
        </Button>
        <Button variant='outlined' color='warning' onClick={() => props.onClose()}>
          <Typography>Fechar</Typography>
        </Button>
      </Box>
    </Box>
  )
}
export default NewUserModal
