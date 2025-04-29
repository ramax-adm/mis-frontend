'use Client'
import * as React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  label: string
}

export const SessionLabel = (props: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginY: 2,
        borderBottom: 1,
      }}
    >
      <Typography variant='h6'>{props.label}</Typography>
    </Box>
  )
}
export const SessionLabelOne = (props: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        marginY: 2,
      }}
    >
      <Typography variant='h6'>{props.label}</Typography>
    </Box>
  )
}
