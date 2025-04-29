'use client'
import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HiCheckCircle } from 'react-icons/hi'
import { green } from '@mui/material/colors'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/utils/appRoutes'
import { useResetPasswordMutation } from '@/services/react-query/mutations/auth'

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'Por favor, informe a senha desejada.' }),
    confirmPassword: z.string().min(1, { message: 'Por favor, informe a confirmação de senha.' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não são correspondentes',
    path: ['confirmPassword'],
  })
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export type ResetPasswordPayload = {
  email: string
  password: string
  token: string
}

interface resetPasswordProps {
  email: string
  token: string
}

export default function ResetPassword(props: resetPasswordProps) {
  const router = useRouter()
  const [confirmComponent, setConfirmComponent] = useState<boolean>(false)
  const [errorComponent, setErrorComponent] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { mutateAsync: senResetPasswordRequest } = useResetPasswordMutation({
    setConfirmComponent,
    setErrorComponent,
  })

  async function handleSendResetPasswordRequest(data: ResetPasswordSchema) {
    const { password } = data
    await senResetPasswordRequest({
      email: props.email,
      password,
      token: props.token,
    })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginTop: { xs: 4, sm: 8 },
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
              Senha alterada!
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, sm: 24 }, textAlign: 'center' }}>
              A senha foi alterada com sucesso! Retorne à tela de login.
            </Typography>
            <HiCheckCircle fontSize='70px' color={green[500]} />
            <Button
              type='submit'
              color='success'
              variant='contained'
              disabled={isSubmitting}
              onClick={() => router.push(PageRoutes.login())}
              sx={{
                marginTop: 2,
                borderRadius: 2,
              }}
            >
              Retornar para login
            </Button>
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
              <Typography sx={{ fontSize: { xs: 16, sm: 24 } }}>
                Por favor, informe e confirme a nova senha desejada.
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
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  fullWidth
                  id={`password`}
                  type='password'
                  label='Senha'
                  {...register('password')}
                />

                <TextField
                  sx={{
                    border: '1px',
                    borderColor: '#323232',
                    placeHolderColor: '#464646',
                    borderRadius: 2,
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword && errors.confirmPassword.message}
                  fullWidth
                  id={`password`}
                  type='password'
                  label='Confirme a senha'
                  {...register('confirmPassword')}
                />
              </Box>

              {errorComponent && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontSize: 18, textAlign: 'center', color: 'red' }}>
                    Erro ao alterar a senha.
                  </Typography>
                </Box>
              )}

              <Button
                type='submit'
                color='warning'
                variant='contained'
                disabled={isSubmitting}
                onClick={handleSubmit(handleSendResetPasswordRequest)}
                sx={{
                  marginTop: 2,
                  borderRadius: 2,
                }}
                fullWidth
              >
                {isSubmitting ? 'Carregando...' : 'Confirmar nova senha'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
