import { Box, Typography } from '@mui/material'

export function FetchDataErrorMessage() {
  return (
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
      <Typography variant='h1' sx={{ fontSize: '24px', color: 'red' }}>
        Ocorreu um erro ao buscar os dados
      </Typography>
    </Box>
  )
}
