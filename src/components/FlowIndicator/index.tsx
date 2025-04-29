import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import dayjs from 'dayjs'

interface FlowIndicatorProps {
  index: number
  username?: string
  userRole?: string
  createdAt: Date
  status: string
}
export function FlowIndicator({
  index,
  username,
  userRole,
  createdAt,
  status,
}: FlowIndicatorProps) {
  return (
    <Box sx={{ display: 'inline-flex', gap: '20px', margin: '16px', padding: '24px 8px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: grey[500],
            width: 30,
            height: 30,
            borderRadius: '50%',
          }}
        >
          <Typography>{index}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: grey[300],
            width: 2,
            height: '70%',
          }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{status}</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 400, color: grey[500] }}>
          {dayjs(createdAt).format('DD/MM/YYYY - HH:mm')}
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400, marginY: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: 'item.additionalInfo' }} />
        </Typography>

        <Typography sx={{ fontSize: 12, fontWeight: 400, color: grey[500] }}>
          Usuário: {username} - {userRole}
        </Typography>
      </Box>
    </Box>
  )
}
