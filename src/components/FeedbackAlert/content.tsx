import { Alert } from '@mui/material'
import { useState, useEffect } from 'react'

interface FeedbackAlertContentProps {
  mutationState: 'error' | 'idle' | 'pending' | 'success'
  children?: React.ReactNode
  durationInSeconds?: number
}
export function FeedbackAlertContent({
  mutationState,
  durationInSeconds = 5,
  ...props
}: FeedbackAlertContentProps) {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (mutationState === 'success' || mutationState === 'error') {
      setShowAlert(true)

      setTimeout(() => setShowAlert(false), durationInSeconds * 1000)
    }
  }, [mutationState])

  return showAlert ? (
    mutationState === 'idle' || mutationState === 'pending' ? null : (
      <Alert severity={mutationState} {...props} />
    )
  ) : null
}
