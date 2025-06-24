import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetUser, GetUserProfile, GetUsers } from '../../webApi/user-api'
import { User } from '@/types/user'

export function useGetUsers(role?: string) {
  return useQuery<User[]>({
    queryKey: [queryKeys.USERS.FIND_ALL],
    queryFn: async () => {
      const { data } = await GetUsers(role || '')
      return data
    },
  })
}

export function useGetUser(id?: string) {
  return useQuery<User | undefined>({
    queryKey: [queryKeys.USERS.FIND_ONE.concat(id ?? '')],
    queryFn: async () => {
      if (!id) {
        return
      }
      const { data } = await GetUser(id)
      return data
    },
    enabled: !!id,
  })
}
