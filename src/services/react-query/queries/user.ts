import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetUsers } from '../../webApi/user-api'
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
