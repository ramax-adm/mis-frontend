import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Os dados do cache são validos em até 5 minutos antes de serem revalidados
      staleTime: 1000 * 5 * 60,

      // Tenta até 3 vezes fazer requisições ao backend
      retry(failureCount) {
        if (failureCount >= 3) {
          return false
        }
        return true
      },
    },
    mutations: {
      onError(error) {
        if (error instanceof AxiosError) {
          const statusReceived = error?.response?.status
          const isUserUnauthorizedError = statusReceived === 401 || statusReceived === 403

          if (isUserUnauthorizedError) {
            localStorage.setItem('@JWT_HASH', '')
            localStorage.setItem(
              'user',
              JSON.stringify({
                email: '',
                id: '',
                name: '',
                role: '',
                username: '',
              }),
            )
            // WIP - test this.
            NextResponse.redirect('/login')
          } else {
            // WIP - handle with errors globally
            return error?.response?.data.message ?? 'Erro Desconhecido da API'
          }
        } else {
          return 'Erro Desconhecido da API'
        }
      },
    },
  },
})
