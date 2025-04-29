import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SetStateAction } from 'react'
import { CreateUser } from '@/types/user'
import { PostCreateUser } from '../../webApi/user-api'
import { queryKeys } from '../query-keys'

interface UseCreateUserProps {
  setSubmitCreateUserError: (value: SetStateAction<string | null>) => void
}
export function useCreateUser({ setSubmitCreateUserError }: UseCreateUserProps) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateUser) => await PostCreateUser(payload),

    onError(error) {
      if (error instanceof AxiosError) setSubmitCreateUserError(error.response?.data?.message)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: 'all',
      })
    },
  })
}
