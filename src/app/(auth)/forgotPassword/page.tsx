'use client'
import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { HiCheckCircle } from 'react-icons/hi'
import { green } from '@mui/material/colors'
import ResetPassword from './components/resetPassword'
import CheckToken from './components/checkToken'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/utils/appRoutes'
import { PostForgotPassword } from '@/services/webApi/auth-api'

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, informe o e-mail.' })
    .email('Esse e-mail não é válido.'),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export type ForgotPasswordPayload = {
  userEmail: string
}

export default function ForgotPassword() {
  const router = useRouter()
  const [confirmComponent, setConfirmComponent] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [checkToken, setCheckToken] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { mutateAsync: senForgotPasswordRequest } = useMutation({
    mutationFn: async (data: ForgotPasswordPayload) => {
      await PostForgotPassword({ email: data.userEmail })
    },
    onError() {
      setConfirmComponent(false)
    },
    onSuccess() {
      setConfirmComponent(true)
    },
  })

  async function handleSendForgotPasswordRequest(data: ForgotPasswordSchema) {
    const { email } = data
    setEmail(email)

    await senForgotPasswordRequest({
      userEmail: email,
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        paddingBottom: 2,
      }}
    >
      <Button
        type='submit'
        color='success'
        variant='contained'
        sx={{
          borderRadius: 2,
          width: '100px',
        }}
        onClick={() => router.push(PageRoutes.login())}
      >
        Voltar
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          paddingTop: { xs: 4, sm: 8 },
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: 600 },
          }}
        >
          {confirmComponent ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography sx={{ fontSize: { xs: 24, sm: 48 }, fontWeight: 700 }}>
                Solicitação confirmada!
              </Typography>
              <Typography sx={{ fontSize: { xs: 16, sm: 24 }, textAlign: 'center' }}>
                O token de autenticação foi enviado para o seu e-mail.
              </Typography>
              <HiCheckCircle fontSize='70px' color={green[500]} />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography sx={{ fontSize: { xs: 24, sm: 48 }, fontWeight: 700 }}>
                  Esqueci minha senha
                </Typography>
                <Typography sx={{ fontSize: { xs: 16, sm: 24 } }}>
                  Por favor, informe o e-mail de acesso para recuperar sua senha.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginY: 3,
                    gap: 3,
                  }}
                >
                  <TextField
                    sx={{
                      border: '1px',
                      borderColor: '#323232',
                      placeHolderColor: '#464646',
                      borderRadius: 2,
                    }}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                    fullWidth
                    id={`email`}
                    label='E-mail'
                    size='small'
                    {...register('email')}
                  />
                </Box>

                <Button
                  type='submit'
                  color='warning'
                  variant='contained'
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleSendForgotPasswordRequest)}
                  sx={{
                    marginTop: 2,
                    borderRadius: 2,
                  }}
                  fullWidth
                >
                  {isSubmitting ? 'Carregando...' : 'Solicitar nova senha'}
                </Button>
              </Box>
            </>
          )}
          {confirmComponent && (
            <CheckToken email={email} setToken={setToken} setCheckToken={setCheckToken} />
          )}
          {checkToken && <ResetPassword email={email} token={token} />}
        </Box>
      </Box>

      <Typography
        variant='h3'
        sx={{
          fontSize: '14px',
          position: 'fixed',
          bottom: 1,
          color: '#29323a',
        }}
      >
        {new Date().getFullYear()} © RAMAX - GROUP
      </Typography>
    </Box>
  )
}
