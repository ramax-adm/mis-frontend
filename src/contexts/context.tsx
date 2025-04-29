import React from 'react'
import AuthContextProvider from './auth'
import AppContextProvider from './app'

type ContextProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: ContextProviderProps) => (
  <AuthContextProvider>
    <AppContextProvider>{children}</AppContextProvider>
  </AuthContextProvider>
)

export default AppProvider
