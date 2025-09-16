"use client";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChevronDown } from "lucide-react";
import { SideNavItem, useAppContext } from "@/contexts/app";
import { usePathname, useRouter } from "next/navigation";

interface BurgerMenuItemProps {
  item: SideNavItem;
  submenuOpen: SideNavItem | null;
  setSubmenuOpen: (item: SideNavItem | null) => void;
}

export const BurgerMenuItem = ({
  item,
  submenuOpen,
  setSubmenuOpen,
}: BurgerMenuItemProps) => {
  const { toggleBurgerMenuOpened } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const isCurrentPath = item.path === pathname;
  const isCurrentSubmenu =
    pathname.split("/")[1] === item.path.replace("/", "");
  const hasSubmenu = !!item.submenu;
  const isSubmenuOpen = submenuOpen?.path === item.path;
  const Icon = item.icon;

  const redirect = (url: string) => {
    toggleBurgerMenuOpened();
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
