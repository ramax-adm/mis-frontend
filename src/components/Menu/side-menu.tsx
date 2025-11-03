import { SideNavItem, useAppContext } from "@/contexts/app";
import { useAuthContext } from "@/contexts/auth";
import {
  Box,
  Divider,
  Fade,
  Popover,
  Portal,
  Skeleton,
  Typography,
} from "@mui/material";
import { grey, indigo, orange } from "@mui/material/colors";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";

type SideMenuContextProps = {
  pathname: string;
  isFetching: boolean;
  onRouterPush: (url: string) => void;
};

type SideMenuItemProps = {
  item: SideNavItem;
};

type SideMenuSubitemsProps = {
  title: string;
  subItems?: SideNavItem[];
  currentSubmenuPos: { top: number; left: number } | null;
};

const SideMenuContext = createContext<SideMenuContextProps | null>(null);

const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { NAV_ITEMS, webpages, isFetchingWebpages, checkPagePermission } =
    useAppContext();
  const { user, isFetchingUser } = useAuthContext();

  const isFetching = isFetchingWebpages || isFetchingUser;
  const onRouterPush = (url: string) => router.push(url);

  return (
    <SideMenuContext.Provider value={{ pathname, isFetching, onRouterPush }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          flex: "1 1 0%",
          height: "100%",
          width: "70px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: indigo["A700"],
        }}
      >
        {/** menu indicator */}
        <Box
          sx={{
            width: "100%",
            height: "40px",
            backgroundColor: indigo["A200"],
            display: "grid",
            placeContent: "center",
            boxShadow: 3,
          }}
        >
          <MenuIcon size={16} color={indigo["A100"]} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
            paddingX: "4px",
            overflowY: "auto", // ativa o scroll
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE e Edge antigos
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari
            },
          }}
        >
          {isFetching && <SideMenuSkeleton />}

          {!isFetching && (
            <>
              <Box sx={{ marginTop: "8px" }} />
              <SideMenuItem
                key={"menu-home-1"}
                item={{
                  path: "/home",
                  title: "Inicio",
                  icon: FaHome,
                  submenu: false,
                }}
              />
              <Divider
                orientation='horizontal'
                sx={{ backgroundColor: indigo["A100"] }}
              />
              {NAV_ITEMS.filter((item) =>
                checkPagePermission({
                  user,
                  webpages,
                  item,
                })
              ).map((item, idx) => (
                <SideMenuItem
                  key={`menu-${item.path}-${idx}`}
                  item={{
                    ...item,
                    subMenuItems: item.subMenuItems?.filter((i) =>
                      checkPagePermission({ user, webpages, item: i })
                    ),
                  }}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </SideMenuContext.Provider>
  );
};

const SideMenuItem = ({ item }: SideMenuItemProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { onRouterPush, pathname } = useSideMenuContext();
  const [currentSubmenuOpen, setCurrentSubmenuOpen] = useState<string | null>(
    null
  );
  const [currentSubmenuPos, setCurrentSubmenuPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const Icon = item.icon;
  const hasSubmenu = !!item.submenu;
  const isCurrentPath = item.path === "" ? false : pathname.includes(item.path);
  const isSubmenuOpen = item.path === currentSubmenuOpen;

  const wordCount = item.title.trim().split(/\s+/).length;
  const shouldTruncate = wordCount === 1 && item.title.length > 8; // exemplo: se for uma palavra só e > 8 letras

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      // Captura posição absoluta do item pai
      setCurrentSubmenuPos({ top: rect.top, left: rect.right - 2 });
      setCurrentSubmenuOpen(item.path);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => setCurrentSubmenuOpen(null), 50);
  };

  return (
    <Box
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (!hasSubmenu) {
          return onRouterPush(item.path);
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        color: isCurrentPath ? indigo["A700"] : "white",
        borderRadius: "8px",
        backgroundColor: isCurrentPath ? indigo["50"] : "",
        cursor: "pointer",
        paddingY: "4px",
        "&:hover": {
          ...(!isCurrentPath && {
            backgroundColor: indigo["A200"],
          }),
        },
      }}
    >
      <span style={{ fontSize: "20px", lineHeight: 0 }}>
        {Icon && <Icon />}
      </span>

      <Typography
        fontSize='10px'
        fontWeight={isCurrentPath ? 700 : 500}
        textAlign='center'
        sx={{
          ...(shouldTruncate && {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "60px", // ajuste conforme o tamanho do menu
          }),
        }}
        title={item.title} // mostra o texto completo no hover
      >
        {item.title}
      </Typography>

      {/** SUBMENU */}
      {hasSubmenu && isSubmenuOpen && (
        <SideMenuSubitems
          title={item.title}
          subItems={item?.subMenuItems}
          currentSubmenuPos={currentSubmenuPos}
        />
      )}
    </Box>
  );
};

const SideMenuSubitems = ({
  title,
  subItems = [],
  currentSubmenuPos = { top: 0, left: 0 },
}: SideMenuSubitemsProps) => {
  const { onRouterPush, pathname } = useSideMenuContext();
  return (
    <Portal>
      <Box
        className='submenu'
        sx={{
          position: "fixed",
          top: currentSubmenuPos?.top,
          left: currentSubmenuPos?.left,
          zIndex: 9999, // ~1500
          transition: "opacity 0.15s ease, transform 0.15s ease",
        }}
      >
        <Box
          className='submenu'
          sx={{
            width: "200px",
            backgroundColor: "white",
            color: "#27272a",
            borderRadius: 0.5,
            paddingY: 1,
            marginLeft: 1,
          }}
        >
          <Typography
            fontWeight={700}
            fontSize='12px'
            marginLeft={2}
            marginBottom={0.5}
          >
            {title}
          </Typography>
          <Divider sx={{ opacity: 0.5 }} />

          {subItems?.map((subItem) => {
            const isCurrentSubitem = subItem.path === pathname;
            return (
              <Box
                key={subItem.path}
                onClick={() => onRouterPush(subItem.path)}
                sx={{
                  textDecoration: "none",
                  color: "#27272a",
                  fontSize: "0.8rem",
                  width: "100%",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  sx={{
                    paddingY: 1.5,
                    paddingX: 2,
                    "&:hover": {
                      backgroundColor: "rgba(62, 99, 221, 0.1)",
                    },
                    ...(isCurrentSubitem && {
                      backgroundColor: indigo["50"],
                      color: indigo["A700"],
                    }),
                  }}
                >
                  <Typography
                    fontSize='12px'
                    fontWeight={isCurrentSubitem ? 700 : 400}
                  >
                    {subItem.title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Portal>
  );
};

const SideMenuSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        marginTop: "12px",
      }}
    >
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
      <Skeleton
        variant='rounded'
        width={55}
        height={50}
        sx={{ backgroundColor: indigo["A100"] }}
      />
    </Box>
  );
};

function useSideMenuContext() {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error(
      "O contexto para ser usado deve estar dentro de SideMenuContext"
    );
  }
  return context;
}

export { SideMenu };
SideMenu.displayName = "SideMenu";
SideMenuItem.displayName = "SideMenuItem";
SideMenuSubitems.displayName = "SideMenuSubitems";
SideMenuSkeleton.displayName = "SideMenuSkeleton";
