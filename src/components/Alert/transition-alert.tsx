import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

interface TransitionAlertProps {
  message?: string
  severity: 'error' | 'info' | 'warning' | 'success'
}
export function TransitionAlert({ message, severity }: TransitionAlertProps) {
  const [open, setOpen] = React.useState(true)

  return (
    <Collapse in={open} sx={{ marginTop: 2 }}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  )
}
