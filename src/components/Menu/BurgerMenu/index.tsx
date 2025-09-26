"use client";
import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SideNavItem, useAppContext } from "@/contexts/app";
import RamaxHorizontalLogo from "@/assets/RAMAX-Group_Horizontal_Cor.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { grey } from "@mui/material/colors";
import { FaHome } from "react-icons/fa";
import { BurgerMenuItem } from "./item";
import { LogOut } from "lucide-react";

export function BurgerMenu() {
  const { width, isBurgerMenuOpened, toggleBurgerMenuOpened } = useAppContext();

  if (isBurgerMenuOpened && width < 1000) {
    return <BurgerMenuContainer />;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        marginTop: "10px",
        marginRight: "6px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MenuIcon
          fontSize='large'
          color='primary'
          onClick={toggleBurgerMenuOpened}
        />
      </Box>
    </Box>
  );
}

export const BurgerMenuContainer = () => {
  const {
    isBurgerMenuOpened,
    NAV_ITEMS,
    webpages,
    toggleBurgerMenuOpened,
    checkPagePermission,
  } = useAppContext();
  const { user, logoutUser } = useAuthContext();
  const [submenuOpen, setSubmenuOpen] = useState<SideNavItem | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isHomePath = pathname === "/home";

  const redirect = (url: string) => {
    toggleBurgerMenuOpened();
    return router.push(url);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "70%",
        maxWidth: "350px",
        height: "100dvh",
        overflowX: "hidden",
        overflowY: "auto",
        background: "linear-gradient(150deg, #fff 0%, #fff 74%)",
        transform: isBurgerMenuOpened ? "translateX(0%)" : "translateX(100%)",
        transition: "all 0.5s ease-in-out",
        zIndex: 150,
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "inline-flex",
          width: "98%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Image
          style={{
            width: "100px",
            height: "40px",
            alignSelf: "center",
            objectFit: "contain",
          }}
          src={RamaxHorizontalLogo}
          alt='logo'
        />
        <CloseIcon
          fontSize='large'
          color='primary'
          onClick={toggleBurgerMenuOpened}
        />
      </Box>
      <Divider sx={{ width: "95%", marginX: "auto", marginTop: 1 }} />

      {/* Conteúdo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 1,
          gap: 0.2,
        }}
      >
        {/* Home */}
        <Typography
          fontSize={"10px"}
          fontWeight={600}
          color={grey["600"]}
          marginLeft={"12px"}
        >
          Inicio
        </Typography>
        <Box
          onClick={() => redirect("/home")}
          sx={{
            display: "inline-flex",
            width: "100%",
            alignItems: "center",
            gap: 1,
            color: isHomePath ? "#3e63dd" : grey["800"],
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
            paddingLeft: "12px",
            paddingY: "12px",
            backgroundColor: isHomePath ? "rgba(62, 99, 221, 0.2)" : "",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "1.2rem", lineHeight: 0 }}>
            <FaHome />
          </span>
          <Typography fontSize={"1rem"}>Home</Typography>
        </Box>

        <Divider
          sx={{ width: "90%", marginLeft: "auto", marginRight: "10px" }}
        />

        {/* Demais itens */}

        <Typography
          fontSize={"10px"}
          fontWeight={600}
          color={grey["600"]}
          marginLeft={"12px"}
          marginTop={1}
        >
          Paginas
        </Typography>
        {NAV_ITEMS.map((item) => {
          const hasPermission = checkPagePermission({ user, webpages, item });
          if (!hasPermission) return null;

          return (
            <BurgerMenuItem
              key={item.title}
              item={{
                ...item,
                subMenuItems: item?.subMenuItems?.filter((i) =>
                  checkPagePermission({ user, webpages, item: i })
                ),
              }}
              submenuOpen={submenuOpen}
              setSubmenuOpen={setSubmenuOpen}
            />
          );
        })}

        <Divider
          sx={{ width: "90%", marginLeft: "auto", marginRight: "10px" }}
        />

        {/* Home */}
        <Typography
          fontSize={"10px"}
          fontWeight={600}
          color={grey["600"]}
          marginLeft={"12px"}
          marginTop={1}
        >
          Sair
        </Typography>
        <Box
          onClick={() => {
            toggleBurgerMenuOpened();
            logoutUser();
          }}
          sx={{
            display: "inline-flex",
            width: "100%",
            alignItems: "center",
            gap: 1,
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
            paddingLeft: "12px",
            paddingY: "12px",
            cursor: "pointer",
          }}
        >
          <span>
            <LogOut size={18} />
          </span>
          <Typography fontSize={"1rem"}>Sair</Typography>
        </Box>
      </Box>
    </Box>
  );
};
