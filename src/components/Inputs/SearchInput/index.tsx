'use Client'
import * as React from 'react'
import { Box, FormControl, TextField } from '@mui/material'

type Props = {
  label: string
  setQuery:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string | undefined>>
  handlePage?: React.Dispatch<React.SetStateAction<number>>
}

export const SearchInput = (props: Props) => {
  function handleQuery(search: string) {
    if (search.length >= 2) {
      props.setQuery(search)
      props.handlePage && props.handlePage(1)
    } else {
      props.setQuery('')
    }
  }

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={{
        width: '100%',
      }}
    >
      <FormControl fullWidth>
        <TextField
          fullWidth
          label={props.label}
          variant='outlined'
          defaultValue=''
          onChange={(event) => handleQuery(event.target.value)}
        />
      </FormControl>
    </Box>
  )
}
