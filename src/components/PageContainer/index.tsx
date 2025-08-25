"use client";
import React, { ReactNode, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { SideNavItem, useAppContext } from "@/contexts/app";
import { blue, grey, orange } from "@mui/material/colors";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BurgerMenu } from "../Menu/BurgerMenu";
import { SideNav as SideNavNew } from "../Menu/SideNav/new";
import { useAuthContext } from "@/contexts/auth";
import { IconType } from "react-icons";
import { LogOut } from "lucide-react";

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  Icon?: IconType;
};

export const PageContainer = ({ children }: { children: ReactNode }) => {
  const {
    width,
    isBurgerMenuOpened,
    isCollapsed,
    NAV_ITEMS,
    toggleBurgerMenuOpened,
    isMobile,
  } = useAppContext();
  const { logoutUser } = useAuthContext();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FAFAFA",
          height: "100%",
        }}
      >
        {/** Componentes auxiliares de navegação - PARA DESKTOP */}
        {width > 1000 && (
          <>
            <SideNavNew />
            <Button
              variant='outlined'
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                alignSelf: "center",
                display: "flex",
                gap: 2,
              }}
              startIcon={<LogOut size={14} strokeWidth={2} />}
              onClick={() => logoutUser()}
            >
              Sair
            </Button>
          </>
        )}

        {/** Conteudo da pagina */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            marginLeft: isMobile ? 0 : 2,
            marginY: 0.5,
          }}
        >
          {}
          {width < 1000 && <BurgerMenu />}

          <Box
            sx={{
              height: "100%",
              marginLeft: width > 1000 ? "3.5rem" : "",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      {isBurgerMenuOpened && (
        <Box
          onClick={toggleBurgerMenuOpened}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 120, // maior que conteúdo, menor que menus/dialogs
          }}
        />
      )}
    </>
  );
};
