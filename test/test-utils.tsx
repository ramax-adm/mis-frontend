import { CustomTheme } from '@/components/Themes/CustomTheme'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'
import 'dayjs/locale/en-gb'
import AppProvider from '@/contexts/context'
import React, { ReactElement } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
      <ThemeProvider theme={CustomTheme}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>{children}</AppProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender }
