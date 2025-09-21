"use client";
import React from "react";
import AuthContextProvider from "./auth";
import AppContextProvider from "./app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query/react-query";

type ContextProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: ContextProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <AppContextProvider>{children}</AppContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);

export default AppProvider;
