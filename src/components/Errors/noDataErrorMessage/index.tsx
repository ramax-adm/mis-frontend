import { Box, Typography } from '@mui/material'

export function NoDataErrorMessage() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        margin: 3,
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 700, fontSize: '18px', paddingBottom: 2 }}>
        Não foram encontrados itens
      </Typography>
    </Box>
  )
}
