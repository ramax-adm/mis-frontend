import { Box, Skeleton } from '@mui/material'

export function LoadingGraph() {
  return (
    <Box sx={{ margin: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'center',
          margin: 3,
          gap: 2,
        }}
      >
        <Skeleton animation='wave' variant='rectangular' width={'100%'} height={40} />

        <Skeleton variant='rectangular' width={'100%'} height={140} />
      </Box>
    </Box>
  )
}
