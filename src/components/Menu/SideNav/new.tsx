import { SideNavItem, useAppContext } from "@/contexts/app";
import { Box, Divider, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RamaxMiniLogo from "@/assets/RAMAX-Group_Vertical_Cor.png";
import { SideNavWithSubmenu } from "./sidenav-with-submenu";
import { useAuthContext } from "@/contexts/auth";
import { User, UserRoleEnum } from "@/types/user";
import { AppWebpage } from "@/types/application";

export function SideNav() {
  const pathname = usePathname();
  const { NAV_ITEMS, webpages, isFetchingWebpages } = useAppContext();
  const { user, isFetchingUser } = useAuthContext();

  const isFetching = isFetchingWebpages || isFetchingUser;

  return (
    <Box
      sx={{
        position: "fixed",
        flex: "1 1 0%",
        marginTop: -1,
        marginLeft: -1,
        paddingY: 1,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Link href='/home'>
        <Image
          style={{
            width: "80%",
            height: "4rem",
            alignSelf: "center",
            display: "block", // necessário para margin auto funcionar em img
            margin: "0 auto",
            objectFit: "contain",
          }}
          src={RamaxMiniLogo}
          alt='logo'
        />
      </Link>
      <Divider orientation='horizontal' sx={{ margin: 1 }} />
      {isFetching && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "78px",
          }}
        >
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
          <Skeleton variant='rounded' width={55} height={50} />
        </Box>
      )}
      {!isFetching &&
        NAV_ITEMS.map((item, index) => {
          const hasPermission = checkPagePermission({ user, webpages, item });
          if (!hasPermission) {
            return null;
          }

          const Icon = item.icon;
          const hasSubmenu =
            item.submenu && item.subMenuItems && item.subMenuItems?.length > 0;
          const isCurrentPath = item.path === pathname;

          return hasSubmenu ? (
            <SideNavWithSubmenu
              key={index}
              item={{
                ...item,
                subMenuItems: item?.subMenuItems?.filter((i) =>
                  checkPagePermission({ user, webpages, item: i })
                ),
              }}
              index={index}
              icon={Icon}
              pathname={pathname}
            />
          ) : (
            <Link
              key={index}
              href={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#27272a",
                  backgroundColor: isCurrentPath ? "#3e63dd" : "",
                  borderRadius: 1,
                  width: "85%",
                  marginX: "auto",
                  padding: 0.8,
                  "&:hover": {
                    backgroundColor: isCurrentPath
                      ? ""
                      : "rgba(62, 99, 221, 0.1)",
                  },
                }}
              >
                {Icon && (
                  <span
                    style={{
                      fontSize: "1.4rem",
                      lineHeight: 0,
                      color: isCurrentPath ? "white" : "#27272a",
                    }}
                  >
                    <Icon />
                  </span>
                )}
                <Typography
                  sx={{
                    fontSize: "9px",
                    fontWeight: 700,
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    color: isCurrentPath ? "white" : "#27272a",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Link>
          );
        })}
    </Box>
  );
}

const checkPagePermission = ({
  user,
  webpages,
  item,
}: {
  user: User;
  webpages: AppWebpage[];
  item: SideNavItem;
}) => {
  const isUserAdmin = user.role === UserRoleEnum.Admin;
  const isUserHasWebpage = user?.userWebpages?.find(
    (i) => i.page.page === item.path
  );
  const isPublicPage = webpages.find((i) => i.page === item.path && i.isPublic);

  return !!isUserHasWebpage || !!isPublicPage || !!isUserAdmin;
};
