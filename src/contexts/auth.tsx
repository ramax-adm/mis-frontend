'use client'
import { GetUserProfile } from '@/services/webApi/user-api'
import { User, UserRoles } from '@/types/user'
import { PageRoutes } from '@/utils/appRoutes'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage.utils'
import { useRouter, usePathname, useParams } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextProviderProps = {
  children: React.ReactNode
}

const userDefault = {
  id: '',
  name: '',
  cpf: '',
  email: '',
  username: '',
  refreshToken: '',
  role: '',
}

export const userRoles: UserRoles = {
  admin: 'admin',
  commercial: 'commercial',
  directory: 'directory',
  industry: 'industry',
}

const protectedRoutes: { route: string; role: string[] }[] = [
  {
    route: PageRoutes.cashFlow(),
    role: [userRoles.admin, userRoles.directory, userRoles.industry],
  },
  { route: PageRoutes.users(), role: [userRoles.admin, userRoles.directory] },
]

const initialRouteByRole = {
  [userRoles.admin]: PageRoutes.home(),
  [userRoles.commercial]: PageRoutes.home(),
  [userRoles.directory]: PageRoutes.home(),
  [userRoles.industry]: PageRoutes.home(),
}

const noAuthRoutes = [PageRoutes.login(), PageRoutes.forgotPassword()]

type AuthContext = {
  user: User
  userRoles: UserRoles
  loadingLogin: boolean
  loginError: boolean
  loginErrorMessage: string
  setUser: React.Dispatch<React.SetStateAction<User>>
  setLoadingLogin: React.Dispatch<React.SetStateAction<boolean>>
  setLoginError: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingLoginMessage: React.Dispatch<React.SetStateAction<string>>
  logoutUser: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState(userDefault)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginErrorMessage, setLoadingLoginMessage] = useState('')
  const pathname = usePathname()
  const params = useParams()

  function logoutUser() {
    const userPayload = {
      id: '',
      name: '',
      cpf: '',
      email: '',
      username: '',
      refreshToken: '',
      role: '',
    }
    setToLocalStorage('token', '')
    setToLocalStorage('user', JSON.stringify(userPayload))
    setLoadingLogin(false)
    setUser(userPayload)
    return router.push(PageRoutes.login())
  }

  /*
   * This is a function that tests user authentication for routes
   */

  useEffect(() => {
    if (noAuthRoutes.includes(pathname)) {
      return
    }

    const storedUser = getFromLocalStorage('user')
    const storedToken = getFromLocalStorage('token')

    if (!storedUser || !storedToken) {
      return router.push(PageRoutes.login())
    }

    const userLocal = JSON.parse(storedUser)
    setUser(userLocal)

    if (!userLocal || userLocal.username === '' || storedToken === '' || !userLocal.isActive) {
      return router.push(PageRoutes.login())
    }

    const data = protectedRoutes.find((route) => {
      switch (typeof route.route) {
        case 'string':
          return route.route === pathname
        // case 'function':
        //   return route.route(params) === pathname
        default:
          return false
      }
    })

    if (data && !data?.role.includes(userLocal.role)) {
      return router.push(initialRouteByRole[userLocal.role])
    }
  }, [pathname, router, params])

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user')!)

    async function getProfile() {
      try {
        const profile = await GetUserProfile(userLocal.id)
        if (!profile.data.isActive) {
          return logoutUser()
        }
      } catch (error) {}
    }
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <AuthContext.Provider
      value={{
        user,
        userRoles,
        loadingLogin,
        loginError,
        loginErrorMessage,
        setUser,
        setLoadingLogin,
        setLoginError,
        setLoadingLoginMessage,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used with AuthContextProvider')
  }
  return context
}
