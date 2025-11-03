import { useAppContext } from "@/contexts/app";
import { useAuthContext } from "@/contexts/auth";
import { Box, Button } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { LogOut } from "lucide-react";
import Logo from "@/assets/ramax-logo";
import { CustomAvatar } from "../Avatar/avatar";
import { DrawerMenu } from "../Menu/drawer-menu";

export const PageHeader = () => {
  const { width } = useAppContext();
  const { user, logoutUser } = useAuthContext();
  return (
    <Box
      sx={{
        position: "fixed",
        left: width > 1000 ? 70 : 0,
        right: 0,
        top: 0,
        height: "40px",
        backgroundColor: indigo["50"],
        paddingX: "12px",
        display: "inline-flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 20,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Logo />
        {/* <Breadcrumbs /> */}
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {width <= 1000 && <DrawerMenu />}
        <CustomAvatar name={user.name} email={user.email} />
        <Button
          variant='outlined'
          sx={{
            alignSelf: "center",
            display: "flex",
            gap: 1,
          }}
          startIcon={<LogOut size={14} strokeWidth={2} />}
          onClick={() => logoutUser()}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
};

PageHeader.displayName = "PageHeader";
