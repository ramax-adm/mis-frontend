'use client'
import { useGetAppWebpages } from '@/services/react-query/queries/application'
import { GetUserProfile } from '@/services/webApi/user-api'
import { User, UserRoleEnum, UserRoles } from '@/types/user'
import { PageRoutes } from '@/utils/appRoutes'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage.utils'
import { AxiosError } from 'axios'
import { useRouter, usePathname, useParams } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextProviderProps = {
  children: React.ReactNode
}

const userDefault: User = {
  id: '',
  name: '',
  cpf: '',
  email: '',
  username: '',
  userCompanies: [],
  userWebpages: [],
  refreshToken: '',
  role: '',
}

export const userRoles: UserRoles = {
  admin: 'admin',
  commercial: 'commercial',
  directory: 'directory',
  industry: 'industry',
}

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

// TODO: provide JWT token
export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState(userDefault)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [loginErrorMessage, setLoadingLoginMessage] = useState('')
  const { data: appWebpages = [] } = useGetAppWebpages()
  const pathname = usePathname()
  const params = useParams()

  const noAuthRoutes = appWebpages.filter((i) => i.isPublic).map((i) => i.page)
  const authRoutes = appWebpages.filter((i) => !i.isPublic).map((i) => i.page)

  function logoutUser() {
    const userPayload = {
      id: '',
      name: '',
      cpf: '',
      email: '',
      userCompanies: [],
      userWebpages: [],
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
    const currentPage = appWebpages.find((i) => i.page === pathname)

    if (!currentPage) {
      return
    }

    const isPublicPage = currentPage.isPublic
    if (isPublicPage) {
      return
    }

    const storedUser = getFromLocalStorage('user')
    const storedToken = getFromLocalStorage('token')

    if (!storedUser || !storedToken) {
      return router.push(PageRoutes.login())
    }

    const userLocal = JSON.parse(storedUser) as User
    setUser((prevState) => ({ ...prevState, ...userLocal }))

    const isNotAuthUser =
      !userLocal || userLocal.username === '' || storedToken === '' || !userLocal.isActive
    if (isNotAuthUser) {
      return router.push(PageRoutes.login())
    }

    // aqui, verificar se tem esse pathname nos dados do user
    const isAllowedPage = userLocal?.userWebpages?.find((i) => i.page.page === pathname)
    if (userLocal.role !== UserRoleEnum.Admin && !isAllowedPage) {
      return router.push(PageRoutes.home())
    }
  }, [pathname, router, params, appWebpages])

  useEffect(() => {
    const haveSomeAppWebpage = appWebpages && appWebpages.length > 0

    if (!haveSomeAppWebpage) {
      return
    }
    const isCurrentPageNoAuthRoute = noAuthRoutes.includes(pathname)
    if (isCurrentPageNoAuthRoute) {
      return
    }

    const userLocal = JSON.parse(localStorage.getItem('user')!)
    async function getProfile() {
      try {
        const profile = await GetUserProfile(userLocal.id)

        if (!profile.data.isActive) {
          return logoutUser()
        }
      } catch (error) {
        console.log(error)

        if (error instanceof AxiosError) {
          if (error.status == 401) {
            return logoutUser()
          }
        }
      }
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
