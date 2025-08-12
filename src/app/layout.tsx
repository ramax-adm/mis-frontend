/* eslint-disable @next/next/no-page-custom-font */
"use client";
import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "@/components/Themes/CustomTheme";
import AppProvider from "@/contexts/context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query/react-query";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
        />
      </head>
      <body>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
        >
          <ThemeProvider theme={CustomTheme}>
            <NuqsAdapter>
              <QueryClientProvider client={queryClient}>
                <AppProvider>{children}</AppProvider>
                <Toaster position='top-center' richColors />
              </QueryClientProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
