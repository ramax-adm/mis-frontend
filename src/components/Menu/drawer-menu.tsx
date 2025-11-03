"use client";
import { Box, Divider, Portal, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SideNavItem, useAppContext } from "@/contexts/app";
import RamaxHorizontalLogo from "@/assets/RAMAX-Group_Horizontal_Cor.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { grey, indigo } from "@mui/material/colors";
import { FaHome } from "react-icons/fa";
import { ChevronDown, LogOut, MenuIcon } from "lucide-react";

export const DrawerMenu = () => {
  const { width, isDrawerMenuOpened, toggleDrawerMenuOpened } = useAppContext();

  if (isDrawerMenuOpened && width < 1000) {
    return <DrawerMenuContainer />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        "&:hover": {
          opacity: 0.7,
          cursor: "pointer",
        },
      }}
    >
      <MenuIcon
        size={20}
        color={indigo["A700"]}
        onClick={toggleDrawerMenuOpened}
      />
    </Box>
  );
};

export const DrawerMenuContainer = () => {
  const {
    isDrawerMenuOpened,
    NAV_ITEMS,
    webpages,
    toggleDrawerMenuOpened,
    checkPagePermission,
  } = useAppContext();
  const { user, logoutUser } = useAuthContext();
  const [submenuOpen, setSubmenuOpen] = useState<SideNavItem | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isHomePath = pathname === "/home";

  const onRouterPush = (url: string) => {
    toggleDrawerMenuOpened();
    return router.push(url);
  };

  return (
    <Portal>
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
          transform: isDrawerMenuOpened ? "translateX(0%)" : "translateX(100%)",
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
            onClick={toggleDrawerMenuOpened}
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
            onClick={() => onRouterPush("/home")}
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
            <Typography fontSize={"1rem"}>Inicio</Typography>
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
              <DrawerMenuItem
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
              toggleDrawerMenuOpened();
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
    </Portal>
  );
};

type DrawerMenuItemProps = {
  item: SideNavItem;
  submenuOpen: SideNavItem | null;
  setSubmenuOpen: (item: SideNavItem | null) => void;
};

export const DrawerMenuItem = ({
  item,
  submenuOpen,
  setSubmenuOpen,
}: DrawerMenuItemProps) => {
  const { toggleDrawerMenuOpened } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const isCurrentPath = item.path === pathname;
  const isCurrentSubmenu =
    pathname.split("/")[1] === item.path.replace("/", "");
  const hasSubmenu = !!item.submenu;
  const isSubmenuOpen = submenuOpen?.path === item.path;
  const Icon = item.icon;

  const redirect = (url: string) => {
    toggleDrawerMenuOpened();
    return router.push(url);
  };

  const handleClick = () => {
    if (!hasSubmenu) {
      return redirect(item.path);
    }

    // abre/fecha submenu
    if (isSubmenuOpen) {
      setSubmenuOpen(null);
    } else {
      setSubmenuOpen(item);
    }
  };

  return (
    <Box sx={{ width: "95%" }}>
      <Box
        onClick={handleClick}
        sx={{
          display: "inline-flex",
          width: "100%",
          alignItems: "center",
          gap: 1,
          color: isCurrentPath || isCurrentSubmenu ? "#3e63dd" : grey["800"],
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          paddingLeft: "12px",
          paddingY: "12px",
          backgroundColor:
            isCurrentPath || isCurrentSubmenu ? "rgba(62, 99, 221, 0.2)" : "",
          cursor: "pointer",
        }}
      >
        {Icon && (
          <span style={{ fontSize: "1.2rem", lineHeight: 0 }}>
            <Icon />
          </span>
        )}
        <Typography fontSize={"1rem"}>{item.title}</Typography>
        {hasSubmenu && (
          <span
            style={{
              marginLeft: "auto",
              marginRight: "16px",
              transition: "transform 0.2s",
              transform: isSubmenuOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown size={14} />
          </span>
        )}
      </Box>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "40px",
            backgroundColor: grey[50],
          }}
        >
          {item.subMenuItems?.map((sub) => (
            <Box
              key={sub.title}
              onClick={() => redirect(sub.path)}
              sx={{
                paddingY: "8px",
                cursor: "pointer",
                color: grey[700],
              }}
            >
              <Typography fontSize='0.8rem'>{sub.title}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export const DrawerMenuOverlay = () => {
  const { isDrawerMenuOpened, toggleDrawerMenuOpened } = useAppContext();

  if (isDrawerMenuOpened) {
    return (
      <Box
        onClick={toggleDrawerMenuOpened}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 120, // maior que conteúdo, menor que menus/dialogs
        }}
      />
    );
  }
};
