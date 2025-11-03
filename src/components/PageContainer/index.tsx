"use client";
import React, { ReactNode, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { SideNavItem, useAppContext } from "@/contexts/app";
import { blue, grey, orange } from "@mui/material/colors";

import { SideMenu } from "../Menu/side-menu";
import { PageHeader } from "./page-header";
import { DrawerMenuOverlay } from "../Menu/drawer-menu";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  const { width, isDrawerMenuOpened } = useAppContext();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#FAFAFA",
          ...(isDrawerMenuOpened && {
            overflow: "hidden",
          }),
        }}
      >
        {/** Componentes auxiliares de navegação - PARA DESKTOP */}
        {width > 1000 && <SideMenu />}

        {/** Conteudo da pagina */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <PageHeader />
          <Box
            sx={{
              marginTop: "48px",
              marginLeft: width > 1000 ? "70px" : "",
              paddingBottom: 1,
              zIndex: 10,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <DrawerMenuOverlay />
    </>
  );
};
