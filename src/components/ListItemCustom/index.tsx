import { Avatar, ListItemAvatar, ListItemText, ListItem as MuiListItem } from '@mui/material'
import { ReactNode } from 'react'

interface ListItemProps {
  title: string
  content: string
  icon?: ReactNode
  action?: ReactNode
}
export function ListItemCustom({ content, title, icon, action }: ListItemProps) {
  return (
    <MuiListItem disablePadding secondaryAction={action} sx={{ py: 1 }}>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>

      <ListItemText primary={title} secondary={content} />
    </MuiListItem>
  )
}
