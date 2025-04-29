import { useMutation } from '@tanstack/react-query'
import { PostResetPassword } from '../../webApi/auth-api'
import { SetStateAction } from 'react'

interface ResetPasswordRequest {
  email: string
  password: string
  token: string
}

interface UseResetPasswordMutation {
  setConfirmComponent: (value: SetStateAction<boolean>) => void
  setErrorComponent: (value: SetStateAction<boolean>) => void
}
export const useResetPasswordMutation = ({
  setConfirmComponent,
  setErrorComponent,
}: UseResetPasswordMutation) => {
  return useMutation({
    mutationFn: async ({ email, password, token }: ResetPasswordRequest) => {
      await PostResetPassword({ email, password, token })
    },
    onSuccess() {
      setConfirmComponent(true)
      setErrorComponent(false)
    },
    onError() {
      setErrorComponent(true)
      setConfirmComponent(false)
    },
  })
}
