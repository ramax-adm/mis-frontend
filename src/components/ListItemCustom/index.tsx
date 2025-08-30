import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem as MuiListItem,
} from "@mui/material";
import { ReactNode } from "react";

interface ListItemProps {
  title: string;
  content: string;
  icon?: ReactNode;
  action?: ReactNode;
}
export function ListItemCustom({
  content,
  title,
  icon,
  action,
}: ListItemProps) {
  return (
    <MuiListItem disablePadding secondaryAction={action} sx={{ py: 0.5 }}>
      <ListItemAvatar sx={{ minWidth: 36 }}>
        <Avatar sx={{ width: 28, height: 28, fontSize: 14 }}>{icon}</Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={title}
        secondary={content}
        primaryTypographyProps={{ fontSize: 14 }}
        secondaryTypographyProps={{ fontSize: 12 }}
      />
    </MuiListItem>
  );
}
