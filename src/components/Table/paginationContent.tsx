import PaginationRounded from '../Pagination'
import { Box, BoxProps } from '@mui/material'
import { TableNoContentMessage } from './noContentMessage'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface TablePaginationContentProps extends BoxProps {
  isError: boolean
  isEmpty: boolean
  errorMessage?: string
  children: ReactNode
  lastPage: number
  page: number
  handler: Dispatch<SetStateAction<number>>
}
export function TablePaginationContent({
  isEmpty,
  isError,
  errorMessage,
  children,
  page,
  lastPage = 1,
  handler,
  ...props
}: TablePaginationContentProps) {
  if ((isEmpty && !isError) || (isEmpty && isError)) {
    return <TableNoContentMessage isEmpty={isEmpty} isError={isError} errorMessage={errorMessage} />
  }

  return (
    <Box {...props}>
      {children}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          paddingTop: 2,
        }}
      >
        <PaginationRounded count={lastPage} page={page} handleChange={handler} />
      </Box>
    </Box>
  )
}
