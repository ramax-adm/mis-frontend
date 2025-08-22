"use client";
import React, { ReactNode, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { SideNavItem, useAppContext } from "@/contexts/app";
import { blue, grey, orange } from "@mui/material/colors";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import BurgerMenu from "../Menu/BurgerMenu";
import SideNav from "../Menu/SideNav";
import { SideNav as SideNavNew } from "../Menu/SideNav/new";
import { useAuthContext } from "@/contexts/auth";
import { RiLogoutBoxFill } from "react-icons/ri";
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
  const { user, logoutUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  function redirectLink(url: string) {
    toggleBurgerMenuOpened();
    return router.push(url);
  }

  const MenuItem = ({
    className,
    children,
  }: {
    className?: string;
    children?: ReactNode;
  }) => {
    return <li className={className}>{children}</li>;
  };

  const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
    item,
    Icon,
  }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
      <>
        <MenuItem>
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "0.5rem",
              width: "100%",
              backgroundColor: "rgba(62, 99, 221, 0.3)",
              padding: "0.5rem",
            }}
            onClick={() => setSubMenuOpen(!subMenuOpen)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                width: "90%",
              }}
            >
              {item.icon && Icon ? (
                <span style={{ display: "inline-block", fontSize: "1.2rem" }}>
                  <Icon />
                </span>
              ) : (
                ""
              )}
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: "1.2rem",
                  fontFamily: "sans-serif",
                  color: grey[900],
                }}
                className={`${pathname.includes(item.path) ? "font-bold" : ""}`}
              >
                {item.title}
              </Typography>

              <Box>{subMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</Box>
            </Box>
          </Button>
        </MenuItem>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "0.5rem",
            marginLeft: "1rem",
            gap: 1,
          }}
        >
          {subMenuOpen && (
            <>
              {item.subMenuItems?.map((subItem, subIdx) => {
                return subItem.role &&
                  subItem.role?.length > 0 &&
                  !subItem.role?.includes(user.role) ? null : (
                  <MenuItem key={subIdx}>
                    <Button
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "0.5rem",
                        width: "100%",
                        padding: "0.5rem",
                      }}
                      onClick={() => redirectLink(subItem.path)}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          width: "100%",
                          fontSize: "0.8rem",
                          lineHeight: "1.2rem",
                          fontFamily: "sans-serif",
                          textDecoration: "none",
                          color: grey[900],
                          fontWeight: `${pathname.includes(subItem.path) ? 700 : 500}`,
                        }}
                      >
                        {subItem.title}
                      </Typography>
                    </Button>
                  </MenuItem>
                );
              })}
            </>
          )}
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#FAFAFA",
        height: "100%",
      }}
    >
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
        {width < 1000 && <BurgerMenu />}

        <Box
          sx={{
            height: "100%",
            marginLeft: width > 1000 ? "3.5rem" : "",
          }}
        >
          {children}
        </Box>

        {width < 1000 && isBurgerMenuOpened && (
          <Box
            sx={{
              position: "absolute",
              width: "97%",
              height: "100%",
              marginTop: "4vh",
              background: "linear-gradient(150deg, #fff 0%, #fff 74%)",
              transform: isBurgerMenuOpened
                ? "translateX(0%)"
                : "translateX(100%)",
              transition: "all 0.5s ease-in-out",
              zIndex: 100,
            }}
          >
            <ul
              style={{
                display: "grid",
                overflowY: "auto",
                position: "absolute",
                padding: 0,
                gap: "0.75rem",
                width: "90%",
                maxHeight: "100%",
                listStyle: "none",
              }}
            >
              {NAV_ITEMS.map((item: SideNavItem, idx) => {
                const isLastItem = idx === NAV_ITEMS.length - 1;
                if (
                  item.role &&
                  item.role?.length > 0 &&
                  !item.role?.includes(user.role)
                ) {
                  return null;
                } else {
                  const Icon = item.icon;

                  return (
                    <div key={idx}>
                      {item.submenu ? (
                        <MenuItemWithSubMenu item={item} Icon={Icon} />
                      ) : (
                        <MenuItem>
                          <Button
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "8px",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderRadius: "0.5rem",
                              width: "100%",
                              backgroundColor: "rgba(62, 99, 221, 0.3)",
                              padding: "0.5rem",
                            }}
                            onClick={() => redirectLink(item.path)}
                          >
                            {Icon && (
                              <span
                                style={{
                                  fontSize: "1.2rem",
                                }}
                              >
                                <Icon style={{ marginTop: "8px" }} />
                              </span>
                            )}
                            <Typography
                              sx={{
                                display: "flex",
                                width: "98%",
                                fontSize: "1.2rem",
                                lineHeight: "1.2rem",
                                fontFamily: "sans-serif",
                                textDecoration: "none",
                                color: pathname.includes(item.path)
                                  ? "#3E63DD"
                                  : "#000000",
                                fontWeight: `${pathname.includes(item.path) ? 700 : 500}`,
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Button>
                        </MenuItem>
                      )}

                      {!isLastItem && <MenuItem />}
                    </div>
                  );
                }
              })}
              <MenuItem>
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "0.5rem",
                    width: "100%",
                    backgroundColor: "rgba(62, 99, 221, 0.3)",
                    padding: "0.5rem",
                  }}
                  onClick={() => logoutUser()}
                >
                  <span
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    <RiLogoutBoxFill style={{ marginTop: "8px" }} />
                  </span>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "98%",
                      fontSize: "1.2rem",
                      lineHeight: "1.2rem",
                      fontFamily: "sans-serif",
                      textDecoration: "none",
                      color: grey[900],
                    }}
                  >
                    Sair
                  </Typography>
                </Button>
              </MenuItem>
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  );
};
