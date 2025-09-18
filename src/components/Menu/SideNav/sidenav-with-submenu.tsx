import { SideNavItem } from "@/contexts/app";
import { Box, Fade, Link, Popover, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconType } from "react-icons";

interface SideNavWithSubmenuProps {
  item: SideNavItem;
  index: number;
  icon?: IconType;
  pathname: string;
}
export function SideNavWithSubmenu({
  item,
  index,
  icon: Icon,
  pathname,
}: SideNavWithSubmenuProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverSubMenus, setPopoverSubMenus] = useState<SideNavItem[] | null>(
    null
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    item?: SideNavItem[]
  ) => {
    if (anchorEl === event.currentTarget) {
      return;
    }
    setAnchorEl(event.currentTarget);
    setPopoverSubMenus(item!);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverSubMenus(null);
  };

  const open = Boolean(anchorEl);

  const isCurrentSubmenu =
    pathname.split("/")[1] === item.path.replace("/", "");

  return (
    <Box key={index} sx={{ position: "relative" }}>
      <Box
        onClick={(e) => {
          handlePopoverOpen(e, item.subMenuItems);
          e.stopPropagation();
        }}
        sx={{
          display: "relative",
          textDecoration: "none",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#27272a",
            width: "85%",
            marginX: "auto",
            padding: 0.8,
            backgroundColor: isCurrentSubmenu ? "rgba(62, 99, 221, 0.2)" : "",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "rgba(62, 99, 221, 0.1)",
            },
          }}
        >
          {Icon && (
            <span
              style={{
                fontSize: "1.4rem",
                color: isCurrentSubmenu ? "#3e63dd" : "#27272a",
              }}
            >
              <Icon />
            </span>
          )}
          <Typography
            sx={{
              fontSize: "9px",
              fontWeight: 600,
              fontFamily: "sans-serif",
              textAlign: "center",
              color: isCurrentSubmenu ? "#3e63dd" : "#27272a",
            }}
          >
            {item.title}
          </Typography>
        </Box>
        <span
          style={{
            marginLeft: "auto",
            position: "absolute",
            right: 5,
            top: "50%",
            transform: "translateY(-50%)",
            color: isCurrentSubmenu ? "#3e63dd" : "#3e63dd",
          }}
        >
          <ChevronDown size={10} />
        </span>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        // sx={{ pointerEvents: "none" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        TransitionComponent={Fade} // ← animação de fade
        slotProps={{
          paper: {
            // onMouseLeave: () => {
            //   handlePopoverClose();
            // },
            // onMouseLeave: handlePopoverClose,
            sx: {
              padding: 0,
              margin: 0,
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // <-- Remove a sombra
            },
          },
        }}
        disableRestoreFocus
      >
        <Typography
          fontWeight={700}
          fontSize={"12px"}
          marginLeft={2}
          marginTop={1}
        >
          {item.title}
        </Typography>
        {popoverSubMenus?.map((subItem: any) => (
          <Box
            key={subItem.path}
            onClick={() => router.push(subItem.path)}
            sx={{
              display: "block",
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
                width: "100%",
                paddingY: 1.5,
                paddingX: 2,
                "&:hover": {
                  backgroundColor: "rgba(62, 99, 221, 0.1)",
                },
              }}
            >
              <Typography fontSize={"12px"}>{subItem.title}</Typography>
            </Box>
          </Box>
        ))}
      </Popover>
    </Box>
  );
}
