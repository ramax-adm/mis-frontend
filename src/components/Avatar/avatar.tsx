import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import { stringAvatar } from "@/utils/string.utils";
import { grey, indigo } from "@mui/material/colors";

type CustomAvatarProps = {
  name: string;
  email?: string;
};
export const CustomAvatar = ({ name = "", email = "" }: CustomAvatarProps) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: 1,
        alignItems: "center",
        maxWidth: 300,
        py: 0.5,
        px: 1,
        borderRadius: "8px",
        "&:hover": {
          opacity: 0.8,
          cursor: "pointer",
        },
      }}
    >
      <Avatar {...stringAvatar(name)} />
      <Box sx={{ overflow: "hidden" }}>
        <Typography
          fontSize={12}
          fontWeight={600}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 200, // 👈 define limite visível
            lineHeight: 1,
          }}
          title={name} // mostra tooltip completo
        >
          {name}
        </Typography>
        <Typography
          fontSize={10}
          color='text.secondary'
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 200,
            lineHeight: 1.2,
          }}
          title={email}
        >
          {email}
        </Typography>
      </Box>
    </Box>
  );
};
