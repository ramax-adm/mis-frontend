'use Client'
import * as React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

export const BoldVariant: React.FC<ButtonProps> = ({ variant }) => {
  return (
    <Button
      // color="warning" didn't work with custom variant
      // classes used sx instead
      // component="span"
      // disabled={false}
      // fullWidth={false}
      sx={{ mt: 2, ml: 2 }}
      variant={variant}
    >
      Custom Variant
    </Button>
  )
}
