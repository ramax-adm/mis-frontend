import { Box, Skeleton } from '@mui/material'

export function LoadingSkeleton() {
  return (
    <Box sx={{ margin: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
          gap: 3,
        }}
      >
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
        <Skeleton variant='rectangular' width={'100%'} height={60} />
      </Box>
    </Box>
  )
}
