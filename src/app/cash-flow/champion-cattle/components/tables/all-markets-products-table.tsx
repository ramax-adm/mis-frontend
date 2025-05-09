import { COLORS } from '@/constants/styles/colors'
import { Box, Typography } from '@mui/material'

export function AllMarketsProductsTable() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
        width: { xs: '350px', sm: '430px', md: '820px', xl: '95%' },
      }}
    >
      <Typography variant='h6' fontWeight={700}>
        Produtos ME/MI
      </Typography>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(62, 99, 221, 0.2)',
          height: '300px',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Typography variant='h1' fontSize={'30px'} fontWeight={700}>
          EM CONSTRUÇÃO
        </Typography>
      </Box>
    </Box>
  )
}
