import { useAuthContext } from '@/contexts/auth'
import { ReactNode } from 'react'

type Props = {
  roles: string[]
  children: ReactNode | ReactNode[]
}
export function AuthorizedContent({ roles, children }: Props) {
  const { user } = useAuthContext()
  const isAuthrorized = !!roles.find((role) => role === user.role)

  return isAuthrorized ? <>{children}</> : null
}
