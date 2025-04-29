import { TransitionAlert } from '@/components/Alert/transition-alert'
import { Box } from '@mui/material'

interface FeedbackAlertSectionProps {
  isError: boolean
  isSuccess: boolean
  errorMessage: string
  successMessage: string
}
export function FeedbackAlertSection({
  isError,
  isSuccess,
  errorMessage,
  successMessage,
}: FeedbackAlertSectionProps) {
  return (
    <Box sx={{ marginTop: 0, width: { xs: '350px', sm: '430px', md: '820px', xl: '100%' } }}>
      {isError && <TransitionAlert severity='error' message={errorMessage} />}
      {isSuccess && <TransitionAlert severity='success' message={successMessage} />}
    </Box>
  )
}
