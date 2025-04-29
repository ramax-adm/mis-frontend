import { Box, SxProps, Typography } from '@mui/material'

interface DisplayItemProps {
  title: string
  sx?: SxProps
  content?: string
  headerFontSize?: string
  contentFontSize?: string
}
export function DisplayItem({
  title,
  content = 'N/D',
  sx,
  headerFontSize = '9px',
  contentFontSize = '12px',
}: DisplayItemProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      <Typography variant='caption' fontSize={headerFontSize}>
        {title}
      </Typography>
      <Typography variant='h6' fontSize={contentFontSize}>
        {content}
      </Typography>
    </Box>
  )
}
