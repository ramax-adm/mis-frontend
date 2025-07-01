import { GetCattlePurchaseAnalyticalTotalsItem } from '@/types/api/purchase'
import { Box, Typography } from '@mui/material'

interface CattlePurchaseAnalyticalTotalsIndicatorProps {
  data?: GetCattlePurchaseAnalyticalTotalsItem
}
export function CattlePurchaseAnalyticalTotalsIndicator({
  data,
}: CattlePurchaseAnalyticalTotalsIndicatorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Box
        sx={{
          marginTop: 1,
          padding: '2px',
          borderRadius: '4px',
          backgroundColor: 'rgba(27, 94, 32, 0.2)',
          color: '#1B5E20',
        }}
      >
        <Typography fontWeight={700} fontSize={'12px'}>
          Totais
        </Typography>
        <Box sx={{ display: 'inline-flex', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'9px'}>Peso/@</Typography>
            <Typography fontSize={'14px'} fontWeight={700}>
              {data?.weightInArroba}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'9px'}>Σ R$ Frete</Typography>
            <Typography fontSize={'14px'} fontWeight={700}>
              {data?.freightValue}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'9px'}>Σ R$ Comissão</Typography>
            <Typography fontSize={'14px'} fontWeight={700}>
              {data?.commissionValue}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'9px'}>Σ R$ Compra</Typography>
            <Typography fontSize={'14px'} fontWeight={700}>
              {data?.purchaseValue}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={'9px'}>R$ Total</Typography>
            <Typography fontSize={'14px'} fontWeight={700}>
              {data?.finalValue}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
