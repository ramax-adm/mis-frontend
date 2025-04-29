import { Box, SxProps } from '@mui/material'

interface FeedbackAlertRootProps {
  sx?: SxProps
  children: React.ReactNode
}
export function FeedbackAlertRoot({ sx, ...props }: FeedbackAlertRootProps) {
  return <Box sx={{ display: 'inline-flex', ...sx }} {...props} />
}
