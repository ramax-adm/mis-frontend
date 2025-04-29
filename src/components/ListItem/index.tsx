import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

interface ListItemProps {
  title: string
  content: string
}
export function ListItem({ content, title }: ListItemProps) {
  return (
    <Box
      component='span'
      style={{
        display: 'inline-flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' color={grey['700']} fontWeight={700}>
        {title}
      </Typography>
      <Typography variant='body1'>{content}</Typography>
    </Box>
  )
}
