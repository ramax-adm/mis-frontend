import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type Props = {
  count: number
  page: number
  handleChange: React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationRounded(props: Props) {
  const changePage = (event: unknown, value: number) => {
    props.handleChange(value)
  }

  return (
    <Stack spacing={2}>
      <Pagination
        size={'large'}
        count={props.count}
        shape='rounded'
        page={props.page}
        onChange={changePage}
      />
    </Stack>
  )
}
